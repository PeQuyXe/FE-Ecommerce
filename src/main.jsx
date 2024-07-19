import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import CartPage from './pages/client/cart/CartPage';
import HomePage from './pages/HomePage';
import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store/index';
// import CartDropdown from './pages/client/cart/CartDropdown';
import LoginPage from './pages/client/account/LoginPage';
import SignUp from './pages/client/account/SignUp';
import ProductList from './pages/client/product/ProductList';
import ProductDetail from './pages/client/product/ProductDetail';
import NotFoundPages from './pages/NotFoundPages';
import { ToastContainer } from 'react-toastify';
import ContactPage from './pages/client/contact/ContactPage';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/Cart" element={<CartPage />} />
            <Route path="/product" element={<ProductList />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPages />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
