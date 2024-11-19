import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaUpload, FaImage, FaArrowLeft } from 'react-icons/fa';

function CategoryForm() {
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [previewImage, setPreviewImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCategory();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/category/${id}`
      );
      const { name, image } = response.data;
      setName(name);
      setCurrentImage(`/src/assets/category/${image}`); // Đường dẫn ảnh hiện tại
    } catch (error) {
      console.error('Failed to fetch category', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    if (file) {
      formData.append('image', file); // Thêm file thực tế vào FormData
    }

    try {
      if (id) {
        // Cập nhật danh mục
        await axios.put(`http://localhost:8080/api/category/${id}`, formData);
      } else {
        // Thêm mới danh mục
        await axios.post('http://localhost:8080/api/category', formData);
      }
      navigate('/admin/category');
    } catch (error) {
      console.error('Failed to submit category', error);
    }
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-xl p-6 max-w-lg mx-auto">
        {/* Nút quay lại */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-indigo-600 flex items-center space-x-2 hover:text-indigo-800 transition duration-300"
        >
          <FaArrowLeft /> <span>Quay lại</span>
        </button>

        <h5 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {id ? 'Cập nhật danh mục' : 'Thêm danh mục'}
        </h5>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Tên danh mục
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-600 mb-2">
              Ảnh danh mục
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  if (selectedFile) {
                    setFile(selectedFile); // Lưu file thực tế
                    setPreviewImage(URL.createObjectURL(selectedFile)); // Tạo URL xem trước
                  }
                }}
              />
              <label
                htmlFor="fileInput"
                className="flex items-center cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition"
              >
                <FaUpload className="mr-2" />
                Chọn ảnh
              </label>
            </div>

            {/* Hiển thị ảnh hiện tại nếu có */}
            {currentImage && (
              <div className="mt-4 flex items-center space-x-3">
                <FaImage className="text-gray-500" />
                <img
                  src={currentImage}
                  alt="Current"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Hiển thị ảnh xem trước nếu có */}
            {previewImage && (
              <div className="mt-4 flex items-center space-x-3">
                <FaImage className="text-gray-500" />
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          >
            {id ? 'Cập nhật danh mục' : 'Thêm danh mục'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default CategoryForm;
