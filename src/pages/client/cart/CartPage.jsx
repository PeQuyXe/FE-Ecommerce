import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
  SET_CART_ITEMS,
} from '../../../actions/cartAction';
import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;
  const [loading, setLoading] = useState(true);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const cartData = {
        userId: userId,
        items: cartItems.map((item) => ({
          productVariantId: item.variantId,
          quantity: item.quantity,
          price: item.price,
        })),
      };
      await axios.post('http://localhost:8080/api/cart', cartData);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  // Hàm lưu giỏ hàng vào localStorage
  const saveCartToLocalStorage = useCallback(
    (cart) => {
      localStorage.setItem(`cart`, JSON.stringify(cart));
    },
    // eslint-disable-next-line
    [userId]
  );

  // Tải giỏ hàng từ localStorage khi component được tải
  useEffect(() => {
    const storedCart = localStorage.getItem(`cart`);
    if (storedCart) {
      const cart = JSON.parse(storedCart);
      dispatch(SET_CART_ITEMS(cart)); // Cập nhật Redux store
    }
    setLoading(false);
  }, [userId, dispatch]);

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const handleQuantityChange = (cartId, quantity) => {
    if (quantity > 0) {
      const updatedCartItems = cartItems.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: parseInt(quantity) }
          : item
      );
      dispatch(UPDATE_CART_ITEM_QUANTITY(cartId, quantity)); // Cập nhật Redux store
      saveCartToLocalStorage(updatedCartItems); // Cập nhật localStorage
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (cartId) => {
    const updatedCartItems = cartItems.filter((item) => item.cartId !== cartId);
    dispatch(REMOVE_FROM_CART(cartId)); // Cập nhật Redux store
    saveCartToLocalStorage(updatedCartItems); // Cập nhật localStorage
  };

  // Tính tổng giá trị đơn hàng
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Hàm thêm sản phẩm vào giỏ hàng

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <section className="py-8">
      <section className="py-4 mb-2">
        <div className="container mx-auto">
          <nav className="text-blue-500">
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link to="/product" className="text-gray-500">
              Giỏ Hàng
            </Link>
          </nav>
        </div>
      </section>
      <div className="container mx-auto px-4">
        <div className="mb-4">
          <h4 className="text-2xl font-serif text-start">Giỏ hàng của bạn</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left"></th>
                <th className="px-4 py-2 text-left">Sản phẩm</th>
                <th className="px-4 py-2 text-left">Phân loại</th>
                <th className="px-4 py-2 text-left">Giá</th>
                <th className="px-4 py-2 text-left">Số lượng</th>
                <th className="px-4 py-2 text-left">Tạm tính</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center text-2xl py-4 text-gray-500 font-sans"
                  >
                    <img
                      src="src/assets/bg/bg-image-14.jpg"
                      className="flex justify-center items-center mx-auto"
                    />
                    Không có sản phẩm nào trong giỏ hàng
                  </td>
                </tr>
              ) : (
                cartItems.map((item, index) => (
                  <tr key={`${item.cartId}-${index}`} className="border-b">
                    <td className="px-4 py-2">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">{item.title}</td>
                    <td className="px-4 py-2 text-gray-400">{item.variant}</td>
                    <td className="px-4 py-2">
                      {item.price.toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.cartId,
                            parseInt(e.target.value)
                          )
                        }
                        className="w-16 border border-gray-300 rounded text-center"
                      />
                    </td>
                    <td className="px-4 py-2">
                      {(item.price * item.quantity).toLocaleString('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleRemoveFromCart(item.cartId)}
                        className="bg-red-500 hover:bg-red-700 text-white py-2 px-2 rounded"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {cartItems.length > 0 && (
          <div className="mt-10 flex justify-end">
            <div className="w-full lg:w-1/3">
              <div className="bg-white p-6 border rounded-lg shadow-md">
                <h5 className="text-lg font-semibold mb-4">Tóm tắt đơn hàng</h5>
                <table className="w-full">
                  <tbody>
                    <tr className="border-t">
                      <td className="py-2">Tạm tính</td>
                      <td className="py-2 text-right">
                        {totalAmount.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                    </tr>
                    <tr className="border-t">
                      <td className="py-2">Tổng</td>
                      <td className="py-2 text-right font-semibold">
                        {totalAmount.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-4 flex justify-end">
                  <Link
                    to="/checkout"
                    onClick={handleCheckout}
                    className="bg-gradient-to-r from-green-400 to-green-600 text-white py-3 px-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-transform duration-300 ease-in-out font-semibold flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Thanh toán
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
