import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { formatCurrency, renderStars } from '../../../utils/configformat';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import backgroundImage from '../../../assets/others/campaign-bg3.png';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const ProductDetail2 = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [coupons, setCoupons] = useState([]);
  const [images, setImages] = useState([]);
  const [, setRatings] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const [attributes, setAttributes] = useState({
    color: '',
    size: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productRes = await axios.get(
          `http://localhost:8080/api/product/${productId}`
        );
        const imagesRes = await axios.get(
          `http://localhost:8080/api/image-products/product/${productId}`
        );
        const couponsRes = await axios.get('http://localhost:8080/api/coupons');
        const ratingRes = await axios.get(
          `http://localhost:8080/api/rating/${productId}`
        );
        const relatedRes = await axios.get(
          'http://localhost:8080/api/new_product'
        );

        setProduct(productRes.data);
        setImages(imagesRes.data);
        setCoupons(couponsRes.data);
        setRatings(ratingRes.data);
        setRelatedProducts(relatedRes.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(ADD_TO_CART({ ...product, quantity }));
    toast.success('Đã thêm vào giỏ hàng', {
      autoClose: 1000,
    });
    navigate('/cart');
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      id: comments.length + 1,
      user: 'Fake User',
      content: e.target.comment.value,
      rating: e.target.rating.value,
      date: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
    e.target.reset();
    toast.success('Đã gửi đánh giá của bạn', {
      autoClose: 1000,
    });
  };

  const handleAttributeChange = (e) => {
    setAttributes({ ...attributes, [e.target.name]: e.target.value });
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="py-4 bg-gray-200">
        <div className="container mx-auto">
          <nav className="text-blue-500">
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>{' '}
            <span className="mx-2">/</span>
            <Link to="/product" className="text-blue-500 hover:underline">
              {' '}
              Sản phẩm
            </Link>{' '}
            <span className="mx-2">/</span>
            <span className="text-gray-400">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Coupons Section */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="py-4 "
      >
        <div className="container mx-auto text-center items-center">
          <Slider {...settings}>
            {coupons.map((coupon) => (
              <div key={coupon.id}>
                <div className="p-4 rounded-lg mb-4">
                  <div className="uppercase text-black">
                    {coupon.title}:{' '}
                    <Link to="/coupon" className="text-white">
                      NHẬN GIẢM GIÁ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-8">
        <div className="container mx-auto flex flex-wrap">
          {/* Product Images Carousel */}
          <div className="w-full lg:w-1/2 px-4">
            <Slider {...imageSettings}>
              {images.map((image) => (
                <div key={image.id}>
                  <img
                    src={image.image}
                    alt={`image ${product.title}`}
                    className="w-full h-auto rounded border cursor-pointer"
                  />
                </div>
              ))}
            </Slider>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-lg text-gray-600 mr-4">
                  Số lượng: {product.quantity}
                </span>
                <span className="text-lg text-gray-600">
                  {product.sold} Đã bán
                </span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-semibold text-red-500">
                  {formatCurrency(product.price)}
                </span>
                {product.discount !== 0 && (
                  <div className="text-lg text-gray-500 ml-2 line-through">
                    {formatCurrency(
                      product.price + (product.price * product.discount) / 100
                    )}
                    <span className="text-red-500 ml-2">
                      -{product.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-center">
                  {renderStars(product.totalRating)}
                </div>
              </div>
              <ul className="list-disc list-inside mb-4 text-green-500">
                {product.quantity !== 0 && (
                  <li className="flex items-center mb-2">
                    <FaRegCheckCircle className="mr-2" />
                    Còn hàng
                  </li>
                )}
                <li className="flex items-center mb-2">
                  <FaRegCheckCircle className="mr-2" />
                  Miễn phí giao hàng
                </li>
                <li className="flex items-center">
                  <FaRegCheckCircle className="mr-2" />
                  Kiểm tra mã giảm giá của bạn
                </li>
              </ul>
              <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Product Description"
                className="Modal"
                overlayClassName="Overlay"
              >
                <h2 className="text-2xl font-semibold mb-4">Mô tả sản phẩm</h2>
                <div className="mb-4">{product.description}</div>
                <button
                  onClick={closeModal}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Đóng
                </button>
              </Modal>
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Phân Loại</h3>
                <div className="mb-2">
                  <label className="mr-4">Màu sắc:</label>
                  <div className="flex space-x-2">
                    <button
                      className={`px-4 py-2 border rounded ${
                        attributes.color === 'red'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleAttributeChange('color', 'red')}
                    >
                      Đỏ
                    </button>
                    <button
                      className={`px-4 py-2 border rounded ${
                        attributes.color === 'blue'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleAttributeChange('color', 'blue')}
                    >
                      Xanh
                    </button>
                    <button
                      className={`px-4 py-2 border rounded ${
                        attributes.color === 'green'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleAttributeChange('color', 'green')}
                    >
                      Xanh lá
                    </button>
                  </div>
                </div>
                <div>
                  <label className="mr-4">Dung lượng:</label>
                  <div className="flex space-x-2">
                    <button
                      className={`px-4 py-2 border rounded ${
                        attributes.size === '64GB'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleAttributeChange('size', '64GB')}
                    >
                      64GB
                    </button>
                    <button
                      className={`px-4 py-2 border rounded ${
                        attributes.size === '256GB'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleAttributeChange('size', '256GB')}
                    >
                      256GB
                    </button>
                    <button
                      className={`px-4 py-2 border rounded ${
                        attributes.size === '512GB'
                          ? 'bg-blue-500 text-white'
                          : 'bg-white'
                      }`}
                      onClick={() => handleAttributeChange('size', '512GB')}
                    >
                      512GB
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <div className="flex items-center mb-4">
                  <label
                    htmlFor="quantity"
                    className="text-lg text-gray-700 mr-4"
                  >
                    Số lượng:
                  </label>
                  <div className="relative flex items-center">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      className="text-xl font-bold bg-gray-200 px-4 py-1 border border-gray-300 rounded-l cursor-pointer focus:outline-none"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      readOnly
                      className="text-xl font-bold text-center w-12 bg-gray-200 border-t border-b border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="text-xl font-bold bg-gray-200 px-4 py-1 border border-gray-300 rounded-r cursor-pointer focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleAddToCart}
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                >
                  Thêm vào giỏ hàng
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="py-6">
        <div className="container mx-auto">
          <h3 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h3>
          <div dangerouslySetInnerHTML={{ __html: product.description }}></div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">
            Đánh giá của người dùng
          </h2>
          <div className="mb-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="mb-4 bg-white p-4 rounded shadow-md"
              >
                <div className="flex items-center mb-2">
                  <span className="font-semibold mr-2">{comment.user}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">{renderStars(comment.rating)}</div>
                <p>{comment.content}</p>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleCommentSubmit}
            className="bg-white p-4 rounded shadow-md"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Bình luận:
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="4"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="rating"
              >
                Đánh giá:
              </label>
              <select
                id="rating"
                name="rating"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
                required
              >
                <option value="">Chọn đánh giá</option>
                <option value="1">1 Sao</option>
                <option value="2">2 Sao</option>
                <option value="3">3 Sao</option>
                <option value="4">4 Sao</option>
                <option value="5">5 Sao</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
            >
              Gửi đánh giá
            </button>
          </form>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white shadow-md rounded p-4"
              >
                <Link
                  to={`/product/${relatedProduct.id}`}
                  className="block mb-2 hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img
                    src={relatedProduct.thumb}
                    alt={`image ${relatedProduct.title}`}
                    className="w-full h-auto rounded border"
                  />
                </Link>
                <Link
                  to={`/product/${relatedProduct.id}`}
                  className="text-lg font-semibold hover:text-blue-500"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {relatedProduct.title}
                </Link>
                <div className="flex items-center mt-1">
                  <span className="text-lg text-red-500">
                    {formatCurrency(relatedProduct.price)}
                  </span>
                  {relatedProduct.discount !== 0 && (
                    <div className="text-base text-gray-500 ml-2 line-through">
                      {formatCurrency(
                        relatedProduct.price +
                          (relatedProduct.price * relatedProduct.discount) / 100
                      )}
                      <span className="text-red-500 ml-2">
                        -{relatedProduct.discount}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  {renderStars(relatedProduct.totalRating)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail2;
