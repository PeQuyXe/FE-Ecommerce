import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotalAmount = useSelector((state) => state.cart.subtotalAmount);
  const dispatch = useDispatch();

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    dispatch({ type: 'CALCULATE_SUBTOTAL' });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded p-4">
        <div className="cart-body">
          <ul id="cartList" className="list-none p-0 m-0 space-y-2">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  {item.name} - {item.quantity} x {item.price} đơn vị
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Xoá
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-footer mt-4">
          <h3 className="flex justify-between items-center text-lg font-semibold">
            <span>Thành tiền:</span>
            <span id="subtotal-amount" className="text-gray-800">
              {subtotalAmount}
            </span>
          </h3>
          <div className="flex space-x-4 mt-4">
            <Link
              to="cart"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Xem giỏ hàng
            </Link>
            <Link
              to="checkout"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
