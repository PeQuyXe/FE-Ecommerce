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
