import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CouponForm = ({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    value: '',
    min_amount: '',
    quantity: '',
    expired: '',
    thumb: null,
    ...initialData,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    await axios.post('/api/coupons', data); // Adjust API endpoint as needed
    onSubmit();
  };

  return (
    <section className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h5 className="text-xl font-bold mb-6">Thông tin mã giảm giá</h5>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Tiêu đề mã giảm giá</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            placeholder="Tiêu đề mã giảm giá"
            className="input"
            required
          />
        </div>
        {/* Code */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Mã</label>
          <input
            name="code"
            value={formData.code}
            onChange={handleChange}
            type="text"
            placeholder="Ex: CMT3304"
            className="input"
            required
          />
        </div>
        {/* Value */}
        <div className="mb-4">
          <label className="block font-medium mb-1">
            Giá trị mã (% hoặc VND)
          </label>
          <input
            name="value"
            value={formData.value}
            onChange={handleChange}
            type="text"
            placeholder="Ex: 100000 hoặc 10%"
            className="input"
            required
          />
        </div>
        {/* Minimum Amount */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Giá tối thiểu</label>
          <input
            name="min_amount"
            value={formData.min_amount}
            onChange={handleChange}
            type="number"
            placeholder="Giá tối thiểu để áp dụng mã"
            className="input"
            required
          />
        </div>
        {/* Quantity */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Số lượng</label>
          <input
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            type="number"
            placeholder="Số lượng sử dụng mã giảm giá"
            className="input"
            required
          />
        </div>
        {/* Expiration Date */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Ngày hết hạn</label>
          <input
            name="expired"
            value={formData.expired}
            onChange={handleChange}
            type="datetime-local"
            className="input"
            required
          />
        </div>
        {/* Thumbnail */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Ảnh mã giảm giá</label>
          <input
            name="thumb"
            type="file"
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="btn-custom mt-6">
          {initialData ? 'Cập nhập mã giảm giá' : 'Thêm mã giảm giá mới'}
        </button>
      </form>
    </section>
  );
};
CouponForm.propTypes = {
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CouponForm;
