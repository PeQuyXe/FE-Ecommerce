const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existingItem.id ? { ...x, quantity: x.quantity + 1 } : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case 'UPDATE_CART_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((x) =>
          x.id === action.payload.productId
            ? { ...x, quantity: action.payload.quantity }
            : x
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
