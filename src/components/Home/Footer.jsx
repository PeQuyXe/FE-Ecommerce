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
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-area">
      <div className="footer-top py-8 text-gray-500 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-medium">
                Hỗ trợ
              </h5>
              <div className="logo mb-4">
                <a href="#">
                  <img className="light-logo h-12" src={logo} alt="logo" />
                </a>
              </div>
              <div className="inner">
                <p className="text-black font-medium">Thông tin liên hệ:</p>
                <ul className="support-list-item mt-4">
                  <li>
                    <a href="mailto:cuongpham17072002@gmail.com">
                      <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                      cuongpham17072002@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="0368002731">
                      <FontAwesomeIcon icon={faPhone} className="mr-2 " />
                      0368002731
                    </a>
                  </li>
                  <li>
                    <FaMapMarkerAlt className="inline-block mr-2" />
                    Mộ Lao, Hà Đông, Hà Nội
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-medium">
                Tài khoản
              </h5>
              <div className="inner">
                <ul className="inner-ul">
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Tài khoản của bạn
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Đăng nhập / Đăng kí
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Giỏ hàng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Yêu thích
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Danh mục sản phẩm
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-medium">
                Đường dẫn nhanh
              </h5>
              <div className="inner">
                <ul className="inner-ul">
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Chính sách Bảo mật
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Điều khoản sử dụng
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Giới thiệu
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-600">
                      Liên hệ
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="footer-widget">
              <h5 className="widget-title mb-4 text-black font-medium">
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
                    <a className="mb-4 d-block" href="#">
                      <img src={appstore} alt="App Store" className="mb-10" />
                    </a>
                    <a href="#">
                      <img src={chplay} alt="Play Store" />
                    </a>
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
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-pink-600 hover:text-pink-800">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-600">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedinIn size={24} />
              </a>
              <a href="#" className="text-purple-600 hover:text-purple-800">
                <FaDiscord size={24} />
              </a>
            </div>

            <div className="text-center md:text-left mb-4 md:mb-0">
              © 2024. Bản quyền thuộc về{' '}
              <a target="_blank" href="#" className="text-blue-400">
                PeQuyXe
              </a>
              .
            </div>
            <div className="payment-icons flex items-center">
              <span className="card-text mr-4 text-gray-900 font-medium">
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
