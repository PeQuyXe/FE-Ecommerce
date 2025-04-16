import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/configformat';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const dataCartFromStore = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [dataCoupon, setDataCoupon] = useState([]);
  const [dataPaymentMethod, setDataPaymentMethod] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [cartItems, setCartItems] = useState(dataCartFromStore);

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;
  const id = paymentMethod;

  const [formErrors, setFormErrors] = useState({
    fullname: '',
    address: '',
    phone: '',
  });

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cart'));
    if (storedCartItems && storedCartItems.length > 0) {
      setCartItems(storedCartItems);
    } else {
      setCartItems(dataCartFromStore);
    }
  }, [dataCartFromStore]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [couponsRes, paymentMethodsRes] = await Promise.all([
          axios.get('http://localhost:8080/api/coupons'),
          axios.get('http://localhost:8080/api/payment-methods'),
        ]);
        setDataCoupon(couponsRes.data);
        setDataPaymentMethod(paymentMethodsRes.data);
      } catch (error) {
        console.error('Lỗi nhận thông tin giảm giá và phương thức thanh toán:', error);
      }
    };

    fetchData();
  }, []);
  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  const calculateTotal = () => {
    let total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    if (discount > 0) {
      total = total - (total * discount) / 100;
    }
    return total;
  };

  const handleCouponChange = (e) => {
    setCouponCode(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const applyCoupon = () => {
    const coupon = dataCoupon.find(
      (coupon) => coupon.code === couponCode.toUpperCase()
    );
    if (coupon) {
      const cartTotal = calculateTotal();
      if (cartTotal >= coupon.minAmount) {
        setDiscount(coupon.value);
        setErrorMessage('');
      } else {
        setErrorMessage(
          `Mã giảm giá yêu cầu đơn hàng tối thiểu ${formatCurrency(
            coupon.minAmount
          )}`
        );
      }
    } else {
      setErrorMessage('Mã giảm giá không hợp lệ hoặc đã hết hạn');
    }
  };
  const validateForm = () => {
    const errors = {};
    const fullname = document.getElementById('fullname').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    if (!fullname) errors.fullname = 'Họ và tên là bắt buộc';
    if (!address) errors.address = 'Địa chỉ là bắt buộc';
    if (!phone) errors.phone = 'Số điện thoại là bắt buộc';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOrderSubmit = async () => {
    if (validateForm()) {
      try {
        const orderData = {
          orderCode: `ORDER-${Date.now()}`,
          userId: userId,
          fullname: document.getElementById('fullname').value,
          phone: document.getElementById('phone').value,
          address: document.getElementById('address').value,
          note: document.querySelector('[name="note"]').value,
          orderDate: new Date().toISOString(),
          orderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
            totalMoney: item.price * item.quantity,
          })),
          totalMoney: calculateTotal(),
          couponId:
            dataCoupon.find((coupon) => coupon.code === couponCode)?.id || '0',
          orderStatus: { id },
        };

        const response = await axios.post('http://localhost:8080/api/orders', orderData);

        if (response.status === 200) {
          toast.success('Đơn hàng đã được tạo thành công! Kiểm tra email để nhận xác nhận.');
          navigate('/order-list');
        } else {
          toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Lỗi khi tạo đơn hàng:', error);
        if (error.response) {
          toast.error(`Lỗi: ${error.response.data.message || 'Không thể tạo đơn hàng'}`);
        } else {
          toast.error('Lỗi kết nối đến máy chủ');
        }
      }
    }
  };


  return (
    <div>
      <section className="header-top-campaign py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full xl:w-5/12 lg:w-3/5 md:w-10/12">
              <div className="slick-slide">
                {dataCoupon
                  .filter((coupon) => coupon.status === '1')
                  .map((coupon) => {
                    const isExpired = new Date(coupon.expired) < new Date();
                    const value =
                      typeof coupon.value === 'number'
                        ? coupon.value >= 1000
                          ? `${formatCurrency(coupon.value)}`
                          : `${coupon.value}%`
                        : coupon.value;

                    return (
                      <div
                        key={coupon.id}
                        className={`campaign-content bg-white p-4 rounded-lg mb-4 border ${isExpired ? 'border-gray-300' : 'border-gray-500'
                          }`}
                      >
                        <div className="flex items-center">
                          <img
                            src={coupon.thumb}
                            alt={coupon.title}
                            className="w-16 h-16 object-cover mr-4 rounded"
                          />
                          <div>
                            <h6 className="font-medium text-lg text-gray-800">
                              {coupon.title}
                            </h6>
                            <p className="text-sm text-gray-600">
                              Giá trị:{' '}
                              <span className="font-semibold">{value}</span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Áp dụng từ:{' '}
                              <span className="font-semibold">
                                {new Date(coupon.expired).toLocaleDateString()}
                              </span>
                            </p>
                            <p className="text-sm text-gray-600">
                              Số lượng:{' '}
                              <span className="font-semibold">
                                {coupon.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="checkout-area py-8 bg-white">
        <div className="container mx-auto px-4">
          <form>
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 lg:pr-5">
                <div className="checkout-billing mb-10">
                  <h4 className="title mb-8 text-2xl font-semibold text-gray-800">
                    Thông tin giao hàng
                  </h4>

                  {/* Các trường thông tin giao hàng */}
                  <div className="mb-6">
                    <label
                      htmlFor="fullname"
                      className="block text-gray-800 font-semibold mb-2 transition-all hover:text-blue-500"
                    >
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm transition-all duration-300 
    focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-md">
                      <FaUser className="text-blue-500 text-xl" />
                      <input
                        id="fullname"
                        type="text"
                        name="fullname"
                        className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        placeholder="Nhập họ và tên"
                      />
                    </div>
                    {formErrors.fullname && (
                      <span className="text-red-500 text-sm mt-1 block animate-fadeIn">
                        {formErrors.fullname}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block text-gray-800 font-semibold mb-2 transition-all hover:text-blue-500"
                    >
                      Địa chỉ <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm transition-all duration-300 
    focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-md">
                      <FaMapMarkerAlt className="text-blue-500 text-xl" />
                      <input
                        id="address"
                        type="text"
                        name="address"
                        className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        placeholder="Nhập địa chỉ giao hàng"
                      />
                    </div>
                    {formErrors.address && (
                      <span className="text-red-500 text-sm mt-1 block animate-fadeIn">
                        {formErrors.address}
                      </span>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-gray-800 font-semibold mb-2 transition-all hover:text-blue-500"
                    >
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-white shadow-sm transition-all duration-300 
    focus-within:ring-2 focus-within:ring-blue-400 hover:shadow-md">
                      <FaPhoneAlt className="text-blue-500 text-xl" />
                      <input
                        id="phone"
                        type="text"
                        name="phone"
                        className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>
                    {formErrors.phone && (
                      <span className="text-red-500 text-sm mt-1 block animate-fadeIn">
                        {formErrors.phone}
                      </span>
                    )}
                  </div>

                  <div className="form-group mb-6">

                    <label className="block text-gray-700 font-semibold">
                      Lời nhắn cho người bán
                    </label>
                    <textarea
                      name="note"
                      rows="4"
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt để giao hàng."
                    />
                  </div>


                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="order-checkout-summary p-6 bg-white">
                  <h5 className="text-2xl font-bold text-gray-800 mb-5">Đơn hàng của bạn</h5>

                  {/* Bảng danh sách sản phẩm */}
                  <div className="summery-table-wrap mb-5">
                    <table className="table w-full border-collapse border border-gray-200 rounded-lg shadow-sm">
                      <thead>
                        <tr className="bg-gray-100 text-gray-700">
                          <th className="border border-gray-300 px-4 py-3 text-left">Sản phẩm</th>
                          <th className="border border-gray-300 px-4 py-3 text-right">Tổng cộng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((cartItem) => (
                          <tr key={cartItem.id} className="hover:bg-gray-50 transition">
                            <td className="border border-gray-300 px-4 py-3">
                              <div className="flex items-center gap-4">
                                <img
                                  src={cartItem.thumb}
                                  alt={cartItem.title}
                                  className="w-16 h-16 object-cover rounded-lg shadow-md"
                                />
                                <div>
                                  <Link
                                    to={`/product/${cartItem.id}`}
                                    className="text-blue-600 text-sm font-semibold hover:text-blue-800 transition"
                                  >
                                    {cartItem.title}
                                  </Link>
                                  <p className="text-gray-500 text-sm">{cartItem.variant}</p>
                                  <p className="text-gray-500 text-sm">
                                    {cartItem.quantity} x {formatCurrency(cartItem.price)}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-right font-semibold">
                              {formatCurrency(cartItem.price * cartItem.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Tổng tiền và giảm giá */}
                  <div className="summery-total text-lg">
                    <p className="flex justify-between mb-4 font-semibold text-gray-800">
                      <span>Tạm Tính</span>
                      <span>{formatCurrency(calculateSubtotal())}</span>
                    </p>
                    {discount > 0 && (
                      <p className="flex justify-between mb-4 text-gray-600">
                        <span>Giảm giá</span>
                        <span className="text-green-500 font-semibold">-{discount}%</span>
                      </p>
                    )}
                    <p className="flex justify-between mb-4 font-semibold text-gray-800">
                      <span>Thành tiền</span>
                      <span>{formatCurrency(calculateTotal())}</span>
                    </p>
                  </div>
                  <div className="mb-10">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">
                      Nhập mã giảm giá
                    </h4>
                    <div className="flex flex-rows  gap-4">
                      <input
                        id="coupon_code"
                        type="text"
                        name="coupon_code"
                        className="mb-2 p-2 border rounded-md w-full"
                        placeholder="Nhập mã giảm giá"
                        value={couponCode}
                        onChange={handleCouponChange}
                      />
                      <button
                        type="button"
                        onClick={applyCoupon}
                        className="bg-blue-500 text-white w-28 h-11 rounded-md hover:bg-blue-600 transition-colors duration-200"
                      >
                        Áp dụng
                      </button>

                    </div>

                    {errorMessage && (
                      <p className="text-red-500 mt-2">{errorMessage}</p>
                    )}
                  </div>

                  {/* Phương thức thanh toán */}
                  <div className="payment-method">
                    <h4 className="text-lg font-semibold mb-4 text-gray-800">Phương thức thanh toán</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {dataPaymentMethod.map((method) => (
                        <label
                          key={method.id}
                          className="cursor-pointer bg-white p-4 border rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                        >
                          <input
                            type="radio"
                            name="payment_method"
                            value={method.id}
                            onChange={handlePaymentMethodChange}
                            className="hidden peer"
                          />
                          <div className="peer-checked:ring-2 peer-checked:ring-blue-500 p-2 rounded-md">
                            <img
                              src={method.thumb}
                              alt={method.name}
                              className="w-12 h-12 object-contain"
                            />
                          </div>
                          <span className="text-lg font-medium text-gray-800">{method.name}</span>
                        </label>
                      ))}
                    </div>

                  </div>

                  {/* Nút đặt hàng */}
                  <div className="submit-order mt-8 flex justify-center">
                    <button
                      type="button"
                      className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out flex items-center justify-center"
                      onClick={handleOrderSubmit}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Xác nhận đơn hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CheckoutPage;
