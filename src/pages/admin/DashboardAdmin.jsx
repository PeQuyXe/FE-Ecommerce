import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { renderStars } from '../../utils/configformat';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';
import { FaSpinner, FaMoneyBill, FaProductHunt, FaUser } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'react-datepicker/dist/react-datepicker.css';
import { AiOutlineShoppingCart, AiOutlineHeart } from 'react-icons/ai';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [],
  });
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalSold: 0,
    prodCount: 0,
    userCount: 0,
  });
  const [ratings, setRatings] = useState([]);
  const [topSoldProducts, setTopSoldProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(new Date('2024-01-01')); // Ngày bắt đầu mặc định
  const [endDate, setEndDate] = useState(new Date('2024-12-31'));

  useEffect(() => {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];

    axios
      .get('http://localhost:8080/api/dashboard')
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => setError('Error fetching dashboard data: ' + error))
      .finally(() => setLoading(false));
    axios
      .get('http://localhost:8080/api/ratings')
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => setError('Error fetching dashboard data: ' + error))
      .finally(() => setLoading(false));
    axios
      .get('http://localhost:8080/api/dashboard/product/top-sold')
      .then((response) => {
        setTopSoldProducts(response.data);
      })
      .catch((error) => setError('Error fetching top-sold products: ' + error))
      .finally(() => setLoading(false));

    axios
      .get('http://localhost:8080/api/dashboard/total-revenue', {
        params: { startDate: start, endDate: end },
      })

      .then((response) => {
        setRevenueData({
          labels: response.data.labels,
          datasets: [
            {
              label: 'Doanh thu (VND)',
              data: response.data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              tension: 0.4,
              fill: true,
            },
          ],
        });
      })
      .catch((error) => setError('Error fetching revenue data: ' + error))
      .finally(() => setLoading(false));
  }, [startDate, endDate]);

  const formatCurrency = (value) => {
    return value.toLocaleString(); // Format currency with thousand separator
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-6">
        {/* Thông tin tổng quan */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Tổng doanh thu</span>
                <h4 className="text-2xl font-bold">
                  {formatCurrency(stats.totalRevenue)}
                </h4>
              </div>
              <div className="text-4xl">
                <FaMoneyBill />
              </div>
            </div>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Tổng lượt bán</span>
                <h4 className="text-2xl font-bold">{stats.totalSold}</h4>
              </div>
              <div className="text-4xl">
                <AiOutlineShoppingCart />
              </div>
            </div>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Tổng sản phẩm</span>
                <h4 className="text-2xl font-bold">{stats.prodCount}</h4>
              </div>
              <div className="text-4xl">
                <FaProductHunt />
              </div>
            </div>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Tổng khách hàng</span>
                <h4 className="text-2xl font-bold">{stats.userCount}</h4>
              </div>
              <div className="text-4xl">
                <FaUser />
              </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ doanh thu */}
        <section className="bg-gray-50 py-8">
          <div className="container mx-auto px-6">
            <div className="flex justify-between mb-6">
              <div>
                <label className="mr-2">Ngày bắt đầu:</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border p-2 rounded"
                />
              </div>
              <div>
                <label className="mr-2">Ngày kết thúc:</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  dateFormat="yyyy-MM-dd"
                  className="border p-2 rounded"
                />
              </div>
            </div>

            {/* Biểu đồ doanh thu */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">
                Doanh thu theo thời gian
              </h2>
              <Line
                data={revenueData}
                options={{
                  responsive: true,
                  plugins: {
                    title: {
                      display: true,
                      text: 'Doanh thu theo tháng',
                    },
                    tooltip: {
                      callbacks: {
                        label: function (tooltipItem) {
                          // Chuyển số khoa học thành định dạng số thông thường
                          const value = tooltipItem.raw;
                          return `${value.toLocaleString()} VND`;
                        },
                      },
                    },
                  },
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Tháng',
                      },
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Doanh thu (VND)',
                      },
                      ticks: {
                        callback: function (value) {
                          // Đảm bảo rằng ticks trên trục Y cũng được định dạng chính xác
                          return value.toLocaleString();
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </section>

        {/* Sản phẩm bán chạy */}
        <section className="most-sold-product py-8">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-indigo-600 font-semibold">
                Bán chạy nhất
              </span>
              <h2 className="text-2xl font-bold">
                Sản phẩm bán chạy trong cửa hàng
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {topSoldProducts.slice(0, 8).map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition transform hover:scale-105"
                >
                  {/* Hình ảnh sản phẩm */}
                  <div className="relative">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      <img
                        className="w-full h-40 object-contain items-center hover:opacity-90 transition duration-300"
                        src={product.thumb}
                        alt={product.title}
                      />
                    </Link>
                  </div>

                  {/* Nội dung sản phẩm */}
                  <div className="p-4">
                    <div className="flex items-center mb-2">
                      <span className="flex items-center text-yellow-500">
                        {renderStars(product.totalRating)}
                      </span>
                      <span className="text-gray-500 text-sm ml-2">
                        {product.totalUserRatings} Đánh giá
                      </span>
                    </div>
                    <h6 className="text-gray-800 text-lg font-semibold truncate">
                      <Link
                        to={`/product/${product.id}`}
                        onClick={() => window.scrollTo(0, 0)} // Cuộn trang lên đầu khi nhấp vào link
                      >
                        {product.title}
                      </Link>
                    </h6>
                    <div className="flex items-baseline space-x-2 mt-2">
                      <span className="text-lg text-red-500 font-bold">
                        {formatCurrency(product.price)} ₫
                      </span>
                      {product.discount !== 0 && (
                        <span className="text-gray-400 text-sm line-through">
                          {formatCurrency(
                            product.price / (1 - product.discount / 100)
                          )}{' '}
                          ₫
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Nút chức năng */}
                  <div className="p-4 border-t border-gray-200 flex justify-between">
                    <Link
                      to={`/product/${product.id}`}
                      className="flex items-center text-indigo-600 hover:text-indigo-800"
                      onClick={() => window.scrollTo(0, 0)} // Cuộn trang lên đầu khi nhấp vào link
                    >
                      <AiOutlineShoppingCart size={20} />
                    </Link>
                    <button className="flex items-center text-gray-500 hover:text-red-500">
                      <AiOutlineHeart size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="container mx-auto py-8">
        <div className="bg-white p-8 shadow-lg rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-gray-800">
              {ratings.length > 0
                ? 'Tổng hợp các đánh giá '
                : 'Sản phẩm chưa có đánh giá'}
            </h2>
            {loading && <FaSpinner className="animate-spin text-gray-500" />}
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="overflow-x-auto">
            <table className="w-full text-left bg-white border border-gray-300 rounded-lg hover:shadow-xl transition-all duration-300">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white">
                  <th className="px-4 py-2">No.</th>
                  <th className="px-4 py-2">Tên khách hàng</th>
                  <th className="px-4 py-2">Tên sản phẩm</th>
                  <th className="px-4 py-2">Xếp hạng</th>
                  <th className="px-4 py-2">Đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {ratings.slice(0, 5).map((rating, index) => (
                  <tr
                    key={rating.id}
                    className="border-b hover:bg-gray-100 transition-all duration-200"
                  >
                    <td className="px-4 py-2 text-gray-700">{index + 1}</td>
                    <td className="px-4 py-2 flex items-center text-gray-700">
                      <img
                        src={rating.user.avatar}
                        alt={rating.user.fullname}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      {rating.user.fullname}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {rating.product.title}
                    </td>
                    <td className="px-4 py-2 text-yellow-400">
                      {'★'.repeat(rating.star)}
                    </td>
                    <td className="px-4 py-2 max-w-xs truncate text-gray-600">
                      {rating.comment}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Dashboard;
