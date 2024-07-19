import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  MagnifyingGlassIcon as SearchIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import logo from '../../assets/logo/logo.png';
import { useSelector } from 'react-redux';

const menu = [
  { name: 'Trang chủ', path: 'home' },
  { name: 'Sản phẩm', path: 'product' },
  { name: 'Tin Tức', path: 'news' },
  { name: 'Liên hệ', path: 'contact' },
  { name: 'Ưu đãi', path: 'coupon' },
];

const Header = () => {
  const [currentPath] = useState('home');
  const [isLoggedIn] = useState(false);
  const cartQuantity = useSelector((state) => state.cart.quantity);

  return (
    <header>
      <div className="bg-blue-500 py-1.5 ">
        <div className="container mx-auto flex justify-end space-x-4 font-sans">
          <NavLink to="/help" className="text-black">
            Trợ giúp
          </NavLink>
          <NavLink to="/contact" className="text-black">
            Liên hệ
          </NavLink>
          {isLoggedIn ? (
            <NavLink to="/account" className="text-black">
              Welcome
            </NavLink>
          ) : (
            <NavLink to="/login" className="text-black">
              Đăng nhập
            </NavLink>
          )}
        </div>
      </div>
      <div className="bg-white py-4 shadow font-serif">
        <nav className="container mx-auto flex justify-between items-center">
          <div>
            <NavLink to="/">
              <img src={logo} alt="logo" className="h-10" />
            </NavLink>
          </div>
          <div>
            <ul className="flex space-x-4">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={`/${item.path}`}
                    className={`text-black hover:text-blue-500 ${item.path === currentPath ? '' : 'text-black'}`}
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="header-action flex space-x-4 items-center">
            <form action="product-category" method="get" className="relative">
              <input
                type="text"
                name="search"
                className="form-control border border-gray-300 rounded px-3 py-1"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3"
              >
                <SearchIcon className="h-5 w-5 text-gray-700" />
              </button>
            </form>
            <NavLink
              to="/coming-soon"
              className="has-[:checked]:bg-indigo-50 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200"
            >
              <HeartIcon className="h-5 w-5 text-gray-700" />
            </NavLink>
            <NavLink to="/cart" className="relative flex items-center">
              <ShoppingCartIcon className="h-5 w-5 text-gray-700 hover:bg-blue-300 hover:ring-sky-400 round" />
              {cartQuantity > 0 && (
                <span
                  id="shopping-cart-quantity"
                  className="shopping-cart-quantity absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  {cartQuantity}
                </span>
              )}
            </NavLink>
            <div className="relative">
              <button className="action-link">
                <UserIcon className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
