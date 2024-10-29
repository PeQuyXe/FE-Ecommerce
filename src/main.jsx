import React from 'react';
import { AuthProvider } from './AuthContext';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CartPage from './pages/client/cart/CartPage';
// import CartDropdown from './pages/client/cart/CartDropdown';
import HomePage from './pages/HomePage';
import './index.css';
import './i18n';
import { Provider } from 'react-redux';
import store from './store/index';
import Login from './pages/client/account/Login';
import Register from './pages/client/account/Register';
// import MyAccount from './pages/client/account/MyAccount';
import CheckoutPage from './pages/client/checkout/CheckoutPage';
import ProductList2 from './pages/client/product/ProductList2';
import ProductDetail2 from './pages/client/product/ProductDetail2';
import NotFoundPages from './pages/NotFoundPages';
import { ToastContainer } from 'react-toastify';
import ContactPage from './pages/client/contact/ContactPage';
import CouponArea from './pages/client/coupons/CouponArea';
import NewsPage from './pages/client/news/NewsPage';
import NewDetail from './pages/client/news/NewDetail';
// import ProductCategory from './pages/client/category/ProductCategory';
import CategoryProduct from './pages/client/category/CategoryProduct';
import Profile from './pages/client/account/Profile';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product" element={<ProductList2 />} />
              <Route
                path="/product/:productId/*"
                element={<ProductDetail2 />}
              />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/coupon" element={<CouponArea />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/account" element={<Profile />} />
              <Route path="*" element={<NotFoundPages />} />
              <Route path="news/news/:id" element={<NewDetail />} />
              <Route
                path="home/category/:cateId/*"
                element={<CategoryProduct />}
              />
              <Route path="category/:cateId/*" element={<CategoryProduct />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
