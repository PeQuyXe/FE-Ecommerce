import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get('http://localhost:8080/api/category');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  const deleteCategory = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/category/${id}`);
      setCategories(categories.filter((category) => category.id !== id)); // Cập nhật lại danh sách
      setId(null); // Reset id sau khi xóa
    } catch (error) {
      console.error('Failed to delete category', error);
    }
  };

  return (
    <section className="container mx-auto bg-white p-6 rounded-lg shadow-md">
      <h5 className="text-3xl font-semibold text-gray-800 mb-5">
        Danh sách danh mục
      </h5>
      <Link
        to="/admin/add-category"
        className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
      >
        Thêm danh mục
      </Link>

      <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden mt-6 items-center">
        <thead className="bg-indigo-600 text-white">
          <tr className="text-lg font-semibold">
            <th className="px-6 py-4 w-1/3 text-center">Tên danh mục</th>
            <th className="px-6 py-4 w-1/3 text-center">Ảnh danh mục</th>
            <th className="px-6 py-4 w-1/3 text-center">Thực thi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-t hover:bg-indigo-50">
              <td className="px-6 py-4 w-1/3 text-center align-middle">
                {category.name}
              </td>
              <td className="px-6 py-4 w-1/3 text-center align-middle">
                <img
                  src={`/src/assets/category/${category.image}`} // Đảm bảo đường dẫn ảnh chính xác
                  alt={`Image of ${category.name}`}
                  className="w-16 h-16 object-contain rounded-lg shadow-md mx-auto"
                />
              </td>
              <td className="px-6 py-4 w-1/3 text-center align-middle">
                <div className="flex items-center justify-center space-x-6">
                  <Link
                    to={`/admin/update-category/${category.id}`}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2 transition duration-300"
                  >
                    <FaEdit /> <span>Sửa</span>
                  </Link>
                  <button
                    onClick={() => setId(category.id)} // Set id cho danh mục cần xóa
                    className="text-red-600 hover:text-red-800 flex items-center space-x-2 transition duration-300"
                  >
                    <FaTrashAlt /> <span>Xóa</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal xác nhận xóa */}
      {id && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-sm w-full">
            <h5 className="mb-4 text-xl font-semibold text-gray-800">
              Bạn đã chắc chắn chưa?
            </h5>
            <p className="mb-4 text-gray-600">
              Nếu thực hiện đồng ý xoá bạn sẽ bị xoá vĩnh viễn không thể khôi
              phục lại.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={deleteCategory}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
              >
                Đồng ý
              </button>
              <button
                onClick={() => setId(null)}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CategoryList;
