import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const UpdatePaymentMethod = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/payment-methods/${id}`)
      .then((response) => {
        setPaymentMethod(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payment method:', error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/payment-methods/${id}`, paymentMethod)
      .then(() => {
        navigate('/admin/payment-methods');
      })
      .catch((error) => {
        console.error('Error updating payment method:', error);
      });
  };

  if (!paymentMethod) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg mx-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate('/admin/payment-methods')}
          className="text-blue-500 hover:text-blue-700 mr-4"
        >
          <FiArrowLeft size={20} />
        </button>
        <h5 className="text-2xl font-semibold text-gray-800">
          Chỉnh sửa hình thức thanh toán
        </h5>
      </div>

      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Tên phương thức
          </label>
          <input
            type="text"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={paymentMethod.name}
            onChange={(e) =>
              setPaymentMethod({ ...paymentMethod, name: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Tên hiển thị
          </label>
          <input
            type="text"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={paymentMethod.displayName}
            onChange={(e) =>
              setPaymentMethod({
                ...paymentMethod,
                displayName: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Mô tả</label>
          <textarea
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={paymentMethod.description}
            onChange={(e) =>
              setPaymentMethod({
                ...paymentMethod,
                description: e.target.value,
              })
            }
            placeholder="Nhập mô tả"
            rows="3"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Ảnh (URL)</label>
          <input
            type="text"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={paymentMethod.thumb}
            onChange={(e) =>
              setPaymentMethod({ ...paymentMethod, thumb: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Trạng thái</label>
          <select
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={paymentMethod.status}
            onChange={(e) =>
              setPaymentMethod({
                ...paymentMethod,
                status: e.target.value === 'true',
              })
            }
          >
            <option value="true">Hoạt động</option>
            <option value="false">Dừng hoạt động</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

export default UpdatePaymentMethod;
