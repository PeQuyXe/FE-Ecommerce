import { Link } from 'react-router-dom';
import backgroundImage from '../../../assets/bg/bg-image-5.jpg';
const SignUp = () => {
  const registerUser = () => {};

  return (
    <section
      style={{ backgroundImage }}
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img
            className="h-12 w-auto"
            src="src/assets/logo/logo.png"
            alt="logo"
          />
        </Link>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h3 className="text-center text-2xl font-bold text-gray-900">
            Đăng ký
          </h3>
          <p className="mt-2 text-center text-sm text-gray-600 mb-6">
            Nhập chi tiết thông tin của bạn bên dưới
          </p>
          <form className="space-y-6" id="formRegister" onSubmit={registerUser}>
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Họ và tên
              </label>
              <input
                type="text"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                name="fullname"
                placeholder="Họ và tên"
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="emailLogin"
                name="email"
                placeholder="Email"
              />
              {/* <div className="invalid-feedback text-sm text-red-500 mt-2">
                Email đã tồn tại.
              </div> */}
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                id="passwordLogin"
                name="password"
                placeholder="Mật khẩu"
              />
              {/* <div className="invalid-feedback text-sm text-red-500 mt-2">
                Độ dài tối thiểu là 8 ký tự, và phải bao gồm chữ hoa, chữ
                thường, chữ số và ký tự đặc biệt.
              </div> */}
            </div>
            <div className=" mt-5 flex justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center space-x-2">
                Tạo tài khoản
              </button>
            </div>
          </form>

          <div className="mt-6 flex items-center justify-center">
            <p className="text-sm text-gray-600">
              Bạn đã có tài khoản?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Đăng nhập
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
