import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const NewsList = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/news');
      setNewsList(response.data);
    } catch (error) {
      console.error('Failed to fetch news', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/news/${id}`);
      fetchNews();
    } catch (error) {
      console.error('Failed to delete news', error);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="container mx-auto py-6 px-4">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/admin/add-news"
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
          >
            Thêm bài viết
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out hover:scale-105"
            >
              <img
                src={news.thumb}
                alt={news.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2">{news.authorName}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(news.createAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 mt-2">{news.view} lượt xem</p>

                <div className="mt-2 flex justify-between items-center">
                  <Link
                    to={`/admin/edit-news/${news.id}`}
                    className="text-blue-500 hover:text-blue-700 flex items-center space-x-1"
                  >
                    <FaEdit className="text-lg" />
                    <span>Chỉnh sửa</span>
                  </Link>
                  <button
                    onClick={() => handleDelete(news.id)}
                    className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                  >
                    <FaTrashAlt className="text-lg" />
                    <span>Xóa</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsList;
