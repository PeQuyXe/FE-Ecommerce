import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const CouponForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: null,
    code: '',
    thumb: '',
    title: '',
    value: '',
    minAmount: '',
    expired: '',
    quantity: '',
    status: '',
  });

  useEffect(() => {
    if (id) {
      const fetchCoupon = async () => {
        const response = await axios.get(
          `http://localhost:8080/api/coupons/${id}`
        );
        setFormData(response.data);
      };
      fetchCoupon();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      value: parseFloat(formData.value),
      minAmount: parseFloat(formData.minAmount),
      quantity: parseInt(formData.quantity),
    };

    try {
      if (id) {
        await axios.put(
          `http://localhost:8080/api/coupons/${id}`,
          dataToSubmit
        );
      } else {
        await axios.post('http://localhost:8080/api/coupons', dataToSubmit);
      }
      navigate('/admin/coupons');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full mx-auto"
      >
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          {id ? 'Sửa mã giảm giá' : 'Thêm mã giảm giá'}
        </h2>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Tiêu đề mã giảm giá
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Mã giảm giá *
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Giá trị mã giảm giá *
          </label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Giá tối thiểu *
          </label>
          <input
            type="number"
            name="minAmount"
            value={formData.minAmount}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Số lượng
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Ngày hết hạn
          </label>
          <input
            type="datetime-local"
            name="expired"
            value={formData.expired}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Ảnh mã giảm giá (URL)
          </label>
          <input
            type="url"
            name="thumb"
            value={formData.thumb}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Trạng thái
          </label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          {id ? (
            <>
              Cập nhật mã giảm giá
            </>
          ) : (
            <>
              Thêm mã giảm giá
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default CouponForm;
