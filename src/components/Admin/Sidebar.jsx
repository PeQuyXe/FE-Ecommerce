import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sidebar = ({ active, logo }) => {
  return (
    <section className="sidebar-wrapper">
      <div className="top-fixed-sidebar">
        <div className="logo-wrapper">
          <Link to="/admin/dashboard">
            <img className="img-fluid for-white" src={logo} alt="logo" />
          </Link>
        </div>
      </div>
      <nav className="sidebar-main">
        <div className="sidebar-menu">
          <ul className="sidebar-links">
            <li
              className={`sidebar-list ${
                active === 'dashboard' ? 'active' : ''
              }`}
            >
              <Link className="sidebar-list-link" to="/admin/dashboard">
                <i className="fas fa-th-large"></i>
                <span>Bảng điều khiển</span>
              </Link>
            </li>
            <li
              className={`sidebar-list ${active === 'product' ? 'active' : ''}`}
            >
              <Link className="sidebar-list-link" to="#">
                <i className="fas fa-sliders-h"></i>
                <span>Mục lục</span>
                <div className="according-menu">
                  <i className="fas fa-angle-right"></i>
                </div>
              </Link>
              <ul className="sidebar-submenu">
                <li>
                  <i className="fas fa-minus"></i>
                  <Link to="/admin/category">Danh mục</Link>
                </li>
                <li>
                  <i className="fas fa-minus"></i>
                  <Link to="/admin/product">Sản phẩm</Link>
                </li>
                <li>
                  <i className="fas fa-minus"></i>
                  <Link to="/admin/attributes">Thuộc tính</Link>
                </li>
                <li>
                  <i className="fas fa-minus"></i>
                  <Link to="/admin/coupon">Mã giảm giá</Link>
                </li>
                <li>
                  <i className="fas fa-minus"></i>
                  <Link to="/admin/payment-method">Hình thức thanh toán</Link>
                </li>
              </ul>
            </li>
            <li
              className={`sidebar-list ${active === 'brand' ? 'active' : ''}`}
            >
              <Link className="sidebar-list-link" to="/admin/brand">
                <i className="fas fa-copyright"></i>
                <span>Thương hiệu</span>
              </Link>
            </li>
            <li
              className={`sidebar-list ${active === 'order' ? 'active' : ''}`}
            >
              <Link className="sidebar-list-link" to="/admin/order">
                <i className="fas fa-archive"></i>
                <span>Đơn hàng</span>
              </Link>
            </li>
            <li className={`sidebar-list ${active === 'user' ? 'active' : ''}`}>
              <Link className="sidebar-list-link" to="/admin/user">
                <i className="fas fa-user-friends"></i>
                <span>Người dùng</span>
              </Link>
            </li>
            <li className={`sidebar-list ${active === 'role' ? 'active' : ''}`}>
              <Link className="sidebar-list-link" to="/admin/role">
                <i className="fas fa-user"></i>
                <span>Vai trò</span>
              </Link>
            </li>
            <li className={`sidebar-list ${active === 'news' ? 'active' : ''}`}>
              <Link className="sidebar-list-link" to="/admin/news">
                <i className="fas fa-newspaper"></i>
                <span>Tin tức</span>
              </Link>
            </li>
            <li
              className={`sidebar-list ${
                active === 'storeCustom' ? 'active' : ''
              }`}
            >
              <Link className="sidebar-list-link" to="/admin/store-custom">
                <i className="fab fa-centos"></i>
                <span>Tuỳ chỉnh cửa hàng</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </section>
  );
};

// Thêm xác thực props
Sidebar.propTypes = {
  active: PropTypes.string.isRequired,
  logo: PropTypes.string.isRequired,
};

export default Sidebar;
