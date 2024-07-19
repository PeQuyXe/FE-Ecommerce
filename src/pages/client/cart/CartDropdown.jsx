import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react';
const CartDropdown = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subtotalAmount = useSelector((state) => state.cart.subtotalAmount);
  const dispatch = useDispatch();

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    dispatch({ type: 'CALCULATE_SUBTOTAL' });
  };

  return (
    <div className="container">
      <div className="cart-content-wrap">
        {/* Nội dung giỏ hàng tương tự như trước */}
        <div className="cart-body">
          <ul id="cartList" className="cart-item-list ps-0 mb-0">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-item">
                {item.name} - {item.quantity} x {item.price} đơn vị
                <button onClick={() => removeFromCart(item.id)}>Xoá</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-footer">
          <h3 className="cart-subtotal">
            <span className="subtotal-title">Thành tiền:</span>
            <span id="subtotal-amount" className="subtotal-amount">
              {subtotalAmount}
            </span>
          </h3>
          <div className="group-btn">
            <Link to="cart" className="btn-primary viewcart-btn">
              Xem giỏ hàng
            </Link>
            <Link
              to="checkout"
              className="btn-primary btn-bg-secondary checkout-btn"
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
