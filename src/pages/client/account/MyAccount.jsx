import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../actions/authActions';
import { formatCurrency } from '../../../utils/configformat';

function DashboardAccount() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const orders = useSelector((state) => state.orders); // Giả sử bạn có một slice orders trong Redux store

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className="dashboard-account-area">
      <div className="container">
        <div className="dashboard-warp">
          <div className="dashboard-author">
            <div className="flex items-center">
              <div className="thumbnail">
                <img
                  src={user?.photoURL || 'https://via.placeholder.com/150'}
                  alt={user?.fullname || 'User'}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </div>
              <div className="ml-4">
                <h5 className="title mb-0">Xin chào,</h5>
                <span className="joining-date">
                  Thành viên kể từ{' '}
                  {new Date(user?.create_At).toLocaleDateString('en-GB')}.
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <aside className="dashboard-aside md:col-span-1">
              <nav className="dashboard-nav">
                <div className="space-y-2">
                  <div className="nav-item nav-link active cursor-pointer">
                    <i className="fas fa-th-large"></i>Bảng điều khiển
                  </div>
                  <div className="nav-item nav-link cursor-pointer">
                    <i className="fas fa-shopping-basket"></i>Đơn hàng
                  </div>
                  <div className="nav-item nav-link cursor-pointer">
                    <i className="fas fa-location-circle"></i>Địa chỉ
                  </div>
                  <div className="nav-item nav-link cursor-pointer">
                    <i className="fas fa-user"></i>Tài khoản
                  </div>
                  <div
                    className="nav-item nav-link cursor-pointer"
                    onClick={handleLogout}
                  >
                    <i className="fas fa-sign-out"></i>Đăng xuất
                  </div>
                </div>
              </nav>
            </aside>
            <div className="md:col-span-2">
              <div className="tab-content">
                <div id="nav-dashboard" className="tab-pane fade show active">
                  <div className="dashboard-overview">
                    <div className="welcome-text">
                      Xin chào, {user?.fullname} (không phải{' '}
                      <span className="fw-bold">{user?.fullname}</span>?{' '}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Đăng xuất
                      </span>
                      )
                    </div>
                    <p>
                      Từ bảng điều khiển tài khoản của mình, bạn có thể xem các
                      đơn đặt hàng gần đây, quản lý địa chỉ giao hàng và thanh
                      toán cũng như chỉnh sửa mật khẩu và chi tiết tài khoản của
                      mình.
                    </p>
                    <div className="dashboard-order">
                      <div className="table-custom">
                        <table className="theme-table table_id">
                          <thead>
                            <tr>
                              <th>Mã đơn</th>
                              <th>Ngày đặt hàng</th>
                              <th>Phương thức thanh toán</th>
                              <th>Trạng thái</th>
                              <th>Tổng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.map((order, index) => (
                              <tr key={index}>
                                <td>{'#' + order.order_code}</td>
                                <td>{order.order_date}</td>
                                <td className="fw-bold">
                                  {order.payment_method_name}
                                </td>
                                <td
                                  className={
                                    order.order_status_id === 5
                                      ? 'status-danger'
                                      : 'status-success'
                                  }
                                >
                                  <span className="fw-medium">
                                    {order.order_status_name}
                                  </span>
                                </td>
                                <td className="fw-bold">
                                  {formatCurrency(order.total_money)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Repeat similar structure for other tabs (orders, address, account) */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardAccount;
