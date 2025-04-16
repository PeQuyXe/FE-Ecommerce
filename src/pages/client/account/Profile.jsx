import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUserEdit, FaSignOutAlt, FaBox, FaTimes } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phone: '',
    address: '',
    avatar: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('userData'));
        if (!storedUser || !storedUser.id) {
          navigate('/login');
          return;
        }
        const response = await axios.get(`http://localhost:8080/users/${storedUser.id}`);
        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        navigate('/login');
      }
    };
    fetchUserData();
  }, [navigate]);

  const handleClosePopup = () => navigate('/');

  const handleLogout = () => {
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const updatedData = {
      ...formData,
      isBlock: 0,
      roleId: 3,
    };
    delete updatedData.password;

    try {
      await axios.put(`http://localhost:8080/users/${user.id}`, updatedData);
      setUser(updatedData);
      setIsEditing(false);
      console.log('Updated user:', updatedData);
      toast.success('Cập nhật thông tin thành công!');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Có lỗi xảy ra khi cập nhật thông tin.');
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full relative animate-fadeIn">
        <button
          onClick={handleClosePopup}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          <FaTimes />
        </button>
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Hồ sơ cá nhân</h2>
        <div className="text-center relative">
          <img
            src={formData.avatar}
            alt={formData.fullname}
            className="w-24 h-24 rounded-full mx-auto border-4 border-indigo-500 shadow-lg mb-4 hover:scale-110"
          />
          <h3 className="text-xl font-semibold text-gray-800">{formData.fullname}</h3>
          <p className="text-gray-600">{formData.email}</p>
          {user.createAt && <p className="text-gray-500 text-sm">Ngày tạo: {new Date(user.createAt).toLocaleDateString()}</p>}
        </div>
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4 mt-6">
            {["fullname", "email", "phone", "address", "avatar"].map((field) => (
              <input
                key={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field] || ''}
                onChange={handleInputChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                required
              />
            ))}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Cập nhật
              </button>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
          </form>
        ) : (
          <div className="flex flex-col gap-4 mt-6">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
            >
              <FaUserEdit /> Quản lý tài khoản
            </button>
            <button
              onClick={() => navigate('/order-list')}
              className="w-full bg-blue-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition"
            >
              <FaBox /> Quản lý đơn hàng
            </button>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600 transition"
            >
              <FaSignOutAlt /> Thoát
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
