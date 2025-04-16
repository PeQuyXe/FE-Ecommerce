import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const goToOrderDetail = (orderId) => {
    navigate(`/admin/order-detail/${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <p className="ml-4 text-blue-600 font-semibold">
          Đang tải danh sách đơn hàng
        </p>
      </div>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white border-collapse border border-gray-200 text-gray-700">
            <thead className="bg-indigo-600 font-bold text-white">
              <tr>
                <th className="px-4 py-3 border">Mã đơn hàng</th>
                <th className="px-4 py-3 border">Ngày tạo đơn</th>
                <th className="px-4 py-3 border">Người đặt hàng</th>
                <th className="px-4 py-3 border">Phương thức thanh toán</th>
                <th className="px-4 py-3 border">Thành tiền</th>
                <th className="px-4 py-3 border">Trạng thái</th>
                <th className="px-4 py-3 border">Cập nhật</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-blue-50 transition duration-200 ease-in-out"
                >
                  <td className="px-4 py-3 border text-blue-600 font-medium">
                    #{order.orderCode}
                  </td>
                  <td className="px-4 py-3 border">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 border">{order.fullname}</td>
                  <td className="px-4 py-3 border">Thanh toán khi nhận hàng</td>
                  <td className="px-4 py-3 border font-bold text-green-600">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(order.totalMoney)}
                  </td>
                  <td
                    className={`px-4 py-3 border font-semibold ${order.orderStatusId === 5
                      ? 'text-red-500'
                      : 'text-green-500'
                      }`}
                  >
                    {order.orderStatus.name}
                  </td>
                  <td className="px-4 py-3 border text-center">
                    <button
                      onClick={() => goToOrderDetail(order.id)}
                      className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                      Cập Nhật
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-gray-50 text-right">
          <p className="text-gray-500">
            Tổng số đơn hàng:{' '}
            <span className="font-semibold">{orders.length}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OrderList;
