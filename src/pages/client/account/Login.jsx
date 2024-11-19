import { useState } from 'react';
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import backgroundImage from '../../../assets/bg/bg-image-4.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const googleAccessToken = await result.user.accessToken;

      const response = await axios.post(
        'http://localhost:8080/api/auth/google',
        { token: googleAccessToken },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Lưu JWT token và thông tin người dùng
      const userData = response.data;
      localStorage.setItem('userData', JSON.stringify(userData));

      toast.success('Đăng nhập Google thành công!');
      navigate('/');
    } catch (error) {
      toast.error(
        `Đăng nhập Google thất bại: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  // Xử lý đăng nhập với email và mật khẩu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Lưu JWT token và thông tin người dùng
      const userData = response.data;
      localStorage.setItem('userData', JSON.stringify(userData));

      const roleId = userData?.roleId;

      // Điều hướng dựa trên vai trò
      if (roleId === 1) {
        toast.success('Đăng nhập thành công - Quản trị viên');
        navigate('/admin/dashboard');
      } else {
        toast.success('Đăng nhập thành công!');
        navigate('/');
      }
    } catch (error) {
      toast.error(
        `Đăng nhập thất bại: ${error.response?.data?.message || error.message}`
      );
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-16 bg-gray-50" // Tăng padding ở màn hình lớn
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        {' '}
        {/* Tăng kích thước max-w */}
        <Link to="/" className="flex justify-center">
          <img
            className="h-12 w-auto"
            src="/src/assets/logo/logo.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        {' '}
        {/* Tăng max-w của form */}
        <div className="bg-white py-8 px-6 shadow-lg sm:rounded-lg sm:px-12">
          {' '}
          {/* Tăng padding */}
          <h3 className="text-center text-3xl font-bold text-gray-900 mb-4">
            Đăng Nhập
          </h3>
          <p className="mt-2 text-center text-sm text-gray-600 mb-6">
            Nhập chi tiết thông tin của bạn bên dưới
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transform motion-safe:hover:scale-110"
              >
                Đăng nhập
              </button>
            </div>
          </form>
          <div className="mt-6 flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Bạn chưa có tài khoản?{' '}
              <Link
                to="/register"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Đăng ký
              </Link>
            </p>
          </div>
          <div className="mt-6 flex items-center justify-center">
            <button
              onClick={handleGoogleSignIn}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:text-red-500 flex items-center space-x-2 font-serif transform motion-safe:hover:scale-110 shadow-md"
            >
              <span>
                <FcGoogle />
              </span>
              <span className="ml-2">Đăng nhập tài khoản Google</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
