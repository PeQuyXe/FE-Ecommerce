import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, ImagePlus, Trash2 } from "lucide-react";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import axios from "axios";

function ImageSearchPage() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => {
        setUploadedImages(JSON.parse(localStorage.getItem("uploadedImages") || "[]"));
    }, []);

    const saveUploadedImages = (images) => {
        setUploadedImages(images);
        localStorage.setItem("uploadedImages", JSON.stringify(images));
    };

    const handleFileChange = useCallback((e) => {
        const file = e.target.files[0];
        if (!file) return;

        const img = new Image();
        const reader = new FileReader();

        reader.onload = (event) => {
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const maxSize = 700;
                const scale = Math.min(maxSize / img.width, maxSize / img.height);
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    if (blob) {
                        const resizedFile = new File([blob], file.name, { type: file.type });
                        const url = URL.createObjectURL(blob);
                        const newUpload = {
                            url,
                            timestamp: new Date().toLocaleString(),
                        };
                        const updatedUploads = [newUpload, ...uploadedImages].slice(0, 12);
                        saveUploadedImages(updatedUploads);

                        setImage(resizedFile);
                        setPreview(url);
                    }
                }, file.type);
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }, [uploadedImages]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("image", image);

        try {
            const res = await axios.post("http://localhost:8080/api/image-search/search", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Đảm bảo đúng header cho gửi file
                }
            });

            // Kiểm tra mã trạng thái và dữ liệu trả về
            if (res.status === 200) {
                const results = res.data;
                if (results && results.length > 0) {
                    // Lưu kết quả tìm kiếm vào localStorage
                    localStorage.setItem("lastSearch", JSON.stringify(results));
                    // Chuyển hướng đến trang kết quả tìm kiếm
                    navigate("/image-results", {
                        state: { results, imagePreview: preview },
                    });
                } else {
                    alert("Không tìm thấy kết quả phù hợp");
                }
            } else {
                alert("Đã xảy ra lỗi khi tìm kiếm");
            }
        } catch (err) {
            console.error("Lỗi khi tìm kiếm", err);
            alert("Lỗi kết nối hoặc server không phản hồi");
        } finally {
            setLoading(false);
        }
    };

    const removeImage = (index) => {
        const updated = [...uploadedImages];
        updated.splice(index, 1);
        saveUploadedImages(updated);
    };

    const clearAllImages = () => {
        saveUploadedImages([]);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full h-screen bg-white p-6 rounded-lg shadow space-y-6">
                <h1 className="text-2xl font-bold text-center text-gray-800">Tìm kiếm bằng hình ảnh</h1>

                {/* Tabs hướng dẫn và lịch sử */}
                <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
                    <Tab.List className="flex text-center gap-2 border-b pb-2">
                        {["Hướng dẫn", "Ảnh đã tải"].map((tab, i) => (
                            <Tab
                                key={i}
                                className={({ selected }) =>
                                    clsx(
                                        "px-3 py-1 rounded-lg text-sm font-medium",
                                        selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
                                    )
                                }
                            >
                                {tab}
                            </Tab>
                        ))}
                    </Tab.List>
                    <Tab.Panels className="text-sm mt-2">
                        <Tab.Panel>
                            <p>Bạn có thể <strong>tải 1 ảnh</strong> lên để tìm kiếm sản phẩm tương tự.</p>
                        </Tab.Panel>
                        <Tab.Panel>
                            <div className="flex justify-between items-center">
                                <p className="font-medium">📸 Ảnh đã tải gần đây:</p>
                                <button
                                    onClick={clearAllImages}
                                    className="text-red-600 text-sm hover:underline"
                                >
                                    Xoá tất cả
                                </button>
                            </div>
                            {uploadedImages.length === 0 ? (
                                <p className="text-gray-500 mt-2">Chưa có ảnh nào.</p>
                            ) : (
                                <div className="mt-2 grid grid-cols-5 gap-1">
                                    {uploadedImages.map((img, i) => (
                                        <div
                                            key={i}
                                            className="relative group cursor-pointer"
                                            onClick={async () => {
                                                setPreview(img.url);
                                                setImage(await fetch(img.url).then(res => res.blob()).then(blob =>
                                                    new File([blob], `image_${i}.jpg`, { type: blob.type })
                                                ));

                                                // Tự động tìm kiếm lại
                                                setLoading(true);
                                                const formData = new FormData();
                                                formData.append("image", await fetch(img.url)
                                                    .then(res => res.blob())
                                                    .then(blob => new File([blob], `image_${i}.jpg`, { type: blob.type })));

                                                try {
                                                    const res = await fetch("http://localhost:8080/api/image-search/search", {
                                                        method: "POST",
                                                        body: formData,
                                                    });
                                                    const results = await res.json();

                                                    if (res.ok) {
                                                        localStorage.setItem("lastSearch", JSON.stringify(results));
                                                        navigate("/image-results", {
                                                            state: { results, imagePreview: img.url },
                                                        });
                                                    } else {
                                                        alert("Không tìm thấy kết quả phù hợp");
                                                    }
                                                } catch (err) {
                                                    console.error("Lỗi khi tìm kiếm lại", err);
                                                } finally {
                                                    setLoading(false);
                                                }
                                            }}
                                        >
                                            <img
                                                src={img.url}
                                                alt={`Upload ${i}`}
                                                className="w-full h-20 object-contain border rounded hover:opacity-80 transition"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 text-[10px] bg-black/60 text-white px-1 truncate">
                                                {img.timestamp}
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    removeImage(i);
                                                }}
                                                className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow group-hover:scale-110 transition"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-600" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>

                {/* Upload ảnh */}
                <div className="flex justify-center">
                    <input
                        id="upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="upload" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition border border-gray-300 text-gray-700">
                            <ImagePlus className="h-5 w-5" />
                            <span>Chọn ảnh</span>
                        </div>
                    </label>
                </div>

                {/* Ảnh preview */}
                {preview && (
                    <div className="flex justify-center">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-96 h-64 object-contain rounded-xl shadow-md border"
                        />
                    </div>
                )}

                {/* Nút tìm kiếm */}
                <button
                    onClick={handleSearch}
                    disabled={loading || !image}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Tìm kiếm"}
                </button>
            </div>
        </div>
    );
}

export default ImageSearchPage;
