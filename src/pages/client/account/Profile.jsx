import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();

  // Parse user data from localStorage
  const user = JSON.parse(localStorage.getItem('userData'));

  // State to manage menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Redirect to login if no user data is found
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleClosePopup = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after selection
  };

  if (!user) return null; // Return null to avoid rendering if user data is missing

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <button
          onClick={handleClosePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl mb-6 text-center">Hồ sơ người dùng</h2>
        <div className="mb-4">
          <div className="py-6">
            <img
              src={user.avatar} // Assumes userData has an avatar field
              alt={user.fullname}
              className="w-20 h-20 object-cover rounded-full mx-auto"
            />
          </div>
          <div className="text-center font-sans mb-4">
            <h1>{user.fullname}</h1>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">
              Ngày Tạo: {new Date(user.createAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Button to toggle menu */}
        <div className="text-center mb-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Quản lý tài khoản
          </button>
        </div>

        {/* Menu */}
        {isMenuOpen && (
          <div className="space-y-2">
            <button
              onClick={() => handleNavigate('/profile/edit')}
              className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
            >
              Cập nhật thông tin
            </button>
            <button
              onClick={() => handleNavigate('/orders')}
              className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-300"
            >
              Quản lý đơn hàng
            </button>
            {/* Additional menu items can be added here */}
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 mt-4"
        >
          Thoát
        </button>
      </div>
    </div>
  );
};

export default Profile;
