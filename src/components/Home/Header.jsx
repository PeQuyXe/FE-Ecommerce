import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import {
  MagnifyingGlassIcon as SearchIcon,
  ShoppingCartIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import logo from '../../assets/logo/logo.png';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const menu = [
  { name: 'Trang chủ', path: 'home' },
  { name: 'Sản phẩm', path: 'product' },
  { name: 'Tin tức', path: 'news' },
  { name: 'Liên hệ', path: 'contact' },
  { name: 'Ưu đãi', path: 'coupon' },
];

const Header = () => {
  const [currentPath] = useState('home');
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn || false);
  const userProfile = useSelector((state) => state.auth?.user || null);
  const cartQuantity = useSelector((state) => state.cart?.quantity || 0);
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      {/* Top bar */}
      <div className={`py-1.5 bg-[url('/src/assets/others/campaign-bg2.png')]`}>
        <div className="container mx-auto flex justify-end items-center space-x-4 font-serif">
          <NavLink to="/help" className="text-black hover:text-white">
            {t('Trợ giúp')}
          </NavLink>
          <NavLink to="/contact" className="text-black hover:text-white">
            {t('Liên hệ')}
          </NavLink>
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <NavLink
                to="/account"
                className="flex items-center space-x-2 text-black hover:text-white"
              >
                {userProfile?.profilePicture && (
                  <img
                    src={userProfile.profilePicture}
                    alt={userProfile.name}
                    className="h-8 w-8 rounded-full"
                  />
                )}
                <span>{userProfile?.name || 'User'}</span>
              </NavLink>
              <button
                onClick={() => {
                  /* Handle logout logic here */
                }}
                className="text-black hover:text-red-500"
                aria-label="Logout"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="text-black hover:text-white">
              {t('Đăng nhập')}
            </NavLink>
          )}
          <MdLanguage
            onClick={() =>
              handleChangeLanguage(i18n.language === 'vi' ? 'en' : 'vi')
            }
            className="text-black cursor-pointer"
            aria-label="Change Language"
          />
          <button
            onClick={toggleTheme}
            className="text-black"
            aria-label={
              theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'
            }
          >
            {theme === 'light' ? (
              <FaMoon className="h-5 w-5" />
            ) : (
              <FaSun className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-gray-200 py-5 shadow font-serif text-gray-900 font-size:30">
        <div className="container mx-auto flex items-center justify-between px-5">
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="logo" className="h-11" />
          </NavLink>

          {/* Navigation Menu */}
          <nav className="flex-1">
            <ul className="flex items-center justify-center space-x-4 lg:space-x-6">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={`/${item.path}`}
                    className={`text-black hover:text-blue-500 focus:outline-none ${
                      item.path === currentPath ? '' : ''
                    }`}
                  >
                    {t(item.name)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Form */}
            <form className="relative">
              <input
                type="text"
                name="search"
                className="border border-gray-300 rounded px-3 py-1"
                placeholder={t('Tìm kiếm')}
                aria-label={t('Search')}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3"
                aria-label="Search"
              >
                <SearchIcon className="h-5 w-5 text-gray-700" />
              </button>
            </form>

            {/* Favorites */}
            <NavLink
              to="/coming-soon"
              className="text-gray-700 hover:text-red-500"
              aria-label="Favorites"
            >
              <HeartIcon className="h-5 w-5" />
            </NavLink>

            {/* Shopping Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center"
              aria-label="Shopping Cart"
            >
              <ShoppingCartIcon className="h-5 w-5 text-gray-700 hover:text-red-500" />
              {cartQuantity > 0 && (
                <span
                  id="shopping-cart-quantity"
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  {cartQuantity}
                </span>
              )}
            </NavLink>

            {/* User Profile */}
            <NavLink
              to="/profile"
              className="text-gray-700 hover:text-blue-500"
              aria-label="User Profile"
            >
              <UserIcon className="h-5 w-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
