import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const CouponList = ({ onEdit, onAdd }) => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await axios.get('http://localhost:8080/api/coupons'); // Adjust API endpoint
      setCoupons(response.data);
    };
    fetchCoupons();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá mã giảm giá này?')) {
      await axios.delete(`http://localhost:8080/api/coupons/${id}`);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.id !== id)
      );
    }
  };

  return (
    <section className="container mx-auto bg-white p-6 rounded-lg shadow-md">
      <h5 className="text-xl font-bold mb-4">Danh sách mã giảm giá</h5>
      <button
        onClick={onAdd}
        className="bg-green-400 hover:bg-green-500 rounded text-white px-4 py-2 mb-4"
      >
        Thêm mã giảm giá mới
      </button>
      <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Ảnh</th>
            <th className="px-4 py-2">Tiêu đề</th>
            <th className="px-4 py-2">Mã</th>
            <th className="px-4 py-2">Giá trị mã</th>
            <th className="px-4 py-2">Giá tối thiểu</th>
            <th className="px-4 py-2">Trạng thái</th>
            <th className="px-4 py-2">Thực thi</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id} className="border-b">
              <td className="px-4 py-2">
                <img
                  src={coupon.thumb}
                  alt={coupon.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-2">{coupon.title}</td>
              <td className="px-4 py-2">{coupon.code}</td>
              <td className="px-4 py-2">{coupon.value}</td>
              <td className="px-4 py-2">{coupon.min_amount}</td>
              <td
                className={`px-4 py-2 ${
                  coupon.status ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {coupon.status ? 'Hoạt động' : 'Hết hạn'}
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => onEdit(coupon)}
                  className="text-blue-500 mr-3"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="text-red-500"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

CouponList.propTypes = {
  onEdit: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};
export default CouponList;
