import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const CouponArea = () => {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/coupons');
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };

    fetchCoupons();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  return (
    <section className="coupon-area py-8">
      <div className="container mx-auto mb-4">
        <nav className="text-blue-500">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>{' '}
          <span className="mx-2">/</span>
          <span className="text-gray-400">Giảm giá</span>
        </nav>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {coupons.map((coupon) => (
            <div
              key={coupon.code}
              className="coupon-area-wrap bg-white p-4 rounded shadow-md"
            >
              <div className="coupon flex">
                <div className="coupon-left flex-1 flex items-start">
                  <figure className="thumb w-24 h-24">
                    <img
                      src={coupon.thumb}
                      alt={coupon.title}
                      className="w-full h-full object-cotain rounded"
                    />
                  </figure>
                  <div className="content ml-4">
                    <div className="expired text-gray-500">
                      Thời hạn:{' '}
                      <span>
                        {new Date(coupon.expired).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <h4 className="title text-xl font-semibold">
                      {coupon.title}
                    </h4>
                    <p className="value text-lg font-medium text-red-500">
                      -{' '}
                      {coupon.value
                        ? coupon.value
                        : formatCurrency(coupon.value)}
                      {''}%
                    </p>
                  </div>
                </div>
                <div className="coupon-right flex-1 flex flex-col items-end">
                  <div className="status mb-2">
                    Ưu đãi{' '}
                    <span
                      className={`inline-block px-2 py-1 rounded ${
                        new Date(coupon.expired) < new Date()
                          ? 'bg-gray-300 text-gray-600'
                          : 'bg-green-500 text-white'
                      }`}
                    >
                      {new Date(coupon.expired) < new Date()
                        ? 'Hết hạn'
                        : 'Hoạt động'}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="code code-coupon bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    {coupon.code}
                  </button>
                  <p className="condition mt-2 text-sm text-gray-500">
                    * Mã phiếu giảm giá này sẽ được áp dụng khi bạn mua sắm
                    nhiều hơn{' '}
                    <span className="font-medium">
                      {formatCurrency(coupon.minAmount)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CouponArea;
