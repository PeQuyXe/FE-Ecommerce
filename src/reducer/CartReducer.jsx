const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: action.payload,
      };
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (x) => x.cartId === item.cartId
      );
      const quantityToAdd = item.quantity || 1;

      if (existingItem) {
        // Cập nhật số lượng nếu quantity tồn tại
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.cartId === existingItem.cartId
              ? { ...x, quantity: x.quantity + quantityToAdd }
              : x
          ),
        };
      } else {
        // Thêm mới sản phẩm vào giỏ hàng
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: quantityToAdd }],
        };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.cartId !== action.payload),
      };

    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.cartId === action.payload.cartId
            ? { ...x, quantity: action.payload.quantity }
            : x
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
