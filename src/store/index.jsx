import { createStore } from 'redux';
import { combineReducers } from 'redux';
import cartReducer from '../reducer/CartReducer';
import authReducer from '../reducer/authReducer';
import favoritesReducer from "../reducer/favoritesSlice";
const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  favorites: favoritesReducer,
});

const store = createStore(rootReducer);
export default store;
