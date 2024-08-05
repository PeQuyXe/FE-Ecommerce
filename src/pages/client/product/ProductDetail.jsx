import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { formatCurrency, renderStars } from '../../../utils/configformat';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css';
import Carousel from './Carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { NavLink, Route, Routes } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
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
        const relatedRes = await axios.get(
          'http://localhost:8080/api/new_product'
        );

        setProduct(productRes.data);
        setImages(imagesRes.data);
        setCoupons(couponsRes.data);
        setRelatedProducts(relatedRes.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductData();
  }, [productId]);

  const handleAddToCart = () => {
    dispatch(ADD_TO_CART(product));
    toast.success('Đã thêm vào giỏ hàng', { autoClose: 1000 });
    navigate('/cart');
  };
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      {/* Coupons Section */}
      <section className="py-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <div className="w-full lg:w-2/3">
              <Carousel>
                <div>
                  {coupons.map((coupon) => (
                    <div
                      className="p-2 bg-white shadow-md rounded mb-2"
                      key={coupon.id}
                    >
                      <p className="text-uppercase">
                        {coupon.title}:{' '}
                        <Link to="/coupon" className="text-blue-500">
                          NHẬN GIẢM GIÁ
                        </Link>
                      </p>
                    </div>
                  ))}
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            {/* Product Images */}

            <div className="w-full lg:w-1/2 px-4">
              <div className="flex">
                <div className="w-2/5  mx-auto object-cover">
                  <div className="flex flex-col">
                    {images.length > 0 &&
                      images.map((image) => (
                        <div className="mb-2" key={image.id}>
                          <img
                            src={image.image}
                            alt={`image ${product?.title}`}
                            className="w-full h-auto"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="w-full lg:w-1/2 px-4">
              <div className="bg-white shadow-md rounded p-4">
                <h2 className="text-2xl font-bold mb-4">{product?.title}</h2>
                <div className="text-lg mb-4">
                  Số lượng: <span>{product?.quantity}</span>
                </div>
                <span className="text-sm text-gray-600 mb-4">
                  {product?.sold} Đã bán
                </span>
                <div className="mb-4">
                  <span className="text-xl font-semibold">
                    {formatCurrency(product?.price)}
                  </span>
                  {product && product.discount && (
                    <>
                      <span className="line-through text-gray-500">
                        {formatCurrency(
                          product.price +
                            (product.price * product.discount) / 100
                        )}
                      </span>
                      <span className="text-red-500">{product.discount}%</span>
                    </>
                  )}
                </div>
                <div className="mb-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {renderStars(product?.totalRating)}
                    </div>
                  </div>
                </div>
                <ul className="list-disc list-inside mb-4 text-green-500">
                  {product?.quantity !== 0 && (
                    <li className="flex items-center ">
                      <FaRegCheckCircle className="mr-2" />
                      Còn hàng
                    </li>
                  )}
                  <li className="flex items-center">
                    <FaRegCheckCircle className="mr-2" />
                    Miễn phí giao hàng
                  </li>
                  <li className="flex items-center">
                    <FaRegCheckCircle className="mr-2" />
                    Kiểm tra mã giảm giá của bạn
                  </li>
                </ul>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex items-center mb-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        type="button"
                        className="px-3 py-1"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        className="w-16 text-center border-none"
                        readOnly // Sử dụng readOnly để ngăn người dùng chỉnh sửa trực tiếp
                      />
                      <button
                        type="button"
                        className="px-3 py-1"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>

                    <ul className="flex items-center ml-4">
                      <li className="mr-4">
                        <button
                          onClick={handleAddToCart}
                          type="button"
                          className={`btn ${
                            product?.quantity !== 0
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-500 text-gray-300'
                          } py-2 px-4 rounded`}
                        >
                          {product?.quantity !== 0
                            ? 'Thêm vào giỏ hàng'
                            : 'Sản phẩm tạm hết'}
                        </button>
                      </li>
                      <li>
                        <button type="button" className="text-gray-500">
                          <i className="far fa-heart"></i>
                        </button>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8">
        <div className="container mx-auto mr-2">
          <div className="bg-white shadow-md rounded">
            <div className="flex border-b border-gray-300 mr-2">
              <NavLink
                to="description"
                className={({ isActive }) =>
                  `tablinks py-2 px-4 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  } rounded-tl rounded-tr`
                }
              >
                Mô tả sản phẩm
              </NavLink>
              <NavLink
                to="reviews"
                className={({ isActive }) =>
                  `tablinks py-2 px-4 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  } rounded-tl rounded-tr`
                }
              >
                Đánh giá
              </NavLink>
              <NavLink
                to="shipping"
                className={({ isActive }) =>
                  `tablinks py-2 px-4 ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  } rounded-tl rounded-tr`
                }
              >
                Vận chuyển
              </NavLink>
            </div>

            <div className="p-4">
              <Routes>
                <Route
                  path="description"
                  element={<div className="tabcontent"></div>}
                />
                <Route
                  path="reviews"
                  element={
                    <div className="tabcontent">
                      {/* Reviews */}
                      <h2>Reviews</h2>
                    </div>
                  }
                />
                <Route
                  path="shipping"
                  element={
                    <div className="tabcontent">
                      {/* Shipping Info */}
                      <h2>Shipping</h2>
                    </div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div className="tabcontent">
                      Chọn một tab để xem nội dung.
                    </div>
                  }
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Sản phẩm liên quan
          </h2>
          <div className="flex flex-wrap -mx-4">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="w-full md:w-1/2 lg:w-1/4 px-4 mb-4"
              >
                <div className="bg-white shadow-md rounded p-4 flex flex-col items-center">
                  <img
                    src={relatedProduct.thumb}
                    alt={relatedProduct.title}
                    className="w-full mx object-contain rounded mb-4"
                  />
                  <h3 className="text-lg font-bold mb-2 text-center">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-gray-600 mb-2 text-center">
                    {formatCurrency(relatedProduct.price)}
                  </p>
                  <div className="flex items-center mb-2">
                    {renderStars(relatedProduct.totalRating)}
                  </div>
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="text-blue-500 hover:underline text-center"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
