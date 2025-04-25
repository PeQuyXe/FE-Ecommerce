import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { formatCurrency, renderStars } from '../../../utils/configformat';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import backgroundImage from '../../../assets/others/campaign-bg3.png';
import Modal from 'react-modal';
// import { useAuth } from '../../../AuthContext';

Modal.setAppElement('#root');

const ProductDetail2 = () => {
  const { productId } = useParams();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData?.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  // const [coupons, setCoupons] = useState([]);
  const [images, setImages] = useState([]);
  const [variants, setVariants] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);

  const [activeTab, setActiveTab] = useState('reviews');
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [infor, setInfor] = useState([]);

  const fetchProductData = useCallback(async () => {
    try {
      const [
        productRes,
        imagesRes,
        // couponsRes,
        variantRes,
        relatedRes,
        ratingRes,
      ] = await Promise.all([
        axios.get(`http://localhost:8080/api/products/${productId}`),
        axios.get(
          `http://localhost:8080/api/image-products/product/${productId}`
        ),
        // axios.get('http://localhost:8080/api/coupons'),
        axios.get(`http://localhost:8080/api/product-variants/${productId}`),
        axios.get('http://localhost:8080/api/stats/top-searched'),
        axios.get(`http://localhost:8080/api/ratings/${productId}`),
      ]);

      setProduct(productRes.data);
      setImages(imagesRes.data);
      // setCoupons(couponsRes.data);
      setVariants(variantRes.data);
      console.log('variant:', variantRes.data);
      setRelatedProducts(relatedRes.data);
      setComments(ratingRes.data);
    } catch (error) {
      console.error('Lỗi nhận data:', error);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

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
      console.log('variantid:', variantId);
      setSelectedVariant(variant.productVariant);
      setInfor(variant);
    } else {
      console.error('Không tìm thấy biến thể!');
    }
  };


  const handleAddToCart = () => {
    // Kiểm tra đăng nhập
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) {
      toast.error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng', {
        autoClose: 1500,
      });
      navigate('/login'); // Chuyển hướng đến trang đăng nhập
      return;
    }

    // Kiểm tra chọn biến thể
    if (!selectedVariantId) {
      toast.error('Vui lòng chọn biến thể sản phẩm', { autoClose: 1500 });
      return;
    }

    const price = infor?.productVariant?.price || product.price;
    const variantName =
      infor?.variantValues
        ?.map(
          (v) => `${v.attribute.displayName}: ${v.attributeValue.valueName}`
        )
        .join(', ') || '';

    // Tạo cartId duy nhất dựa trên productId và variantId
    const cartId = `${product.id}_${selectedVariantId || 'default'}`;

    const productWithQuantity = {
      ...product,
      quantity,
      price,
      variantId: selectedVariantId,
      variant: variantName,
      totalPrice: price * quantity,
      cartId,
    };

    // Lấy giỏ hàng từ localStorage hoặc Redux store
    let currentCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra nếu sản phẩm đã có trong giỏ hàng
    const existingProduct = currentCart.find((item) => item.cartId === cartId);

    if (existingProduct) {
      // Nếu sản phẩm đã có, cập nhật số lượng
      existingProduct.quantity += quantity;
      existingProduct.totalPrice =
        existingProduct.price * existingProduct.quantity;
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào giỏ
      currentCart.push(productWithQuantity);
    }

    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(currentCart));

    // Cập nhật giỏ hàng trong Redux
    dispatch(ADD_TO_CART(productWithQuantity));

    // Thông báo thành công
    toast.success('Đã thêm vào giỏ hàng', { autoClose: 1000 });

    window.scrollTo(0, 0);
    navigate('/cart'); // Chuyển hướng đến trang giỏ hàng
  };
  {
    /**Rating **/
  }
  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const ratingValue = parseInt(e.target.rating.value);
    const commentContent = e.target.comment.value.trim();

    if (!ratingValue || !commentContent) {
      toast.error('Vui lòng nhập đánh giá và cho điểm', { autoClose: 1500 });
      return;
    }

    // Chuẩn bị dữ liệu để gửi
    const newRating = {
      prodId: productId,
      userId: userId,
      star: ratingValue,
      comment: commentContent,
      status: 1,
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    };

    try {
      // Gửi dữ liệu tới API backend
      const response = await axios.post(
        `http://localhost:8080/api/ratings`,
        newRating
      );
      console.log('response:', newRating);

      if (response.status === 201) {
        toast.success('Đã gửi đánh giá của bạn', { autoClose: 1000 });
        e.target.reset();
      } else {
        toast.error('Có lỗi xảy ra khi gửi đánh giá', { autoClose: 1500 });
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      toast.error('Không thể gửi đánh giá. Vui lòng thử lại.', {
        autoClose: 1500,
      });
    }
  };
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2text-gray p-3 rounded-full shadow-slider cursor-pointer hover:bg-opacity-90 transition"
    >
      ▶
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2  text-gray p-3 rounded-full shadow-slider cursor-pointer hover:bg-opacity-90 transition"
    >
      ◀
    </div>
  );

  const sliderSettings = {
    arrows: true,
    infinite: true,
    autoplay: 100,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };


  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="py-4">
        <div className="container mx-auto">
          <nav className="text-blue-500">
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <Link to="/product" className="hover:underline">
              Sản phẩm
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-400 ">{product.title}</span>
          </nav>
        </div>
      </section>
      {/* Coupons Section */}
      {/* <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="py-4 text-center"
      >
        <Slider {...sliderSettings}>
          {coupons.map((coupon) => (
            <div key={coupon.id} className="p-4 rounded-lg">
              <div className="uppercase text-black">
                {coupon.title}:{' '}
                <Link to="/coupon" className="text-white">
                  NHẬN GIẢM GIÁ
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </section> */}
      {/* Product Details Section */}
      <section className="container mx-auto py-10 p-6 rounded-lg shadow-lg">
        <div className="container mx-auto flex flex-wrap lg:flex-nowrap gap-8">
          {/* Product Images Carousel */}
          <div className="w-full lg:w-1/2 flex items-stretch px-4">
            <div className="w-full h-auto">
              <Slider {...sliderSettings}>
                {images.map((image) => (
                  <div key={image.id} className="center h-full">
                    <img
                      src={image.image}
                      alt={`image ${product.title}`}
                      className="w-auto h-auto object-contain items-center"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 flex items-stretch px-4">
            <div className="bg-white rounded p-6 flex-grow">
              <h2 className="text-3xl font-bold mb-4 line-clamp-2">{product.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-lg text-blue-500 mr-4">
                  Số lượng:{' '}
                  {selectedVariant
                    ? selectedVariant.quantity
                    : product.quantity}
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
                            className={`cursor-pointer border p-4 rounded-md shadow-sm ${selectedVariantId === variant.productVariant.id
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
                      className="bg-violet-800 py-0 px-4 rounded-lg text-white text-3xl "
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
                      className="bg-violet-800 py-1 px-4 rounded-lg text-white text-2xl"
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
        </div >
      </section >
      {/* User Reviews Section */}
      < section className="py-8" >
        <div className="container mx-auto">
          {/* Tabs */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => handleTabChange('reviews')}
              className={`p-2 ${activeTab === 'reviews'
                ? 'font-semibold border-b-2 border-blue-500'
                : ''
                }`}
            >
              Đánh giá
            </button>
            <button
              onClick={() => handleTabChange('description')}
              className={`p-2 ${activeTab === 'description'
                ? 'font-semibold border-b-2 border-blue-500'
                : ''
                }`}
            >
              Mô tả sản phẩm
            </button>
          </div>
          {/* Content */}
          {activeTab === 'reviews' && (
            <section className="py-8 bg-gray-100 p-6 rounded-lg shadow-lg">
              <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Comments Section */}
                <div>
                  {comments.slice(0, 3).map((comment) => (
                    <div
                      key={comment.id}
                      className="mb-4 bg-white p-4 rounded shadow-md"
                    >
                      <div className="flex items-center mb-2">
                        <span className="font-semibold mr-2 flex items-center">
                          <img
                            src={comment.user.avatar}
                            alt={comment.user.fullname}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          {comment.user.fullname}
                        </span>
                        {''}
                        <span className="text-gray-500 text-sm">
                          {new Date(comment.createAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mb-2">{renderStars(comment.star)}</div>
                      <p>{comment.comment}</p>
                    </div>
                  ))}
                </div>

                {/* Comment Form */}
                <div>
                  <form
                    onSubmit={handleCommentSubmit}
                    className="bg-gray-100 p-6 rounded-lg shadow-lg"
                  >
                    <div className="mb-6">
                      <label
                        className="block text-lg font-semibold text-gray-800 mb-2"
                        htmlFor="comment"
                      >
                        Bình luận:
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        className="w-full p-4 text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                        placeholder="Nhập bình luận của bạn"
                        required
                      ></textarea>
                    </div>

                    <div className="mb-6">
                      <label className="block text-lg font-semibold text-gray-800 mb-2">
                        Đánh giá:
                      </label>
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`text-3xl ${star <= selectedRating
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                              }`}
                            onClick={() => setSelectedRating(star)}
                          >
                            ★
                          </button>
                        ))}
                      </div>

                      <input
                        type="hidden"
                        name="rating"
                        value={selectedRating}
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg transition duration-300 shadow-md"
                    >
                      Gửi đánh giá
                    </button>
                  </form>
                </div>
              </div>
            </section>
          )}
          {/* Popup for Product Description */}
          {activeTab === 'description' && showDescriptionPopup && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={closePopup} // Add click event to the overlay
            >
              <div
                className="bg-white p-4 rounded shadow w-1/3 max-h-[85vh] mx-4 relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicks from propagating to the overlay
              >
                {/* Close button positioned absolutely in the modal */}
                <button
                  onClick={closePopup}
                  className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded"
                >
                  <MdClose />
                </button>
                {/* Scrollable content area */}
                <div className="overflow-auto max-h-[75vh] mt-10">
                  <h3 className="text-xl font-semibold mb-2">Mô tả sản phẩm</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section >
      < section className="py-10 bg-gray-50" >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Sản phẩm nhiều lượt tìm kiếm
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full transition-transform transform hover:scale-105"
              >
                {/* Hình ảnh sản phẩm */}
                <Link
                  to={`/product/${relatedProduct.prod_id}`}
                  onClick={() => window.scrollTo(0, 0)}
                  className="block"
                >
                  <img
                    src={relatedProduct.thumb}
                    alt={`image ${relatedProduct.title}`}
                    className="w-full h-40 object-contain"
                  />
                </Link>

                {/* Nội dung sản phẩm */}
                <div className="p-4 flex flex-col flex-grow">
                  <div className="line-clamp-2">
                    <Link
                      to={`/product/${relatedProduct.prod_id}`}
                      className="block text-lg font-semibold text-gray-800 hover:text-orange-500 transition-colors line-clamp-2 w-full max-w-full"
                      onClick={() => window.scrollTo(0, 0)}
                    >
                      {relatedProduct.title}
                    </Link>
                  </div>

                  {/* Dùng flex-grow để đẩy giá xuống dưới cùng */}


                  {/* Giá sản phẩm */}
                  <div className="mt-auto">
                    <div className="flex-grow flex items-center mt-2">
                      {renderStars(relatedProduct.totalRating)}
                    </div>
                    <span className="text-xl text-red-500 font-bold">
                      {formatCurrency(relatedProduct.price)}
                    </span>
                    {relatedProduct.discount !== 0 && (
                      <div className="text-sm text-gray-500 ml-2 line-through">
                        {formatCurrency(
                          relatedProduct.price +
                          (relatedProduct.price * relatedProduct.discount) / 100
                        )}
                        <span className="text-red-500 font-semibold ml-2">
                          -{relatedProduct.discount}%
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>  </section >

    </div >
  );
};

export default ProductDetail2;
