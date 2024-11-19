import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 mt-10 mb-25">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav className="text-blue-600 text-sm">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-500">Liên hệ</span>
        </nav>
      </div>

      {/* Contact Form & Info Section */}
      <div className="flex flex-wrap -mx-4 text-gray-800">
        {/* Contact Form */}
        <div className="w-full lg:w-2/3 px-4">
          <div className="p-6 shadow rounded-md">
            <h3 className="text-2xl font-semibold mb-4">
              Chúng tôi rất mong nhận được phản hồi từ bạn.
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Nếu bạn có những sản phẩm tuyệt vời hoặc muốn hợp tác, hãy liên hệ
              với chúng tôi.
            </p>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="contact-phone"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Tin nhắn của bạn
                </label>
                <textarea
                  id="contact-message"
                  rows="4"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                ></textarea>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Gửi tin nhắn
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="w-full lg:w-1/3 px-6 mt-6 lg:mt-0">
          <div className="p-8 shadow rounded-md space-y-6">
            <div>
              <h4 className="text-lg font-bold mb-2 flex items-center">
                <FaMapMarkerAlt className="text-blue-600 mr-2" />
                Cửa hàng của chúng tôi
              </h4>
              <p>Địa chỉ: 155 Nguyễn Văn Trỗi, Mộ Lao, Hà Đông</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 flex items-center">
                <FaPhoneAlt className="text-blue-600 mr-2" />
                Liên hệ
              </h4>
              <p>Số điện thoại: 0368002731</p>
              <p>Email: cuongpham17072002@gmail.com</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-2 flex items-center">
                <FaClock className="text-blue-600 mr-2" />
                Giờ mở cửa
              </h4>
              <p>8h - 17h</p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Map */}
      <div className="mt-10">
        <iframe
          className="w-full h-96 rounded shadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.988211049866!2d105.8369637!3d21.022739599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi!5e0!3m2!1sen!2s!4v1700055425254!5m2!1sen!2s"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
