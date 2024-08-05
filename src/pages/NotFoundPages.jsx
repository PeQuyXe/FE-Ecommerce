import { useState } from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const NotFoundPages = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <section className="py-24 bg-gray-100 flex items-center justify-center">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-screen-lg mx-auto">
        <div className="lg:w-1/3 p-4">
          <div className="bg-cover bg-center h-64  bg-[url('src/assets/bg/bg-image-13.jpg')]"></div>
        </div>
        <div className="lg:w-2/3 p-4">
          <div>
            <h2 className="text-2xl font-bold mt-4 mb-2">
              Trang web của chúng tôi đang trong quá trình phát triển!
            </h2>
            <p className="text-gray-700 mb-4">
              Chúng tôi sẽ sớm trở lại! Chúng tôi đang làm việc chăm chỉ để mang
              đến cho bạn <br />
              trải nghiệm tốt nhất.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 p-2 rounded-l-md flex-1"
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 rounded-r-md flex items-center justify-center ml-2"
                >
                  Đăng ký
                  <FaRegEnvelope className="ml-2" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPages;
