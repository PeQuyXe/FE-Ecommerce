import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from '../reducer/CartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
});

const store = createStore(rootReducer);

export default store;
