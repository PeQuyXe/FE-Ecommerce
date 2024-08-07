import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { GoSun, GoMoon } from 'react-icons/go';
import { MdLanguage } from 'react-icons/md';
import { CiHeart, CiUser } from 'react-icons/ci';
import { MagnifyingGlassIcon as SearchIcon } from '@heroicons/react/24/solid';
import logo from '../../assets/logo/logo.png';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IoCartOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import backgroundImage from '../../assets/bg/bg-image-4.jpg';
import { useAuth } from '../../AuthContext';
const menu = [
  { name: 'Trang chủ', path: 'home' },
  { name: 'Sản phẩm', path: 'product' },
  { name: 'Tin tức', path: 'news' },
  { name: 'Liên hệ', path: 'contact' },
  { name: 'Ưu đãi', path: 'coupon' },
];

const Header = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItems = cartItems.length;
  console.log(user);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Đăng xuất thành công');
    } catch (error) {
      toast.error('Đăng xuất thất bại');
    }
  };

  return (
    <header className="shadow-lg font-roboto">
      {/* Top bar */}
      <div className="bg-gray-700 text-white py-2">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 ">
            <MdLanguage
              onClick={() =>
                handleChangeLanguage(i18n.language === 'vi' ? 'en' : 'vi')
              }
              className="cursor-pointer"
              aria-label="Change Language"
            />
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center h-8 w-8 bg-gray-700 rounded-full"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <GoMoon /> : <GoSun />}
            </button>
          </div>
          <div className="flex items-center space-x-4 font-serif text-gray-300">
            <NavLink to="/help" className="hover:text-gray-400">
              {t('Trợ giúp')}
            </NavLink>
            <NavLink to="/contact" className="hover:text-gray-400">
              {t('Liên hệ')}
            </NavLink>
            {user ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/account"
                  className="flex items-center space-x-2 hover:text-gray-400"
                >
                  {user.photoURL && (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="h-8 w-8 rounded-full"
                    />
                  )}
                  <span>{user?.displayName || 'User'}</span>
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="hover:text-red-500 font-roboto"
                  aria-label="Logout"
                >
                  Thoát
                </button>
              </div>
            ) : (
              <NavLink to="/login" className="hover:text-gray-400">
                {t('Đăng nhập')}
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="py-4"
      >
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="logo" className="h-12" />
          </NavLink>

          {/* Navigation Menu */}
          <nav className="flex-2 hidden md:flex">
            <ul className="flex items-center justify-center space-x-7 text-xl font-serif">
              {menu.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={`/${item.path}`}
                    className={({ isActive }) =>
                      `text-black hover:underline font-extralight ${
                        isActive ? 'text-red-600 underline' : ''
                      }`
                    }
                    end
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
            <form className="relative hidden sm:block">
              <input
                type="text"
                name="search"
                className="border border-gray-300 rounded px-3 py-1"
                placeholder={t('Tìm')}
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
              <CiHeart className="h-6 w-6" />
            </NavLink>

            {/* Shopping Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center"
              aria-label="Shopping Cart"
            >
              <IoCartOutline className="h-6 w-6 text-gray-700 hover:text-red-500" />
              {totalItems > 0 && (
                <span
                  id="shopping-cart-quantity"
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs"
                >
                  {totalItems}
                </span>
              )}
            </NavLink>

            {/* User Profile */}
            <NavLink
              to="/profile"
              className="text-gray-700 hover:text-blue-500"
              aria-label="User Profile"
            >
              <CiUser className="h-6 w-6" />
            </NavLink>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4">
          <ul className="flex flex-col items-center space-y-2 text-l font-serif">
            {menu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={`/${item.path}`}
                  className={({ isActive }) =>
                    `text-black hover:underline font-extralight ${
                      isActive ? 'text-red-600 underline' : ''
                    }`
                  }
                  end
                >
                  {t(item.name)}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
