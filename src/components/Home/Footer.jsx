import logo from '../../assets/logo/logo.png';
import cart3 from '../../assets/icons/cart/cart-3.png';
import cart5 from '../../assets/icons/cart/cart-5.png';
import cart6 from '../../assets/icons/cart/cart-6.png';
import qrcode from '../../assets/others/qrcode.png';
import appstore from '../../assets/others/app-store.png';
import chplay from '../../assets/others/play-store.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaDiscord,
  FaThumbsUp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="container mx-auto px-4 mt-auto">
        <div className="text-center mb-8">
          <span className="inline-flex items-center justify-center bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-sm font-bold">
            <FaThumbsUp />
            Tại sao chọn chúng tôi
          </span>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-10">
          <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="src/assets/icons/service6.png"
                  alt="Service"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h6 className="text-lg font-bold">
                Giao hàng nhanh tróng &amp; an toàn
              </h6>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="src/assets/icons/service7.png"
                  alt="Service"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h6 className="text-lg font-bold">Đảm bảo 100% về sản phẩm</h6>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="src/assets/icons/service8.png"
                  alt="Service"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h6 className="text-lg font-bold">Hàng ngàn mã ưu đãi hấp dẫn</h6>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="src/assets/icons/service9.png"
                  alt="Service"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h6 className="text-lg font-bold">Chính sách hoàn trả 24 giờ</h6>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="text-center">
              <div className="mb-4">
                <img
                  src="src/assets/icons/service10.png"
                  alt="Service"
                  className="w-16 h-16 mx-auto"
                />
              </div>
              <h6 className="text-lg font-bold">Chất lượng chuyên nghiệp</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-top py-8 text-gray-500 ">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-bold">Hỗ trợ</h5>
              <div className="logo mb-4">
                <Link to="#">
                  <img className="light-logo h-12" src={logo} alt="logo" />
                </Link>
              </div>
              <div className="inner">
                <p className="text-black font-bold">Thông tin liên hệ:</p>
                <ul className="support-list-item mt-4">
                  <li>
                    <Link to="mailto:cuongpham17072002@gmail.com">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      cuongpham17072002@gmail.com
                    </Link>
                  </li>
                  <li>
                    <Link to="0368002731">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 " />
                      0368002731
                    </Link>
                  </li>
                  <li>
                    <FaMapMarkerAlt className="inline-block mr-2" />
                    Mộ Lao, Hà Đông, Hà Nội
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-bold">
                Tài khoản
              </h5>
              <div className="inner">
                <ul className="inner-ul">
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Tài khoản của bạn
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Đăng nhập / Đăng kí
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Giỏ hàng
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Yêu thích
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Danh mục sản phẩm
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-bold">
                Đường dẫn nhanh
              </h5>
              <div className="inner">
                <ul className="inner-ul">
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Chính sách Bảo mật
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Điều khoản sử dụng
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Giới thiệu
                    </Link>
                  </li>
                  <li>
                    <Link to="#" className="hover:text-blue-600">
                      Liên hệ
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-bold">
                Tải ứng dụng
              </h5>
              <div className="inner">
                <span>
                  Tiết kiệm 100.000đ với Ứng dụng & Chỉ dành cho Người dùng mới.
                </span>
                <div className="download-btn-group mt-4">
                  <div className="qr-code mb-4">
                    <img src={qrcode} alt="QR Code" className="h-20" />
                  </div>
                  <div className="app-link">
                    <Link className="mb-4 d-block" to="#">
                      <img src={appstore} alt="App Store" className="mb-10" />
                    </Link>
                    <Link to="#">
                      <img src={chplay} alt="Play Store" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-area py-4 bg-white text-black-400">
        <div className="container mx-auto px-4">
          <div className="flex flex-row md:flex-row justify-between items-center">
            <div className="social-share flex space-x-4">
              <Link to="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF size={24} />
              </Link>
              <Link to="#" className="text-pink-600 hover:text-pink-800">
                <FaInstagram size={24} />
              </Link>
              <Link to="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </Link>
              <Link to="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedinIn size={24} />
              </Link>
              <Link to="#" className="text-purple-600 hover:text-purple-800">
                <FaDiscord size={24} />
              </Link>
            </div>

            <div className="text-center md:text-left mb-4 md:mb-0">
              © 2024. Bản quyền thuộc về{' '}
              <Link target="_blank" to="/" className="text-blue-400">
                PeQuyXe
              </Link>
              .
            </div>
            <div className="payment-icons flex items-center">
              <span className="card-text mr-4 text-gray-900 font-bold">
                Thanh Toán
              </span>
              <ul className="flex">
                <li className="mr-4">
                  <img src={cart3} alt="google pay" />
                </li>
                <li className="mr-4">
                  <img src={cart5} alt="visa" />
                </li>
                <li>
                  <img src={cart6} alt="apple pay" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
