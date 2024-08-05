import { Link } from 'react-router-dom';
const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 mt-10 mb-20">
      <div className="container mx-auto mb-4">
        <nav className="text-blue-500">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>{' '}
          <span className="mx-2">/</span>
          <span className="text-gray-400">Liên hệ</span>
        </nav>
      </div>
      <div className="flex text-xl">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4">
            <div className="contact-form">
              <h3 className="title mb-4 font-semibold">
                Chúng tôi rất mong nhận được phản hồi từ bạn.
              </h3>
              <p className="bot-title mb-6">
                Nếu bạn có những sản phẩm tuyệt vời mà bạn đang tạo ra hoặc muốn
                hợp tác với chúng tôi thì hãy liên hệ với chúng tôi.
              </p>
              <form>
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full lg:w-1/3 px-4 mb-4">
                    <div className="form-group">
                      <label
                        htmlFor="contact-name"
                        className="block text-gray-700"
                      >
                        Họ và tên <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contact-name"
                        id="contact-name"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/3 px-4 mb-4">
                    <div className="form-group">
                      <label
                        htmlFor="contact-phone"
                        className="block text-gray-700"
                      >
                        Số điện thoại <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contact-phone"
                        id="contact-phone"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-1/3 px-4 mb-4">
                    <div className="form-group">
                      <label
                        htmlFor="contact-email"
                        className="block text-gray-700"
                      >
                        E-mail <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="contact-email"
                        id="contact-email"
                        className="w-full border border-gray-300 p-2 rounded"
                      />
                    </div>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <div className="form-group">
                      <label
                        htmlFor="contact-message"
                        className="block text-gray-700"
                      >
                        Tin nhắn của bạn
                      </label>
                      <textarea
                        name="contact-message"
                        id="contact-message"
                        cols="30"
                        rows="4"
                        className="w-full border border-gray-300 p-2 rounded"
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-full px-4 mb-4">
                    <div className="form-group mb-0">
                      <button
                        name="submit"
                        type="submit"
                        id="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                      >
                        Gửi tin nhắn
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="contact-form-about">
              <div className="contact-location mb-10">
                <h4 className="title mb-4 font-bold">Cửa hàng của chúng tôi</h4>
                <span className=" mb-4 block ">
                  Địa chỉ: 155 Nguyễn Văn Trỗi, Mộ Lao, Hà Đông
                </span>
                <span className="phone block ">Số điện thoại: 0368002731</span>
                <span className="email block ">
                  Email: cuongpham17072002@gmail.com
                </span>
              </div>
              <div className="contact-career mb-10">
                <h4 className="title mb-4 font-bold">Giới thiệu</h4>
                Cửa hàng mạng lại những sản phẩm chất lượng nhất cho khách hàng
              </div>
              <div className="opening-hour ">
                <h4 className="title mb-4 font-bold">Giờ mở cửa</h4>
                <p>8h-17h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Start Google Map Area  */}
      <div className="google-map-wrap mt-10">
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              className="w-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.988211049866!2d105.8369637!3d21.022739599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi!5e0!3m2!1sen!2s!4v1700055425254!5m2!1sen!2s"
              width="1280"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
      {/* End Google Map Area  */}
    </div>
  );
};

export default ContactPage;
