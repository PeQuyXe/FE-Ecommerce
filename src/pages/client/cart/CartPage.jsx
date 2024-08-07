import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM_QUANTITY,
} from '../../../actions/cartAction';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(REMOVE_FROM_CART(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity > 0) {
      dispatch(UPDATE_CART_ITEM_QUANTITY(productId, quantity));
    }
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="py-8">
      {/* Breadcrumb Section */}
      <section className="py-4 mb-2">
        <div className="container mx-auto">
          <nav className="text-blue-500">
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>{' '}
            <span className="mx-2">/</span>
            <Link to="/product" className="text-gray-500">
              {' '}
              Giỏ Hàng
            </Link>{' '}
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
                <th className="px-4 py-2 text-left">Sản phẩm</th>
                <th className="px-4 py-2 text-left"></th>
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
                    colSpan="6"
                    className="text-center items-center py-4 text-gray-500 "
                  >
                    <img
                      src="src/assets/bg/bg-image-14.jpg"
                      className="flex justify-center items-center mx-auto"
                    />
                    Không có sản phẩm nào trong giỏ hàng
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-2">
                      <img
                        src={item.thumb}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </td>
                    <td className="px-4 py-2">
                      <p className="font-semibold">
                        {item.price.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
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
                        onClick={() => handleRemoveFromCart(item.id)}
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
                <Link
                  to="/checkout"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 block text-center hover:bg-blue-600"
                >
                  Thanh toán
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartPage;
