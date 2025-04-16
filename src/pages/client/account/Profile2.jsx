import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTimes, FaUserEdit, FaSignOutAlt, FaBox } from 'react-icons/fa';
const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userData'))
  );
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      setFormData({ ...user, password: '' });
    }
  }, [user, navigate]);

  const handleClosePopup = () => {
    navigate('/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const isUnchanged =
      JSON.stringify(user) ===
      JSON.stringify({
        ...formData,
        password: user.password,
      });
    if (isUnchanged) {
      toast.success('Thông tin đã cập nhật thành công!');
      return;
    }

    const updatedData = {
      ...formData,
      isBlock: 0,
      roleId: 1,
    };
    delete updatedData.password;

    try {
      await axios.put(`http://localhost:8080/users/${user.id}`, updatedData);
      localStorage.setItem('userData', JSON.stringify(updatedData));
      setUser(updatedData);
      setIsEditing(false);
      toast.success('Cập nhật thông tin thành công!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Có lỗi xảy ra khi cập nhật thông tin.');
    }
  };

  const handleManageOrders = () => {
    navigate('/admin/order-list');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative animate-fadeIn">
        <button
          onClick={handleClosePopup}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl mb-6 text-center text-indigo-600 font-semibold">
          Hồ sơ người dùng
        </h2>

        <div className="mb-6 text-center">
          <img
            src={user.avatar}
            alt={user.fullname}
            className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500 shadow-lg mb-4 hover:scale-110"
          />
          <h1 className="text-xl font-medium text-gray-800">{user.fullname}</h1>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">
            Ngày Tạo: {new Date(user.createAt).toLocaleDateString()}
          </p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Họ và tên"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Số điện thoại"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              required
            />
            {/* <input
              type="password"
              name="password"
              value={user.password}
              readOnly
              onChange={handleInputChange}
              placeholder="Mật khẩu mới"
              className="w-full p-3 border border-gray-300 bg-gray-200 rounded-lg shadow-md cursor-not-allowed"
            /> */}
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Địa chỉ"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              placeholder="Ảnh đại diện (URL)"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Trở về
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Cập nhật
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        ) : (
          <div className="text-center space-y-4">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaUserEdit className="inline mr-2" />
              Quản lý tài khoản
            </button>
            <button
              onClick={handleManageOrders}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <FaBox className="inline mr-2" />
              Quản lý đơn hàng
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
            >
              <FaSignOutAlt className="inline mr-2" />
              Thoát
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
