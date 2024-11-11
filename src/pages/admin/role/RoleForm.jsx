import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlus, FaEdit } from 'react-icons/fa'; // Import icons from react-icons

const RoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roleData, setRoleData] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchRoleById(id);
  }, [id]);

  const fetchRoleById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/roles/${id}`);
      setRoleData(response.data);
    } catch (error) {
      console.error('Failed to fetch role by ID', error);
      setError('Không thể tải dữ liệu vai trò. Vui lòng thử lại.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleData({
      ...roleData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = roleData;
    const formData = { name, description };

    try {
      if (id) {
        // Update the role if ID exists
        await axios.put(`http://localhost:8080/roles/${id}`, formData);
      } else {
        // Create a new role
        await axios.post('http://localhost:8080/roles', formData);
      }
      navigate('/admin/roles');
    } catch (err) {
      console.error('Lỗi gửi Data:', err);
      setError('Không thể gửi dữ liệu. Vui lòng thử lại.');
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {id ? 'Sửa' : 'Thêm'} vai trò
        </h2>

        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Tên vai trò *
          </label>
          <input
            type="text"
            name="name"
            value={roleData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Mô tả
          </label>
          <input
            type="text"
            name="description"
            value={roleData.description}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {id ? (
            <>
              <FaEdit className="mr-2" />
              Cập nhật vai trò
            </>
          ) : (
            <>
              <FaPlus className="mr-2" />
              Thêm vai trò
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default RoleForm;
