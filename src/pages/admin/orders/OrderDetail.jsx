import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
const OrderDetail = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  // Fetch thông tin đơn hàng và trạng thái đơn hàng từ backend
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`
        );
        const statusResponse = await axios.get(
          'http://localhost:8080/api/orders/order-status' // URL để lấy trạng thái đơn hàng
        );

        setOrder(orderResponse.data);
        setOrderStatus(statusResponse.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value); // Lưu ID trạng thái mới
  };

  const handleUpdateStatus = async () => {
    try {
      console.log('Updating status:', newStatus);

      await axios.post(
        `http://localhost:8080/api/orders/order/${orderId}/update-status`, // Cập nhật đúng URL
        {
          statusId: newStatus, // Gửi ID trạng thái mới
        }
      );
      setIsModalOpen(false);
      toast.success('Trạng thái đơn hàng đã được cập nhật!');
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (!order) return <p>Đang tải thông tin đơn hàng...</p>;

  return (
    <section className="min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h5 className="text-xl font-semibold mb-6">
          Đơn hàng #{order.orderCode}
        </h5>
        <div className="order-detail">
          {/* Hiển thị chi tiết đơn hàng */}
          <div className="order-top mb-6">
            <ul className="text-gray-700">
              <li>{order.orderDate}</li>
              {/* Kiểm tra order.items có tồn tại và có length */}
              <li>{order.orderItems ? order.orderItems.length : 0} mặt hàng</li>
              <li>
                Tổng:{' '}
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(order.totalMoney)}
              </li>
            </ul>
          </div>
          {/* Chi tiết các mặt hàng trong đơn */}
          <div className="flex space-x-6">
            <div className="w-2/3">
              <div className="table-details">
                <div className="heading mb-4">Mặt hàng</div>
                <table className="table-auto w-full">
                  <tbody>
                    {/* Kiểm tra order.orderItems trước khi map */}
                    {order.orderItems && order.orderItems.length > 0 ? (
                      order.orderItems.map((item, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 px-2">
                            <img
                              src={item.productImage}
                              alt={item.productName}
                              className="w-16 h-16 object-cover"
                            />
                          </td>
                          <td className="py-3 px-2">
                            <h5>{item.productName}</h5>
                            {/* Hiển thị phân loại sản phẩm từ variantValues */}
                            <p>
                              Phân loại:{' '}
                              {item.variantValues
                                ? Object.entries(item.variantValues).map(
                                  ([key, value], i) => (
                                    <span key={i}>
                                      {key}: {value}
                                      {i <
                                        Object.entries(item.variantValues)
                                          .length -
                                        1 && ', '}
                                    </span>
                                  )
                                )
                                : 'Không có phân loại'}
                            </p>
                          </td>
                          <td className="py-3 px-2">
                            <p>Số lượng</p>
                            <h5>{item.quantity}</h5>
                          </td>
                          <td className="py-3 px-2">
                            <p>Giá</p>
                            <h5>
                              {new Intl.NumberFormat('vi-VN', {
                                style: 'currency',
                                currency: 'VND',
                              }).format(item.price)}
                            </h5>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-3">
                          Không có mặt hàng nào
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="3" className="py-3 px-2">
                        <h5>Tạm tính:</h5>
                      </td>
                      <td className="py-3 px-2">
                        <h4>
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(order.totalMoney)}
                        </h4>
                      </td>
                    </tr>

                    <tr>
                      <td colSpan="3" className="py-3 px-2">
                        <h4 className="font-semibold text-blue-600">
                          Thành tiền:
                        </h4>
                      </td>
                      <td className="py-3 px-2">
                        <h4 className="font-semibold text-blue-600">
                          {new Intl.NumberFormat('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          }).format(order.totalMoney)}
                        </h4>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Tóm tắt thông tin đơn hàng */}
            <div className="w-1/3">
              <div className="order-summary">
                <h4 className="font-semibold">Tóm tắt</h4>
                <ul>
                  <li>Mã đơn hàng: #{order.orderCode}</li>
                  <li>
                    Ngày đặt hàng:{' '}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </li>
                  <li>
                    Tổng tiền:{' '}
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(order.totalMoney)}
                  </li>
                </ul>

                <h4 className="font-semibold mt-4">Địa chỉ giao hàng</h4>
                <ul>
                  <li>
                    {order.fullname} - {order.phone} - {order.address}
                  </li>
                </ul>

                <h4 className="font-semibold mt-4">Phương thức thanh toán</h4>
                <ul>
                  <li>Thanh toán khi nhận hàng</li>
                </ul>
                <ul>
                  <li>{order.paymentMethod}</li>
                </ul>

                <div className="payment-mode mt-4">
                  <h4 className="font-semibold">Trạng thái đơn hàng</h4>
                  <p
                    className={`status ${order.orderStatus === '5'
                        ? 'text-red-500'
                        : 'text-green-500'
                      }`}
                  >
                    {orderStatus.find((status) => status.id === order.status)
                      ? orderStatus.find((status) => status.id === order.status)
                        .name
                      : order.status}
                  </p>
                </div>

                <div className="delivery-sec mt-4">
                  <h3>
                    Dự kiến nhận hàng:{' '}
                    <span>
                      {new Date(
                        new Date(order.orderDate).setDate(
                          new Date(order.orderDate).getDate() + 3
                        )
                      ).toLocaleDateString()}
                    </span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Modal cho việc cập nhật trạng thái đơn hàng */}
          {order.status !== 'cancelled' && (
            <div className="mt-6 text-right">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
              >
                Cập nhật trạng thái đơn hàng
              </button>
            </div>
          )}
        </div>

        {/* Modal cập nhật trạng thái */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-96">
              <h5 className="text-lg font-semibold mb-4">
                Cập nhật trạng thái đơn hàng
              </h5>
              <select
                onChange={handleStatusChange}
                className="border p-2 w-full mb-4"
                value={newStatus}
              >
                {orderStatus.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 py-2 px-4 rounded-lg"
                >
                  Huỷ
                </button>
                <button
                  onClick={handleUpdateStatus}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                >
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderDetail;
