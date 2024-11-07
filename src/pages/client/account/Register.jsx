import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { auth, provider } from '../../../firebase';
import { signInWithPopup } from 'firebase/auth';
import backgroundImage from '../../../assets/bg/bg-image-4.jpg';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.accessToken;
      // Gửi idToken đến backend
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
      localStorage.setItem('userData', JSON.stringify(response.data));
      toast.success('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      toast.error(`Đăng nhập thất bại: ${error.message}`);
    }
  };

  // Đăng ký với email và mật khẩu
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/register', {
        fullname,
        email,
        password,
      });
      toast.success('Đăng ký thành công!');
      navigate('/login');
    } catch (error) {
      toast.error(`Đăng ký thất bại: ${error.message}`);
    }
  };

  return (
    <section
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
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
            Đăng ký
          </h3>
          <p className="mt-2 text-center text-sm text-gray-600 mb-6">
            Nhập chi tiết thông tin của bạn bên dưới
          </p>
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Họ và tên"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Mật khẩu"
              />
            </div>
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center space-x-2 transform motion-safe:hover:scale-110"
              >
                Tạo tài khoản
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Bạn đã có tài khoản?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500 "
              >
                Đăng nhập
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

export default Register;
