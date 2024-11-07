const initialState = {
  cartItems: [],
};
console.log('cartItems', initialState.cartItems);
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existingItem = state.cartItems.find((x) => x.id === item.id);
      const quantityToAdd = item.quantity || 1; // Sử dụng giá trị quantity hoặc mặc định là 1

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === existingItem.id
              ? { ...x, quantity: x.quantity + quantityToAdd }
              : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...item, quantity: quantityToAdd }],
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

export const ADD_TO_CART = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const UPDATE_CART_ITEM_QUANTITY = (productId, quantity) => ({
  type: 'UPDATE_CART_ITEM_QUANTITY',
  payload: { productId, quantity },
});

export const REMOVE_FROM_CART = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});
