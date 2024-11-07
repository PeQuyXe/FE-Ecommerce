import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import React Icons

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [id, setId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  // Hàm lấy danh sách danh mục từ API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  // Hàm xóa danh mục
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
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="container mx-auto bg-white shadow-lg rounded-xl p-4">
          <div className="flex justify-between items-center mb-6">
            <h5 className="text-2xl font-semibold text-gray-800">
              Danh sách danh mục
            </h5>
            <Link
              to="/admin/add-category"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition"
            >
              Thêm danh mục
            </Link>
          </div>

          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="text-left text-lg font-semibold text-gray-600">
                <th className="py-3 px-4">Tên danh mục</th>
                <th className="py-3 px-4">Ảnh danh mục</th>
                <th className="py-3 px-4">Thực thi</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-t hover:bg-gray-100">
                  <td className="py-3 px-4">{category.name}</td>
                  <td className="py-3 px-4">
                    <img
                      src={`/src/assets/category/${category.image}`} // Đảm bảo đường dẫn ảnh chính xác
                      alt={`Image of ${category.name}`}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-4">
                      <Link
                        to={`/admin/update-category/${category.id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FaEdit className="inline mr-2" /> Sửa
                      </Link>
                      <button
                        onClick={() => setId(category.id)} // Set id cho danh mục cần xóa
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt className="inline mr-2" /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
                  className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Đồng ý
                </button>
                <button
                  onClick={() => setId(null)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default CategoryList;
