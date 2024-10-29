import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/configformat';

const dataCoupon = [
  { id: 1, title: 'Giảm 10%', value: '10%' },
  { id: 2, title: 'Giảm 20%', value: '20%' },
];

const dataPaymentMethod = [
  {
    id: 1,
    name: 'cod',
    display_name: 'Thanh toán khi nhận hàng',
    thumb: 'https://phuhungthinh.com/wp-content/uploads/2022/08/thanh-toan.png',
    description: 'Thanh toán bằng tiền mặt khi nhận hàng',
  },
  {
    id: 2,
    name: 'vnpay',
    display_name: 'VNPAY',
    thumb:
      'https://vnpay.vn/s1/statics.vnpay.vn/2023/6/0oxhzjmxbksr1686814746087.png',
    description: 'Thanh toán qua VNPAY',
  },
  {
    id: 3,
    name: 'momo',
    display_name: 'MOMO',
    thumb:
      'https://developers.momo.vn/v3/assets/images/icon-52bd5808cecdb1970e1aeec3c31a3ee1.png',
    description: 'Thanh toán qua MOMO',
  },
];

const CheckoutPage = () => {
  const dataCart = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <section className="header-top-campaign py-4 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="w-full xl:w-5/12 lg:w-3/5 md:w-10/12">
              <div className="slick-slide">
                {dataCoupon.map((dataCouponItem) => {
                  const couponValueArr = /(\d+)(%)/.exec(dataCouponItem.value);
                  const couponValue = couponValueArr
                    ? dataCouponItem.value
                    : formatCurrency(dataCouponItem.value);
                  return (
                    <div
                      key={dataCouponItem.id}
                      className="campaign-content bg-white p-4 rounded-lg mb-4 border border-gray-300"
                    >
                      <p className="uppercase">
                        {`${dataCouponItem.title} ${couponValue}`}:{' '}
                        <Link
                          to="/coupon"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          NHẬN GIẢM GIÁ
                        </Link>
                      </p>
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
          <form action="checkout-final" method="POST">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-1/2 lg:pr-5">
                <div className="checkout-billing">
                  <h4 className="title mb-8 text-2xl font-semibold text-gray-800">
                    Thanh toán
                  </h4>
                  <p className="text-red-500 mb-4">
                    Vui lòng xem kỹ thông tin nhận hàng.
                  </p>
                  <div className="form-group mb-4">
                    <label className="block text-gray-700">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="fullname"
                      type="text"
                      defaultValue={''}
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Họ và tên"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="block text-gray-700">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      defaultValue={''}
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Số điện thoại"
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label className="block text-gray-700">
                      Địa chỉ giao hàng <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="address"
                      rows="2"
                      defaultValue={''}
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt để giao hàng."
                    />
                  </div>

                  <div className="form-group mb-6">
                    <label className="block text-gray-700">
                      Lời nhắn cho người bán
                    </label>
                    <textarea
                      name="note"
                      rows="2"
                      className="mt-1 p-2 border rounded-md w-full"
                      placeholder="Ghi chú về đơn đặt hàng của bạn, ví dụ: ghi chú đặc biệt để giao hàng."
                    />
                  </div>

                  <div className="coupon-apply mb-10">
                    <input
                      id="coupon_code"
                      type="text"
                      name="coupon_code"
                      className="mb-2 p-2 border rounded-md w-full"
                      placeholder="Nhập mã giảm giá"
                    />
                    <button
                      type="button"
                      className="btn bg-blue-500 text-white p-2 rounded-md"
                    >
                      Áp dụng
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="order-checkout-summary">
                  <h5 className="title mb-4 text-xl font-semibold text-gray-800">
                    Đơn hàng của bạn
                  </h5>
                  <div className="summery-table-wrap mb-4">
                    <table className="table w-full border-collapse border border-gray-300">
                      <thead>
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">
                            Sản phẩm
                          </th>
                          <th className="border border-gray-300 px-4 py-2">
                            Tạm tính
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataCart.map((cartItem) => (
                          <tr key={cartItem.id} className="order-product">
                            <td className="border border-gray-300 px-4 py-2">
                              <div className="flex items-center">
                                <img
                                  src={cartItem.thumb}
                                  alt={cartItem.title}
                                  className="w-12 h-12 object-cover mr-2 rounded"
                                />
                                <div>
                                  <Link
                                    to={`product/${cartItem.slug}-${cartItem.product_id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500"
                                  >
                                    <p className="mb-0">
                                      {cartItem.title}{' '}
                                      <span className="text-gray-500">
                                        x{cartItem.quantity}
                                      </span>
                                    </p>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {formatCurrency(
                                cartItem.price * cartItem.quantity
                              )}
                            </td>
                          </tr>
                        ))}
                        <tr className="order-subtotal">
                          <td className="border border-gray-300 px-4 py-2">
                            Tạm tính
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {formatCurrency(
                              dataCart.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                              )
                            )}
                          </td>
                        </tr>
                        <tr className="order-coupon">
                          <td className="border border-gray-300 px-4 py-2">
                            Ưu đãi
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            0
                          </td>
                        </tr>
                        <tr className="order-total">
                          <td className="border border-gray-300 px-4 py-2">
                            Tổng
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {formatCurrency(
                              dataCart.reduce(
                                (acc, item) => acc + item.price * item.quantity,
                                0
                              )
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="order-payment-method mt-6">
                    {dataPaymentMethod.map((paymentMethod) => (
                      <div
                        key={paymentMethod.id}
                        className="single-payment flex items-center mb-4 p-2 border rounded-lg"
                      >
                        <input
                          type="radio"
                          id={paymentMethod.name}
                          name="payment_method"
                          value={`${paymentMethod.id} - ${paymentMethod.name}`}
                          className="mr-2"
                        />
                        <label htmlFor={paymentMethod.name} className="mr-2">
                          {paymentMethod.display_name}
                        </label>
                        <img
                          src={paymentMethod.thumb}
                          alt={paymentMethod.display_name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <p className="desc ml-4 text-gray-500">
                          {paymentMethod.description}
                        </p>
                      </div>
                    ))}
                  </div>
                  <Link
                    to="/#"
                    type="submit"
                    className="btn bg-green-500 text-white p-2 rounded-md"
                  >
                    Thanh toán
                  </Link>
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
