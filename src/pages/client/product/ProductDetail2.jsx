import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FaRegCheckCircle } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
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
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('reviews');
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [infor, setInfor] = useState([]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const [
          productRes,
          imagesRes,
          couponsRes,
          variantRes,
          relatedRes,
          ratingRes,
        ] = await Promise.all([
          axios.get(`http://localhost:8080/api/products/${productId}`),
          axios.get(
            `http://localhost:8080/api/image-products/product/${productId}`
          ),
          axios.get('http://localhost:8080/api/coupons'),
          axios.get(`http://localhost:8080/api/product-variants/${productId}`),
          axios.get('http://localhost:8080/api/products/new'),
          axios.get(`http://localhost:8080/api/ratings/${productId}`),
        ]);

        setProduct(productRes.data);
        setImages(imagesRes.data);
        setCoupons(couponsRes.data);
        setVariants(variantRes.data);

        setRelatedProducts(relatedRes.data);
        setComments(ratingRes.data);
      } catch (error) {
        console.error(
          'Lỗi nhận data trang thông tin chi tiết sản phẩm:',
          error
        );
      }
    };
    fetchProductData();
  }, [productId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setShowDescriptionPopup(tab === 'description');
  };

  const closePopup = () => {
    handleTabChange('reviews');
  };

  const handleSelectVariant = (variantId) => {
    const variant = variants.find((v) => v.productVariant.id === variantId);
    if (variant) {
      setSelectedVariantId(variantId);
      setSelectedVariant(variant.productVariant);
      setInfor(variant);
      console.log('Thông tin sản phẩm được chọn', variant);
    } else {
      console.error('Không tìm thấy biến thể!');
    }
  };

  const handleAddToCart = () => {
    const price = infor?.productVariant?.price || product.price;
    const name = infor?.variantValues
      ? infor.variantValues
          .map(
            (v) => `${v.attribute.displayName}: ${v.attributeValue.valueName}`
          )
          .join(', ')
      : '';

    const totalPrice = price * quantity;

    const productWithQuantity = {
      ...product,

      quantity,
      price,
      variant: name,

      totalPrice,
    };

    dispatch(ADD_TO_CART(productWithQuantity));
    toast.success('Đã thêm vào giỏ hàng', { autoClose: 1000 });

    window.scrollTo(0, 0);
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

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 10,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const imageSettings = {
    dots: false,
    infinite: true,
    speed: 10,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
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
        className="py-4"
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
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-8">
          {/* Product Images Carousel */}
          <div className="w-full lg:w-1/2 flex items-stretch px-4">
            <div className="w-full h-auto">
              <Slider {...imageSettings}>
                {images.map((image) => (
                  <div key={image.id} className="center h-full">
                    <img
                      src={image.image}
                      alt={`image ${product.title}`}
                      className="w-900 h-600 object-cover items-center"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 flex items-stretch px-4">
            <div className="bg-white rounded p-6 flex-grow">
              <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-lg text-blue-500 mr-4">
                  Số lượng: {product.quantity}
                </span>
                <span className="text-lg text-orange-500">
                  {product.sold} Đã bán
                </span>
              </div>

              {/* Hiển thị giá */}
              <div className="mb-4">
                <span className="text-3xl font-semibold text-red-500">
                  {formatCurrency(
                    selectedVariant ? selectedVariant.price : product.price
                  )}
                </span>
                {product.discount !== 0 && (
                  <div className="text-lg text-gray-500 ml-2 line-through">
                    {formatCurrency(
                      (selectedVariant
                        ? selectedVariant.price
                        : product.price) +
                        ((selectedVariant
                          ? selectedVariant.price
                          : product.price) *
                          product.discount) /
                          100
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
                    <FaRegCheckCircle className="mr-2" /> Còn hàng
                  </li>
                )}
                <li className="flex items-center mb-2">
                  <FaRegCheckCircle className="mr-2" /> Miễn phí giao hàng
                </li>
                <li className="flex items-center">
                  <FaRegCheckCircle className="mr-2" /> Kiểm tra mã giảm giá của
                  bạn
                </li>
              </ul>

              <form onSubmit={(e) => e.preventDefault()} className="mb-4">
                <div className="mt-8 mb-8">
                  <div className="space-y-4">
                    <h6 className="text-lg font-semibold text-gray-800">
                      Phân loại:
                    </h6>
                    <div className="text-left">
                      {/* Hiển thị danh sách các biến thể */}
                      <ul className="grid grid-cols-4 gap-4">
                        {variants.map((variant) => (
                          <li
                            key={variant.productVariant.id}
                            className={`cursor-pointer border p-4 rounded-md shadow-sm ${
                              selectedVariantId === variant.productVariant.id
                                ? 'border-blue-400 bg-blue-100'
                                : 'border-gray-300 hover:border-blue-300'
                            }`}
                            onClick={() =>
                              handleSelectVariant(variant.productVariant.id)
                            }
                          >
                            <div className="space-y-1 text-sm text-gray-600">
                              {variant.variantValues.map((value) => (
                                <div key={value.id}>
                                  <span>
                                    {value.attribute.displayName}:{' '}
                                    <span className="font-semibold">
                                      {value.attributeValue.valueName}
                                    </span>
                                  </span>
                                </div>
                              ))}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row items-center gap-12">
                  <div className="flex flex-row items-center">
                    <button
                      className="bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl"
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                    >
                      -
                    </button>
                    <span className="py-4 px-6 rounded-lg" readOnly>
                      {quantity}
                    </span>
                    <button
                      className="bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl"
                      onClick={() => setQuantity((prev) => prev + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-violet-800 hover:bg-violet-600 flex items-center space-x-2 transform motion-safe:hover:scale-110 text-white font-semibold py-3 px-16 rounded-xl h-full"
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleTabChange('reviews')}
              className={`p-2 ${
                activeTab === 'reviews'
                  ? 'font-semibold border-b-2 border-blue-500'
                  : ''
              }`}
            >
              Đánh giá
            </button>
            <button
              onClick={() => handleTabChange('description')}
              className={`p-2 ${
                activeTab === 'description'
                  ? 'font-semibold border-b-2 border-blue-500'
                  : ''
              }`}
            >
              Mô tả sản phẩm
            </button>
          </div>
          {/* Content */}
          {activeTab === 'reviews' && (
            <section className="py-8 bg-gray-100">
              <div className="container mx-auto">
                <div className="mb-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="mb-4 bg-white p-4 rounded shadow-md"
                    >
                      <div className="flex items-center mb-2">
                        <span className="font-semibold mr-2">
                          {comment.user}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {new Date(comment.createAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2">{renderStars(comment.star)}</div>
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
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg shadow-md transition duration-300"
                  >
                    Gửi đánh giá
                  </button>
                </form>
              </div>
            </section>
          )}
          {/* Popup for Product Description */}
          {activeTab === 'description' && showDescriptionPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded shadow w-1/3 max-h-[85vh] overflow-auto mx-4">
                {' '}
                <h3 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>{' '}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closePopup}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    <MdClose />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className=" shadow-md rounded p-4">
                <Link
                  to={`/product/${relatedProduct.id}`}
                  className="block mb-2 hover:underline"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img
                    src={relatedProduct.thumb}
                    alt={`image ${relatedProduct.title}`}
                    className="w-[900] h-600 rounded border"
                  />
                </Link>
                <Link
                  to={`/product/${relatedProduct.id}`}
                  className="text-lg font-semibold hover:text-orange-500"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  {relatedProduct.title}
                </Link>
                <div className="flex items-center mt-1">
                  {renderStars(relatedProduct.totalRating)}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-lg text-gray-500 font-bold">
                    {formatCurrency(relatedProduct.price)}
                  </span>
                  {relatedProduct.discount !== 0 && (
                    <div className="text-base text-gray-500 ml-2 line-through">
                      {formatCurrency(
                        relatedProduct.price +
                          (relatedProduct.price * relatedProduct.discount) / 100
                      )}
                      <span className="text-gray-500 font-bold ml-2">
                        -{relatedProduct.discount}%
                      </span>
                    </div>
                  )}
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
