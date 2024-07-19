const ContactPage = () => {
  return (
    <section className="contact-page-area py-12">
      <div className="container mx-auto px-4">
        <div className="contact-page flex flex-wrap">
          <div className="w-full lg:w-2/3">
            <div className="contact-form bg-white p-8 rounded-lg shadow-lg">
              <h3 className="title text-2xl font-bold mb-4">
                Chúng tôi rất mong nhận được phản hồi từ bạn.
              </h3>
              <p className="bot-title text-gray-700 mb-6">
                Nếu bạn có những sản phẩm tuyệt vời mà bạn đang tạo ra hoặc muốn
                hợp tác với chúng tôi thì hãy liên hệ với chúng tôi.
              </p>
              <form className="contact-form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label
                      htmlFor="contact-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact-name"
                      className="mt-1 block w-full border border-gray-500 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="contact-phone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="contact-phone"
                      id="contact-phone"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contact-email"
                      id="contact-email"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div className="form-group col-span-2">
                    <label
                      htmlFor="contact-message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tin nhắn của bạn
                    </label>
                    <textarea
                      name="contact-message"
                      id="contact-message"
                      rows="4"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    ></textarea>
                  </div>
                  <div className="form-group col-span-2">
                    <button
                      type="submit"
                      className="btn btn-primary bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Gửi tin nhắn
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="contact-form-about bg-white p-8 rounded-lg shadow-lg">
              <div className="contact-location mb-10">
                <h4 className="title text-xl font-bold mb-4">
                  Cửa hàng của chúng tôi
                </h4>
                <span className="address block text-gray-700 mb-4">
                  155 Nguyễn Văn Trỗi, Mộ Lao, Hà Đông, Hà Nội
                </span>
                <span className="phone block text-gray-700 mb-2">
                  Số điện thoại: 0368002731
                </span>
                <span className="email block text-gray-700">
                  Email: cuongpham17072002@gmail.com
                </span>
              </div>
              <div className="contact-career mb-10">
                <h4 className="title text-xl font-bold mb-4">Giới thiệu</h4>
                <p className="text-gray-700">
                  Thỏa sức mua sắm với hình thức trực tuyến
                </p>
              </div>
              <div className="opening-hour">
                <h4 className="title text-xl font-bold mb-4">Giờ mở cửa</h4>
                <p className="text-gray-700">8:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        <div className="google-map-wrap mt-12">
          <div className="mapouter relative">
            <div className="gmap_canvas">
              <iframe
                className="w-full h-64 border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29793.988211049866!2d105.8369637!3d21.022739599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9bd9861ca1%3A0xe7887f7b72ca17a9!2sHanoi!5e0!3m2!1sen!2s!4v1700055425254!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
