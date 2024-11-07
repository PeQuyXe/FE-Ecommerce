// Giả sử bạn có thông tin người dùng trong localStorage
const userData = JSON.parse(localStorage.getItem('userData')) || {};

const Header = () => {
  return (
    <header className="admin-header">
      <div className="header-wrapper m-0">
        <div className="nav-menus">
          <div className="profile-media">
            <div className="me-4">
              <img
                className="user-profile"
                src={
                  userData.avatar ||
                  'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg'
                }
                alt="avatarUser"
              />
            </div>
            <div className="media-body">
              <span>{userData.fullname || 'Admin'}</span>
              <p className="mb-0">
                Admin <i className="fas fa-chevron-down"></i>
              </p>
            </div>
          </div>

          <ul className="profile-dropdown absolute">
            <li>
              <a href="/admin/user">
                <i className="fas fa-user"></i>
                <span>Tài khoản</span>
              </a>
            </li>
            <li>
              <a href="/admin/order">
                <i className="fas fa-archive"></i>
                <span>Đơn hàng</span>
              </a>
            </li>
            <li>
              <a href="/coming-soon">
                <i className="fas fa-cog"></i>
                <span>Cài đặt</span>
              </a>
            </li>
            <li>
              <a href="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <span>Đăng xuất</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
