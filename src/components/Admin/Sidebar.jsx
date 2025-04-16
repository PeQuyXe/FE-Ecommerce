import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sidebar = ({ active, logo }) => {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-2 flex items-center justify-center border-b border-gray-700">
        <Link to="/admin/dashboard">
          <img className="w-16" src={logo} alt="logo" />
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-4">
          <SidebarItem to="/admin/dashboard" icon="fas fa-th-large" label="Bảng điều khiển" active={active === 'dashboard'} />
          <SidebarDropdown active={active === 'product'} label="Mục lục" icon="fas fa-sliders-h">
            <SidebarItem to="/admin/category" label="Danh mục" />
            <SidebarItem to="/admin/product" label="Sản phẩm" />
            <SidebarItem to="/admin/attributes" label="Thuộc tính" />
            <SidebarItem to="/admin/coupon" label="Mã giảm giá" />
            <SidebarItem to="/admin/payment-method" label="Hình thức thanh toán" />
          </SidebarDropdown>
          <SidebarItem to="/admin/brand" icon="fas fa-copyright" label="Thương hiệu" active={active === 'brand'} />
          <SidebarItem to="/admin/order" icon="fas fa-archive" label="Đơn hàng" active={active === 'order'} />
          <SidebarItem to="/admin/user" icon="fas fa-user-friends" label="Người dùng" active={active === 'user'} />
          <SidebarItem to="/admin/role" icon="fas fa-user" label="Vai trò" active={active === 'role'} />
          <SidebarItem to="/admin/news" icon="fas fa-newspaper" label="Tin tức" active={active === 'news'} />
          <SidebarItem to="/admin/store-custom" icon="fab fa-centos" label="Tùy chỉnh cửa hàng" active={active === 'storeCustom'} />
        </ul>
      </nav>
    </aside>
  );
};

const SidebarItem = ({ to, icon, label, active }) => (
  <li>
    <Link to={to} className={`flex items-center gap-3 p-3 rounded-lg transition-all ${active ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
      {icon && <i className={`${icon} text-lg`}></i>}
      <span>{label}</span>
    </Link>
  </li>
);

const SidebarDropdown = ({ label, icon, active, children }) => (
  <li>
    <div className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${active ? 'bg-gray-700' : 'hover:bg-gray-800'}`}>
      <div className="flex items-center gap-3">
        <i className={`${icon} text-lg`}></i>
        <span>{label}</span>
      </div>
      <i className="fas fa-angle-down"></i>
    </div>
    <ul className="ml-6 mt-2 space-y-1">{children}</ul>
  </li>
);

Sidebar.propTypes = {
  active: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

SidebarItem.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

SidebarDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  active: PropTypes.bool,
  children: PropTypes.node,
};

export default Sidebar;