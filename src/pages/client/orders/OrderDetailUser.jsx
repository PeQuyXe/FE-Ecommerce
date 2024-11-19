import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdCancel } from 'react-icons/md'; // React Icons

const OrderDetailUser = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderResponse = await axios.get(
          `http://localhost:8080/api/orders/${orderId}`
        );
        console.log('data', orderResponse.data);
        setOrder(orderResponse.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
        toast.error('Không thể tải thông tin đơn hàng!');
      }
    };
    fetchOrderDetails();
    // eslint-disable-next-line
  }, [orderId]);

  const handleCancelOrder = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
      toast.success('Đơn hàng đã được hủy thành công!');
      setIsModalOpen(false);
      navigate('/order-list');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Không thể hủy đơn hàng!');
      setIsModalOpen(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  if (!order)
    return (
      <p className="text-center text-gray-500">
        Đang tải thông tin đơn hàng...
      </p>
    );

  const canCancelOrder = order.orderStatus.id == '1';

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-xl rounded-lg p-6 space-y-6">
        <h5 className="text-3xl font-semibold  text-indigo-600 mb-4">
          Đơn hàng #{order.orderCode}
        </h5>
        <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
          {/* Thông tin Ngày đặt, Mặt hàng và Tổng tiền */}
          <div className="text-gray-600 space-y-2 md:w-1/2">
            <p className="flex items-center">
              <strong className="mr-2 text-gray-800">Ngày đặt:</strong>
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <strong className="mr-2 text-gray-800">Mặt hàng:</strong>{' '}
              {order.orderItems?.length || 0} mặt hàng
            </p>
            <p className="flex items-center">
              <strong className="mr-2 text-gray-800">Tổng tiền:</strong>
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(order.totalMoney)}
            </p>
          </div>

          {/* Thông tin Trạng thái và Phương thức thanh toán */}
          <div className="text-gray-600 space-y-2 md:w-1/2">
            <p className="flex items-center">
              <strong className="mr-2 text-gray-800">Trạng thái:</strong>
              {order.orderStatus.name}
            </p>
            <p className="flex items-center">
              <strong className="mr-2 text-gray-800">
                Phương thức thanh toán:
              </strong>
              Thanh Toán Khi Nhận Hàng
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-indigo-600">
            Chi tiết mặt hàng
          </h4>
          <div className="w-full md:w-2/3">
            <div className="table-details">
              <div className="heading mb-4 text-gray-800">Mặt hàng</div>
              <table className="table-auto w-full border-collapse">
                <tbody>
                  {/* Kiểm tra order.orderItems trước khi map */}
                  {order.orderItems && order.orderItems.length > 0 ? (
                    order.orderItems.map((item, index) => (
                      <tr
                        key={index}
                        className="border-b hover:bg-indigo-50 transition-all duration-200"
                      >
                        <td className="py-3 px-2">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-16 h-16 object-cover"
                          />
                        </td>
                        <td className="py-3 px-2">
                          <h5 className="font-semibold">{item.productName}</h5>
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
                      <td
                        colSpan="4"
                        className="text-center py-3 text-gray-600"
                      >
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
                  <tr></tr>
                  <tr>
                    <td colSpan="3" className="py-3 px-2">
                      <h4 className="font-semibold text-indigo-600">
                        Thành tiền:
                      </h4>
                    </td>
                    <td className="py-3 px-2">
                      <h4 className="font-semibold text-indigo-600">
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
        </div>

        <div className="mt-6 space-y-4">
          <h4 className="font-semibold text-indigo-600">Địa chỉ giao hàng</h4>
          <p>
            {order.fullname} - {order.phone} - {order.address}
          </p>

          <h4 className="font-semibold text-indigo-600">Dự kiến nhận hàng</h4>
          <p>
            {new Date(
              new Date(order.orderDate).setDate(
                new Date(order.orderDate).getDate() + 3
              )
            ).toLocaleDateString()}
          </p>
        </div>

        {canCancelOrder && (
          <div className="mt-6 text-center">
            <button
              onClick={openModal}
              className="flex items-center justify-center bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              <MdCancel className="mr-2" /> Hủy đơn hàng
            </button>
          </div>
        )}
      </div>

      {/* Modal xác nhận hủy đơn */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h5 className="text-lg font-semibold mb-4">
              Bạn có chắc chắn muốn hủy đơn hàng này không?
            </h5>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Hủy
              </button>
              <button
                onClick={handleCancelOrder}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailUser;
