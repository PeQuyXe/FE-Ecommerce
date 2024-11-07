import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit } from 'react-icons/fa'; // Import icons từ react-icons

const NewsForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    thumb: '',
    status: false,
    content: '',
    slug: '',
    view: '',
  });

  useEffect(() => {
    if (id) fetchNewsById(id);
  }, [id]);

  const fetchNewsById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/news/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch news by ID', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lấy userId từ localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    const userId = userData ? userData.id : null;
    console.log('userId', userId);

    // Thêm các thông tin cần thiết vào formData
    const currentTime = new Date().toISOString(); // Định dạng thời gian dưới chuẩn ISO

    const updatedFormData = {
      ...formData,
      userId: userId, // Thêm userId vào dữ liệu
      createAt: id ? formData.createAt : currentTime, // Nếu không có id thì thêm createAt
      updateAt: currentTime, // Cập nhật updateAt mỗi khi gửi
      view: 0,
    };
    console.log('Form', updatedFormData);

    const apiUrl = id
      ? `http://localhost:8080/api/news/${id}`
      : 'http://localhost:8080/api/news';
    const method = id ? 'put' : 'post';

    try {
      await axios({
        method,
        url: apiUrl,
        data: updatedFormData, // Gửi dữ liệu đã được cập nhật
      });
      navigate('/admin/news');
    } catch (error) {
      console.error('Failed to save news', error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {id ? 'Sửa' : 'Thêm'} bài viết
        </h2>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Tiêu đề bài viết *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Ảnh bài viết (URL)
          </label>
          <input
            type="url"
            name="thumb"
            value={formData.thumb}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleInputChange}
            className="mr-2"
          />
          <label className="text-lg font-medium text-gray-700">Hiển thị</label>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Nội dung *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {id ? (
            <>
              <FaEdit className="mr-2" />
              Cập nhật bài viết
            </>
          ) : (
            <>
              <FaPlus className="mr-2" />
              Thêm bài viết
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default NewsForm;
