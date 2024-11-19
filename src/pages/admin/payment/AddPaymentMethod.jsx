import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const AddPaymentMethod = () => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumb, setThumb] = useState('');
  const [status, setStatus] = useState(true);
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const paymentMethod = { name, displayName, thumb, status, description };

    axios
      .post('http://localhost:8080/api/payment-methods', paymentMethod)
      .then(() => {
        navigate('/admin/payment-methods');
      })
      .catch((error) => {
        console.error('Error creating payment method:', error);
      });
  };

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
          Thêm hình thức thanh toán
        </h5>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">
            Tên phương thức
          </label>
          <input
            type="text"
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên phương thức"
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
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nhập tên hiển thị"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Mô tả</label>
          <textarea
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            value={thumb}
            onChange={(e) => setThumb(e.target.value)}
            placeholder="Nhập URL ảnh"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium">Trạng thái</label>
          <select
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
            value={status}
            onChange={(e) => setStatus(e.target.value === 'true')}
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

export default AddPaymentMethod;
