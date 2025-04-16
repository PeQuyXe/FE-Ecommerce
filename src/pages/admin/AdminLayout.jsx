import { Link, Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import Header from '../../components/Admin/Header';
import {
  FaThLarge, FaSlidersH, FaMinus, FaCopyright, FaArchive,
  FaUserFriends, FaTags, FaNewspaper, FaUserTag
} from 'react-icons/fa';
import classNames from 'classnames';

const AdminLayout = () => {
  const location = useLocation();
  const activePage = location.pathname.split('/')[2];
  const logo = '/src/assets/logo/logo.png';

  const routes = useMemo(() => [
    { path: 'dashboard', icon: FaThLarge, label: 'Bảng điều khiển' },
    { path: 'category', icon: FaSlidersH, label: 'Danh mục' },
    { path: 'products', icon: FaMinus, label: 'Sản phẩm' },
    { path: 'brand', icon: FaCopyright, label: 'Thương hiệu' },
    { path: 'order-list', icon: FaArchive, label: 'Đơn hàng' },
    { path: 'user-list', icon: FaUserFriends, label: 'Người dùng' },
    { path: 'coupons', icon: FaTags, label: 'Mã giảm giá' },
    { path: 'news', icon: FaNewspaper, label: 'Tin tức' },
    { path: 'roles', icon: FaUserTag, label: 'Vai trò' },
    { path: 'attributes', icon: FaSlidersH, label: 'Thuộc tính' },
  ], []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="transition-all duration-300 bg-gray-900 text-white p-4 flex flex-col w-64">
        {/* Logo */}
        <div className="flex justify-center items-center mb-6">
          <Link to="/admin/dashboard">
            <img className="transition-all h-auto w-28" src={logo} alt="Logo" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-3">
            {routes.map(({ path, icon: Icon, label }) => (
              <li key={path} className="relative group">
                <Link
                  to={`/admin/${path}`}
                  className={classNames(
                    'flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    activePage === path ? 'bg-blue-500 text-white' : 'hover:bg-blue-600 hover:text-white text-gray-300'
                  )}
                >
                  <Icon className="text-lg transition-transform transform group-hover:scale-110" />
                  <span className="ml-3">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1 bg-white rounded-lg m-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
