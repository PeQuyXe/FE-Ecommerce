// import avatarPlaceholder from './path/to/avatar-placeholder.png';

function DashboardAccount() {
  return (
    <section className="dashboard-account-area">
      <div className="container">
        <div className="dashboard-warp">
          <div className="dashboard-author">
            <div className="flex items-center">
              <div className="thumbnail">
                <img
                  src="https://res.cloudinary.com/dfgkkkcoc/image/upload/v1700472991/uploads_WEB2041_Ecommerce/phpADF_qwzk6l.jpg"
                  alt={'name'}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </div>
              <div className="ml-4">
                <h5 className="title mb-0">Xin chào,</h5>
                {/* <span className="joining-date">
                  Thành viên kể từ{' '}
                  {new Date(dataUserCurrent.create_At).toLocaleDateString(
                    'en-GB'
                  )}
                  .
                </span> */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <aside className="dashboard-aside md:col-span-1">
              <nav className="dashboard-nav">
                <div className="space-y-2">
                  <a href="#nav-dashboard" className="nav-item nav-link active">
                    <i className="fas fa-th-large"></i>Bảng điều khiển
                  </a>
                  <a href="#nav-orders" className="nav-item nav-link">
                    <i className="fas fa-shopping-basket"></i>Đơn hàng
                  </a>
                  <a href="#nav-address" className="nav-item nav-link">
                    <i className="fas fa-location-circle"></i>Địa chỉ
                  </a>
                  <a href="#nav-account" className="nav-item nav-link">
                    <i className="fas fa-user"></i>Tài khoản
                  </a>
                  <a href="logout" className="nav-item nav-link">
                    <i className="fas fa-sign-out"></i>Đăng xuất
                  </a>
                </div>
              </nav>
            </aside>
            <div className="md:col-span-2">
              <div className="tab-content">
                <div id="nav-dashboard" className="tab-pane fade show active">
                  <div className="dashboard-overview">
                    <div className="welcome-text">
                      Xin chào, (không phải{' '}
                      <span className="fw-bold">
                        {/* {dataUserCurrent.fullname} */}
                      </span>
                      ? <a href="logout">Đăng xuất</a>)
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
                          {/* <tbody>
                            {dataOrder.map((dataOrderItem, index) => (
                              <tr key={index}>
                                <td>{'#' + dataOrderItem.order_code}</td>
                                <td>{dataOrderItem.order_date}</td>
                                <td className="fw-bold">
                                  {dataOrderItem.payment_method_name}
                                </td>
                                <td
                                  className={
                                    dataOrderItem.order_status_id === 5
                                      ? 'status-danger'
                                      : 'status-success'
                                  }
                                >
                                  <span className="fw-medium">
                                    {dataOrderItem.order_status_name}
                                  </span>
                                </td>
                                <td className="fw-bold">
                                  {Format.formatCurrency(
                                    dataOrderItem.total_money
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody> */}
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
