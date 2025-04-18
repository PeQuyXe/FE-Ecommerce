import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CouponList = () => {
  const navigate = useNavigate();
  const [coupons, setCoupons] = useState([]);

  // Fetch coupons from the API when the component mounts
  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await axios.get('http://localhost:8080/api/coupons');
      setCoupons(response.data);
    };
    fetchCoupons();
  }, []);

  // Handle navigating to the edit form
  const handleEdit = (coupon) => {
    navigate(`/admin/coupons/edit/${coupon.id}`);
  };

  // Handle navigating to the new coupon form
  const handleAdd = () => {
    navigate('/admin/coupons/new');
  };

  // Handle deleting a coupon
  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá mã giảm giá này?')) {
      await axios.delete(`http://localhost:8080/api/coupons/${id}`);
      setCoupons((prevCoupons) =>
        prevCoupons.filter((coupon) => coupon.id !== id)
      );
    }
  };

  return (
    <section className="min-h-screen">
      <button
        onClick={handleAdd}
        className="px-6 py-3  bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
      >
        Thêm mã giảm giá
      </button>

      <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden mt-6 items-center">
        <thead>
          <tr className="bg-indigo-600 text-white leading-normal text-center">
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
            <tr key={coupon.id} className="border-b text-center">
              <td className="px-4 py-2">
                <img
                  src={coupon.thumb}
                  alt={coupon.title}
                  className="w-16 h-16 object-contain rounded"
                />
              </td>
              <td className="px-4 py-2">{coupon.title}</td>
              <td className="px-4 py-2">{coupon.code}</td>
              <td className="px-4 py-2">{coupon.value}</td>
              <td className="px-4 py-2">{coupon.minAmount}</td>
              <td
                className={`px-4 py-2 rounded ${new Date(coupon.expired) < new Date()
                  ? 'text-gray-300 '
                  : 'text-green-500'
                  }`}
              >
                {new Date(coupon.expired) < new Date()
                  ? 'Hết hạn'
                  : 'Hoạt động'}
              </td>

              <td className="px-4 py-2">
                <button
                  onClick={() => handleEdit(coupon)}
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

export default CouponList;
