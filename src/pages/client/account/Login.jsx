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
      // Đăng nhập Google bằng Firebase
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.accessToken;

      const response = await axios.post(
        'http://localhost:8080/api/auth/google',
        { token },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      // Lưu JWT vào localStorage để sử dụng trong các phiên tiếp theo
      localStorage.setItem('userData', JSON.stringify(response.data));

      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      toast.error(`Đăng nhập thất bại: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        { email, password }
      );
      localStorage.setItem('userData', JSON.stringify(response.data));
      toast.success('Đăng nhập thành công!');
      navigate('/admin/category');
    } catch (error) {
      toast.error(`Đăng nhập thất bại: ${error.message}`);
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img
            className="h-12 w-auto"
            src="/src/assets/logo/logo.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-center text-2xl font-extrabold text-gray-900">
            Đăng nhập
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
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mật khẩu"
              />
            </div>

            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transform motion-safe:hover:scale-110"
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
              className="bg-white text-blue-600 px-4 py-2 rounded hover:text-red-500 flex items-center space-x-2 font-serif transform motion-safe:hover:scale-110 shadow-md"
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
