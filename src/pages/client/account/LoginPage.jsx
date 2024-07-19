import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginPage = () => {
  return (
    <div className="container mx-auto p-4">
      <section>
        <div className="bg-white p-4 mb-8 shadow-md rounded-md">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/">
                <img
                  src="src/assets/logo/logo.png"
                  alt="logo"
                  className="h-12"
                />
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <p className="mb-0 text-gray-600">Chưa có tài khoản?</p>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Đăng ký ngay
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/3 bg-white p-8 flex items-center justify-center">
            <img src="src/assets/bg/bg-image-13.jpg" alt="Poster " />
          </div>
          <div className="w-full lg:w-1/2 lg:ml-auto p-8">
            <div>
              <h3 className="text-3xl font-semibold mb-4">Đăng nhập</h3>
              <p className="mb-8 text-gray-600">
                Nhập chi tiết thông tin của bạn bên dưới
              </p>

              <form method="POST">
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    name="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-2 text-gray-700">Mật khẩu</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    name="password"
                    placeholder="Mật khẩu"
                  />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2"
                  >
                    <span>Đăng nhập</span>
                    <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />
                  </button>
                  <Link to="/reset" className="text-blue-500 hover:underline">
                    Quên mật khẩu?
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
