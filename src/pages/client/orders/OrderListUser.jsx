import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa'; // Icon từ react-icons

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;

  const goToOrderDetail = (orderId) => {
    // Dùng navigate để điều hướng đến chi tiết đơn hàng
    navigate(`/order-detail/${orderId}`);
  };

  // Lấy danh sách đơn hàng từ backend theo userId
  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) {
        console.error('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        // API trả về các đơn hàng của người dùng hiện tại
        const response = await axios.get(
          `http://localhost:8080/api/orders/user/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p className="text-center mt-10">Đang tải danh sách đơn hàng...</p>;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="card bg-white shadow-lg rounded-lg">
        <div className="title-header py-4 px-6 border-b">
          <h5 className="text-2xl font-semibold text-center">
            Danh sách đơn hàng
          </h5>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border text-sm">Mã đơn hàng</th>
                <th className="p-3 border text-sm">Ngày tạo đơn</th>
                <th className="p-3 border text-sm">Người đặt hàng</th>
                <th className="p-3 border text-sm">Phương thức thanh toán</th>
                <th className="p-3 border text-sm">Thành tiền</th>
                <th className="p-3 border text-sm">Trạng thái</th>
                <th className="p-3 border text-sm">Cập nhật đơn hàng</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-all duration-300"
                >
                  <td className="p-3 border text-sm">#{order.orderCode}</td>
                  <td className="p-3 border text-sm">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 border text-sm">{order.fullname}</td>
                  <td className="p-3 border text-sm">
                    {'Thanh toán khi nhận hàng'}
                  </td>
                  <td className="p-3 border text-sm font-bold">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(order.totalMoney)}
                  </td>
                  <td
                    className={`p-3 border text-sm font-semibold ${
                      order.orderStatusId === 5
                        ? 'text-red-500'
                        : 'text-green-500'
                    }`}
                  >
                    {order.orderStatus.name}
                  </td>
                  <td className="p-3 border text-sm">
                    <button
                      onClick={() => goToOrderDetail(order.id)}
                      className="flex items-center text-blue-500 hover:text-blue-700 transition-all duration-200"
                    >
                      <FaEye className="mr-2" />
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
