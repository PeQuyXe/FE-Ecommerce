import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';

const PaymentMethodList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Fetch payment methods on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/payment-methods')
      .then((response) => {
        setPaymentMethods(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment methods:', error);
      });
  }, []);

  // Show delete confirmation modal
  const openModal = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Handle delete action
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/api/payment-methods/${selectedId}`)
      .then(() => {
        setPaymentMethods((prev) =>
          prev.filter((method) => method.id !== selectedId)
        );
        setShowModal(false);
      })
      .catch((error) => {
        console.error('Error deleting payment method:', error);
      });
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h5 className="text-2xl font-semibold text-gray-800">
          Danh sách hình thức thanh toán
        </h5>
        <Link
          to="/admin/add-payment-method"
          className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <FiPlus className="mr-2" />
          Thêm hình thức thanh toán
        </Link>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow-sm overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-gray-600">Ảnh</th>
            <th className="px-4 py-2 text-left text-gray-600">
              Tên phương thức
            </th>
            <th className="px-4 py-2 text-left text-gray-600">Tên hiển thị</th>
            <th className="px-4 py-2 text-left text-gray-600">Trạng thái</th>
            <th className="px-4 py-2 text-center text-gray-600">Thực thi</th>
          </tr>
        </thead>
        <tbody>
          {paymentMethods.map((method) => (
            <tr key={method.id} className="hover:bg-gray-50">
              <td className="px-4 py-3">
                <img
                  src={method.thumb}
                  alt={method.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              </td>
              <td className="px-4 py-3 font-medium text-gray-700">
                {method.name}
              </td>
              <td className="px-4 py-3 text-gray-700">{method.displayName}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded ${
                    method.status
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {method.status ? 'Hoạt động' : 'Dừng hoạt động'}
                </span>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center space-x-4">
                  <Link
                    to={`/admin/update-payment-method/${method.id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FiEdit />
                  </Link>
                  <button
                    onClick={() => openModal(method.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold text-gray-800">
              Xác nhận xóa
            </h2>
            <p className="text-gray-600 my-4">
              Bạn có chắc chắn muốn xóa hình thức thanh toán này không?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2 hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodList;
