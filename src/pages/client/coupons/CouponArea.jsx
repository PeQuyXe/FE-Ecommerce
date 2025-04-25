import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FiClock, FiTag, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

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
      {/* Breadcrumb */}
      <div className="container mx-auto mb-6">
        <nav className="text-blue-500">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Giảm giá</span>
        </nav>
      </div>

      <div className="container mx-auto">
        {/* <h2 className="text-2xl font-bold text-center mb-8">Ưu Đãi Đặc Biệt</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {coupons.map((coupon) => {
            const isExpired = new Date(coupon.expired) < new Date();

            return (
              <div
                key={coupon.code}
                className={`coupon-area-wrap p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 ${isExpired ? 'bg-gray-100' : 'bg-white'
                  }`}
              >
                <div className="flex">
                  {/* Left Section */}
                  <div className="coupon-left flex-1">
                    <figure className="thumb mb-4">
                      <img
                        src={coupon.thumb}
                        alt={coupon.title}
                        className="w-40 h-32 object-cover rounded"
                      />
                    </figure>
                    <h4 className="title text-xl font-semibold mb-2 text-gray-800">
                      {coupon.title}
                    </h4>
                    <p className="value text-lg font-medium text-red-500 flex items-center">
                      <FiTag className="mr-2" />
                      {coupon.value
                        ? `${coupon.value}%`
                        : formatCurrency(coupon.value)}
                    </p>
                  </div>

                  {/* Right Section */}
                  <div className="coupon-right flex flex-col items-end">
                    <div className="status mb-4 flex items-center">
                      {isExpired ? (
                        <FiAlertCircle className="text-red-500 mr-2 text-lg" />
                      ) : (
                        <FiCheckCircle className="text-green-500 mr-2 text-lg" />
                      )}
                      <span
                        className={`inline-block px-3 py-1 rounded ${isExpired
                          ? 'bg-gray-300 text-gray-600'
                          : 'bg-green-500 text-white'
                          }`}
                      >
                        {isExpired ? 'Hết hạn' : 'Hoạt động'}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="code-coupon bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 hover:bg-blue-600 focus:outline-none"
                      onClick={() => {
                        navigator.clipboard.writeText(coupon.code);
                        toast.success("Đã sao chép mã: " + coupon.code, { autoClose: 500 });
                      }}
                    >
                      {coupon.code}
                    </button>

                  </div>
                </div>

                {/* Additional Info */}
                <div className="mt-4 text-gray-600 text-sm">
                  <p className="flex items-center">
                    <FiClock className="mr-2" />
                    Thời hạn:{' '}
                    {new Date(coupon.expired).toLocaleDateString('vi-VN')}
                  </p>
                  <p className="condition mt-2">
                    * Áp dụng khi mua sắm từ{' '}
                    <span className="font-semibold text-gray-800">
                      {formatCurrency(coupon.minAmount)}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section >
  );
};

export default CouponArea;
