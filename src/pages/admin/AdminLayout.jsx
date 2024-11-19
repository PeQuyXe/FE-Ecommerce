import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaThLarge,
  FaSlidersH,
  FaMinus,
  FaCopyright,
  FaArchive,
  FaUserFriends,
  FaTags,
  FaNewspaper,
  FaUserTag,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';

const AdminLayout = () => {
  const logo = '/src/assets/logo/logo.png';
  const location = useLocation();
  const activePage = location.pathname.split('/')[2];

  const userData = JSON.parse(localStorage.getItem('userData')) || {};

  const routes = [
    { path: 'dashboard', icon: <FaThLarge />, label: 'Bảng điều khiển' },
    { path: 'category', icon: <FaSlidersH />, label: 'Danh mục' },
    { path: 'products', icon: <FaMinus />, label: 'Sản phẩm' },
    { path: 'brand', icon: <FaCopyright />, label: 'Thương hiệu' },
    { path: 'order-list', icon: <FaArchive />, label: 'Đơn hàng' },
    { path: 'user-list', icon: <FaUserFriends />, label: 'Người dùng' },
    { path: 'coupons', icon: <FaTags />, label: 'Mã giảm giá' },
    { path: 'news', icon: <FaNewspaper />, label: 'Tin tức' },
    { path: 'roles', icon: <FaUserTag />, label: 'Vai trò' },
  ];

  return (
    <div className="flex h-screen bg-gray-300">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-200 text-white flex flex-col shadow-lg">
        <div className="p-4 flex justify-center mb-10">
          <Link to="/admin/dashboard">
            <img className="w-28 h-auto" src={logo} alt="Logo" />
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-2 px-4">
            {routes.map((route) => (
              <li key={route.path}>
                <Link
                  to={`/admin/${route.path}`}
                  className={`flex items-center p-3 rounded-lg transition-all ${
                    activePage === route.path
                      ? 'bg-gray-700 text-white'
                      : 'hover:bg-gray-700 hover:text-white text-gray-400'
                  }`}
                >
                  <span className="text-xl mr-3">{route.icon}</span>
                  <span className="text-sm font-medium">{route.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex justify-between items-center bg-gray-100 px-6 py-4 shadow-md rounded-md">
          <h1 className="text-2xl font-bold text-gray-600">Control Panel</h1>
          <div className="relative">
            <div className="flex items-center cursor-pointer group">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={
                  userData.avatar ||
                  'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                }
                alt="User Avatar"
              />
              <div className="ml-3">
                <span className="font-medium text-gray-700">
                  {userData.fullname || 'Admin'}
                </span>
                <p className="text-sm text-gray-500 flex items-center">
                  Admin{' '}
                  <FaChevronDown className="ml-1 transition-transform duration-300 transform group-hover:rotate-180" />
                </p>
              </div>
            </div>
            {/* Dropdown */}
            <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg text-gray-700 w-48 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
              <li className="border-b">
                <Link
                  to="/admin/user"
                  className="absolute px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaUser className="mr-2" /> Tài khoản
                </Link>
              </li>
              <li className="border-b">
                <Link
                  to="/admin/order"
                  className="absolute px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaArchive className="mr-2" /> Đơn hàng
                </Link>
              </li>
              <li className="border-b">
                <Link
                  to="/coming-soon"
                  className="absolute px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaCog className="mr-2" /> Cài đặt
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="absolute px-4 py-2 hover:bg-gray-100 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" /> Đăng xuất
                </Link>
              </li>
            </ul>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet /> {/* Render nội dung động */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
