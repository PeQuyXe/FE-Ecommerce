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
} from 'react-icons/fa';
import Header from '../../components/Admin/Header';

const AdminLayout = () => {
  const logo = '/src/assets/logo/logo.png';
  const location = useLocation();
  const activePage = location.pathname.split('/')[2];

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
    { path: 'attributes', icon: <FaSlidersH />, label: 'Thuộc tính' },
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
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet /> {/* Render nội dung động */}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
