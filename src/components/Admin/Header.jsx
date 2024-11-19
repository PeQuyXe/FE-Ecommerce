import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { FaChevronDown } from 'react-icons/fa';
// import { useAuth } from '../../AuthContext';
// import { toast } from 'react-toastify';

const Header = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleNavigation = () => {
    const userData = localStorage.getItem('userData');
    if (!userData) {
      navigate('/login');
    } else {
      navigate('/admin/profile');
    }
  };
  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  return (
    <header className="flex justify-between items-center bg-gray-100 px-6 py-4 shadow-md rounded-md">
      <h1 className="text-2xl font-bold text-gray-600">Bảng Điều Khiển</h1>
      <div className="relative">
        <div className="flex items-center cursor-pointer group">
          <img
            onClick={handleNavigation}
            className="h-10 w-10 rounded-full object-cover"
            src={
              userData?.avatar ||
              'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
            }
            alt="avatar"
          />
          <div className="ml-3">
            <span
              onClick={handleNavigation}
              className="font-medium text-gray-700"
            >
              {userData?.fullname || 'Admin'}
            </span>
            {/* <p className="text-sm text-gray-500 flex items-center">
              {userData?.role || 'Admin'}
              <FaChevronDown className="ml-1 transition-transform duration-300 transform group-hover:rotate-180" />
            </p> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
