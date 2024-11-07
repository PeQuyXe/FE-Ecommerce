import { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSold: 0,
    prodCount: 0,
    userCount: 0,
    dataProdOrderBySold: [],
    dataRatingsProd: [],
    totalAmount: 0,
  });

  useEffect(() => {
    // Fetch stats data from the backend
    axios
      .get('/api/dashboard')
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className="content-dashboard-wrap-top">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-xxl-3 col-lg-6">
            <div className="main-tiles border-0 card-hover">
              <div className="card-body bg-green-500 text-white">
                <div className="media d-flex align-items-center">
                  <div className="media-body p-0">
                    <span className="m-0">Tổng doanh thu</span>
                    <h4 className="mb-0">{stats.totalRevenue}</h4>
                  </div>
                  <div className="icon text-center">
                    <i className="fas fa-database text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xxl-3 col-lg-6">
            <div className="main-tiles border-0 card-hover">
              <div className="card-body bg-purple-500 text-white">
                <div className="media d-flex align-items-center">
                  <div className="media-body p-0">
                    <span className="m-0">Tổng lượt bán</span>
                    <h4 className="mb-0">{stats.totalSold}</h4>
                  </div>
                  <div className="icon text-center">
                    <i className="fas fa-shopping-bag text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xxl-3 col-lg-6">
            <div className="main-tiles border-0 card-hover">
              <div className="card-body bg-blue-500 text-white">
                <div className="media d-flex align-items-center">
                  <div className="media-body p-0">
                    <span className="m-0">Tổng sản phẩm</span>
                    <h4 className="mb-0">{stats.prodCount}</h4>
                  </div>
                  <div className="icon text-center">
                    <i className="fab fa-product-hunt text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xxl-3 col-lg-6">
            <div className="main-tiles border-0 card-hover">
              <div className="card-body bg-red-500 text-white">
                <div className="media d-flex align-items-center">
                  <div className="media-body p-0">
                    <span className="m-0">Tổng khách hàng</span>
                    <h4 className="mb-0">{stats.userCount}</h4>
                  </div>
                  <div className="icon text-center">
                    <i className="fas fa-user text-3xl"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Report Chart Section */}
          <div className="col-xl-12">
            <div className="card-hover card-chart">
              <div className="card-header border-0 pb-1">
                <div className="card-header-title">
                  <h4>Báo cáo doanh thu</h4>
                </div>
              </div>
              <div className="card-body border-0 p-0">
                <div id="report-chart"></div>
              </div>
            </div>
          </div>

          {/* Best Selling Products Table */}
          <div className="col-xl-6 col-md-12">
            <div className="card-hover card-table">
              <div className="card-header pb-1">
                <div className="card-header-title">
                  <h4>Sản phẩm bán chạy nhất</h4>
                </div>
              </div>
              <div className="card-body border-0 p-0">
                <table className="table">
                  <tbody>
                    {stats.dataProdOrderBySold.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <div className="best-product-box">
                            <div className="product-image">
                              <img
                                src={product.thumb}
                                className="img-fluid"
                                alt={product.title}
                              />
                            </div>
                            <div className="product-name ms-4">
                              <a
                                href={`/product/${product.slug}-${product.id}`}
                                className="mb-2 text-truncate"
                                target="_blank"
                              >
                                {product.title}
                              </a>
                              <h6 className="mb-0">{product.create_At}</h6>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Giá</h6>
                            <h5 className="mb-0">{product.price}</h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Lượt bán</h6>
                            <h5 className="mb-0">{product.sold}</h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Tổng tiền</h6>
                            <h5 className="mb-0">
                              {product.sold * product.price}
                            </h5>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Ratings Table */}
          <div className="col-xl-6">
            <div className="card-hover card-table">
              <div className="card-header pb-1">
                <div className="card-header-title">
                  <h4>Đánh giá gần đây</h4>
                </div>
              </div>
              <div className="card-body border-0 p-0">
                <table className="table box--padding">
                  <tbody>
                    {stats.dataRatingsProd.map((rating, index) => (
                      <tr key={index}>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Người dùng</h6>
                            <h5 className="mb-0">{rating.fullname}</h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Tên sản phẩm</h6>
                            <h5
                              className="mb-0 text-truncate"
                              style={{ maxWidth: '200px' }}
                            >
                              {rating.title}
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Xếp hạng</h6>
                            <h5 className="mb-0 text-yellow-500">
                              {rating.star}
                            </h5>
                          </div>
                        </td>
                        <td>
                          <div className="product-detail-box">
                            <h6 className="mb-2">Ngày</h6>
                            <h5 className="mb-0">
                              {new Date(rating.create_at).toLocaleDateString()}
                            </h5>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
