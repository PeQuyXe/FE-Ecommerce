export const ADD_TO_CART = (product) => ({
  type: 'ADD_TO_CART',
  payload: product, // đảm bảo chắc chắn product có carId và quantity
});

export const UPDATE_CART_ITEM_QUANTITY = (cartId, quantity) => ({
  type: 'UPDATE_CART_ITEM_QUANTITY',
  payload: { cartId, quantity }, // Chứa cardId và quantity
});

export const REMOVE_FROM_CART = (cartId) => ({
  type: 'REMOVE_FROM_CART',
  payload: cartId, // Chỉ quantity
});
export const SET_CART_ITEMS = (cartItems) => ({
  type: 'SET_CART_ITEMS',
  payload: cartItems, //chứa danh sách các sản phẩm trong giỏ hàng
});
