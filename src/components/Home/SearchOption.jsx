import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { ImagePlus } from "lucide-react";
// import { Dialog } from "@headlessui/react";

function SearchOption() {
    // const [showGuide, setShowGuide] = useState(false);
    const [searchHistory, setSearchHistory] = useState([]);
    // const [uploadedImages, setUploadedImages] = useState([]);

    // Lấy lịch sử tìm kiếm và ảnh đã tải lên từ localStorage
    useEffect(() => {
        const lastSearch = JSON.parse(localStorage.getItem("lastSearch") || "[]");
        // const savedImages = JSON.parse(localStorage.getItem("uploadedImages") || "[]");
        setSearchHistory(lastSearch);
        // setUploadedImages(savedImages);
    }, []);

    // Lưu tìm kiếm vào localStorage
    const saveSearch = (searchTerm) => {
        const updatedHistory = [searchTerm, ...searchHistory].slice(0, 5); // Giới hạn lịch sử tìm kiếm là 5
        localStorage.setItem("lastSearch", JSON.stringify(updatedHistory));
        setSearchHistory(updatedHistory);
    };

    // // Lưu ảnh đã tải lên vào localStorage
    // const saveUploadedImage = (imageUrl) => {
    //     const updatedImages = [imageUrl, ...uploadedImages].slice(0, 5); // Giới hạn số lượng ảnh tải lên là 5
    //     localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
    //     setUploadedImages(updatedImages);
    // };

    let hasPreviousSearch = searchHistory.length > 0;
    // let hasUploadedImages = uploadedImages.length > 0;

    return (
        <>
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <NavLink
                        to="/image-search"
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition 
                            ${hasPreviousSearch
                                ? "border-blue-600 text-blue-700 bg-blue-50"
                                : "border-gray-300 text-gray-700 hover:bg-gray-100"}`}
                        onClick={() => saveSearch("image-search")}
                    >
                        <ImagePlus className="w-5 h-5" />

                    </NavLink>
                    {/* 
                    <NavLink
                        to="/product"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                        onClick={() => saveSearch("product-search")}
                    >
                        <SearchIcon className="w-5 h-5" />

                    </NavLink> */}

                    {/* <button
                        onClick={() => setShowGuide(true)}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                        <Info className="w-4 h-4" />
                        Hướng dẫn
                    </button> */}
                </div>
            </div>

            {/* Popup Dialog
            <Dialog
                open={showGuide}
                onClose={() => setShowGuide(false)}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
                <Dialog.Panel className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-sm space-y-4">
                    <div className="flex items-center gap-2 font-semibold text-blue-700">
                        <Info className="w-5 h-5" />
                        Hướng dẫn nhanh
                    </div>
                    <p>
                        Bạn có thể tìm kiếm sản phẩm bằng cách <strong>tải ảnh lên</strong>. Hệ thống sẽ gợi ý sản phẩm tương tự.
                    </p>
                    <p><strong>Lịch sử tìm kiếm gần đây:</strong></p>
                    <ul className="space-y-2">
                        {searchHistory.length === 0 ? (
                            <li className="text-gray-500">Chưa có tìm kiếm nào.</li>
                        ) : (
                            searchHistory.map((searchTerm, index) => (
                                <li key={index} className="text-blue-600">{searchTerm}</li>
                            ))
                        )}
                    </ul>
                    {hasUploadedImages && (
                        <>
                            <p><strong>Lịch sử ảnh đã tải lên:</strong></p>
                            <div className="flex flex-wrap gap-2">
                                {uploadedImages.map((imageUrl, index) => (
                                    <img
                                        key={index}
                                        src={imageUrl}
                                        alt={`Uploaded ${index + 1}`}
                                        className="w-16 h-16 object-cover border rounded"
                                    />
                                ))}
                            </div>
                        </>
                    )}
                    <button
                        onClick={() => setShowGuide(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Đã hiểu
                    </button>
                </Dialog.Panel>
            </Dialog> */}
        </>
    );
}

export default SearchOption;
