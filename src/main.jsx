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

import ProductList2 from './pages/client/product/ProductList2';
import ProductDetail from './pages/client/product/ProductDetail';
import NotFoundPages from './pages/NotFoundPages';
import { ToastContainer } from 'react-toastify';
import ContactPage from './pages/client/contact/ContactPage';

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
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPages />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
