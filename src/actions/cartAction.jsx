// export const ADD_TO_CART = (product) => ({
//   type: 'ADD_TO_CART',
//   payload: product,
// });

// export const UPDATE_CART_ITEM_QUANTITY = (productId, variant, quantity) => ({
//   type: 'UPDATE_CART_ITEM_QUANTITY',
//   payload: { productId, variant, quantity },
// });

// export const REMOVE_FROM_CART = (productId) => ({
//   type: 'REMOVE_FROM_CART',
//   payload: productId,
// });
// Action creators
export const ADD_TO_CART = (product) => ({
  type: 'ADD_TO_CART',
  payload: product, // Ensure product has a cartId and quantity
});

export const UPDATE_CART_ITEM_QUANTITY = (cartId, quantity) => ({
  type: 'UPDATE_CART_ITEM_QUANTITY',
  payload: { cartId, quantity }, // payload should contain cartId and quantity
});

export const REMOVE_FROM_CART = (cartId) => ({
  type: 'REMOVE_FROM_CART',
  payload: cartId, // Only cartId is needed for removal
});
export const SET_CART_ITEMS = (cartItems) => ({
  type: 'SET_CART_ITEMS',
  payload: cartItems, // payload sẽ chứa danh sách các sản phẩm trong giỏ hàng
});
