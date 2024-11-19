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
    <section className="py-24 bg-gray-50 flex items-center justify-center ">
      <div className="flex flex-col lg:flex-row items-center w-full max-w-screen-lg gap-8 px-4">
        {/* Hình ảnh minh họa */}
        <div className="lg:w-2/3 h-64 bg-cover bg-center rounded-lg shadow-md bg-[url('src/assets/bg/bg-image-15.jpg')]"></div>

        {/* Nội dung chính */}
        <div className="lg:w-2/3 text-center lg:text-left">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Trang web của chúng tôi đang trong quá trình phát triển!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Chúng tôi sẽ sớm trở lại! Đội ngũ của chúng tôi đang nỗ lực làm việc
            để mang đến cho bạn
            <br />
            trải nghiệm tốt nhất. Đăng ký để nhận thông báo khi chúng tôi hoàn
            thiện.
          </p>

          {/* Form đăng ký email */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col lg:flex-row items-center gap-4"
          >
            <div className="flex items-center w-full lg:w-auto border border-gray-300 rounded-md overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-blue-500">
              <FaRegEnvelope className="text-gray-500 mx-3" />
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 p-2 outline-none"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-all shadow-md flex items-center justify-center gap-2"
            >
              Đăng ký
              <FaRegEnvelope />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPages;
