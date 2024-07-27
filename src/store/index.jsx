import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from '../reducer/CartReducer';
import authReducer from '../reducer/authReducer';
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
});

const store = createStore(rootReducer);

export default store;
