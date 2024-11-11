import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UserForm() {
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    avatar: '',
    isBlock: false,
    roleId: '',
  });
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(true);
  const [error, setError] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setLoadingRoles(true);
        const response = await axios.get('http://localhost:8080/roles');
        setRoles(response.data);
      } catch (err) {
        console.error('Failed to fetch roles:', err);
        setError('Không thể tải vai trò.');
      } finally {
        setLoadingRoles(false);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user:', err);
        setError('Không thể tải thông tin người dùng.');
      }
    };

    if (userId) {
      fetchUser();
    }
    fetchRoles();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = {
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      password: user.password,
      address: user.address,
      isBlock: user.isBlock ? 1 : 0, // Chuyển isBlock thành 1 hoặc 0
      roleId: user.roleId, // Đảm bảo sử dụng đúng roleId
      avatar: user.avatar, // Include avatar URL directly
    };

    try {
      if (userId) {
        await axios.put(`http://localhost:8080/users/${userId}`, formData);
      } else {
        await axios.post('http://localhost:8080/users', formData);
      }
      navigate('/admin/user-list');
    } catch (err) {
      console.error('Error submitting user form:', err);
      setError('Có lỗi xảy ra khi gửi dữ liệu.');
    }
  };

  return (
    <section className="p-8 max-w-2xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl ">
      <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8">
        {userId ? 'Cập nhật người dùng' : 'Thêm người dùng'}
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Họ và tên
          </label>
          <input
            type="text"
            name="fullname"
            value={user.fullname}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            required={!userId}
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Địa chỉ
          </label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Ảnh đại diện (URL)
          </label>
          <input
            type="url"
            name="avatar"
            value={user.avatar}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Vai trò
          </label>
          {loadingRoles ? (
            <p className="text-gray-500">Đang tải...</p>
          ) : (
            <select
              name="roleId" // Thay role_id thành roleId
              value={user.roleId}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            >
              <option value="">Chọn vai trò</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="isBlock"
            checked={user.isBlock}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                isBlock: e.target.checked,
              }))
            }
            className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
          />
          <label className="ml-2 text-lg font-medium text-gray-700">
            Chặn người dùng
          </label>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-200 shadow-md"
          >
            {userId ? 'Cập nhật' : 'Thêm'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserForm;
