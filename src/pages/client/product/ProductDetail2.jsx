import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, NavLink, Route, Routes } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FaRegCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { formatCurrency, renderStars } from '../../../utils/configformat';

const ProductDetail2 = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [images, setImages] = useState([]);
  const [ratings, setRatings] = useState([]);
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
    dispatch(ADD_TO_CART(product));
    toast.success('Đã thêm vào giỏ hàng', {
      autoClose: 1000,
    });
    navigate('/cart');
  };

  return (
    <div className="bg-gray-100">
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
            <span className="text-gray-400">{product?.title}</span>
          </nav>
        </div>
      </section>

      {/* Coupons Section */}
      <section className="py-4 bg-gray-100">
        <div className="container mx-auto text-center">
          <div className="flex justify-center">
            <div className="w-full lg:w-2/3">
              <Slide>
                {coupons.map((coupon) => (
                  <div
                    className="p-4 bg-white shadow-md rounded mb-4"
                    key={coupon.id}
                  >
                    <div className="uppercase text-blue-500">
                      {coupon.title}:{' '}
                      <Link to="/coupon" className="text-blue-700">
                        NHẬN GIẢM GIÁ
                      </Link>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Section */}
      <section className="py-8">
        <div className="container mx-auto flex flex-wrap">
          {/* Product Images Carousel */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="flex">
              <div className="w-1/4 flex flex-col h-96 overflow-hidden relative">
                <Slide>
                  {images.map((image) => (
                    <div className="mb-2" key={image.id}>
                      <img
                        src={image.image}
                        alt={`image ${product?.title}`}
                        className="w-full h-auto rounded border cursor-pointer"
                      />
                    </div>
                  ))}
                </Slide>
              </div>
              <div className="w-3/4 ml-4">
                <img
                  src={product?.thumb}
                  alt={'product'}
                  className="w-full h-64 object-contain rounded border"
                />
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 px-4">
            <div className="bg-white shadow-md rounded p-6">
              <h2 className="text-3xl font-bold mb-4">{product?.title}</h2>
              <div className="flex items-center mb-4">
                <span className="text-lg text-gray-600 mr-4">
                  Số lượng: {product?.quantity}
                </span>
                <span className="text-lg text-gray-600">
                  {product?.sold} Đã bán
                </span>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-semibold text-red-500">
                  {formatCurrency(product?.price)}
                </span>
                {product?.discount !== 0 && (
                  <div className="text-lg text-gray-500 ml-2 line-through">
                    {formatCurrency(
                      product?.price +
                        (product?.price * product?.discount) / 100
                    )}
                    <span className="text-red-500 ml-2">
                      -{product?.discount}%
                    </span>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <div className="flex items-center">
                  {renderStars(product?.totalRating)}
                </div>
              </div>
              <ul className="list-disc list-inside mb-4 text-green-500">
                {product?.quantity !== 0 && (
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

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center mb-4">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button type="button" className="px-3 py-1">
                      -
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      value="1"
                      className="w-16 text-center border-none"
                      readOnly
                    />
                    <button type="button" className="px-3 py-1">
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    type="button"
                    className={`btn ${
                      product?.quantity !== 0
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-500 text-gray-300'
                    } py-2 px-4 rounded ml-4`}
                  >
                    {product?.quantity !== 0
                      ? 'Thêm vào giỏ hàng'
                      : 'Sản phẩm tạm hết'}
                  </button>
                </div>
              </form>

              {/* Product Attributes */}
              {/* <div className="mt-4">
                <h3 className="text-xl font-semibold mb-2">Attributes</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {attributes.map((attr) => (
                    <li key={attr.id} className="mb-2">
                      <span className="font-medium">{attr.name}:</span>{' '}
                      {attr.value}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <div className="bg-white shadow-md rounded">
            <div className="flex border-b border-gray-300">
              <NavLink
                to="/description"
                className={({ isActive }) =>
                  `tab-link py-2 px-4 ${
                    isActive ? 'border-b-2 border-blue-500 text-blue-500' : ''
                  }`
                }
              >
                Mô tả sản phẩm
              </NavLink>
              <NavLink
                to="/rating"
                className={({ isActive }) =>
                  `tab-link py-2 px-4 ${
                    isActive ? 'border-b-2 border-blue-500 text-blue-500' : ''
                  }`
                }
              >
                Đánh giá
              </NavLink>
              <NavLink
                to="/questions"
                className={({ isActive }) =>
                  `tab-link py-2 px-4 ${
                    isActive ? 'border-b-2 border-blue-500 text-blue-500' : ''
                  }`
                }
              >
                Câu hỏi thường gặp
              </NavLink>
            </div>
            <div className="p-4">
              <Routes>
                <Route
                  path="description"
                  element={<div>{product?.description}</div>}
                />
              </Routes>
            </div>
          </div>
        </div>
      </section>
      <section className="py-8">
        <div className="container mx-auto">
          <div className="text-xl font-semibold mb-2">Đánh giá sản phẩm</div>
          {ratings.length > 0 ? (
            ratings.map((rating) => (
              <div
                key={rating.id}
                className="mb-4 p-4 bg-gray-50 rounded shadow"
              >
                <div className="flex items-center mb-2">
                  <span className="font-semibold">{rating.user_id}</span>
                  <span className="ml-2 text-yellow-500">
                    {renderStars(rating.star)}
                  </span>
                </div>
                <div>{rating.comment}</div>
              </div>
            ))
          ) : (
            <div>Chưa có đánh giá</div>
          )}
        </div>
      </section>
      {/* Related Products Section */}
      <section className="py-8 bg-gray-100">
        <div className="container mx-auto ">
          <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
          <div className="flex overflow-x-auto">
            {relatedProducts.map((item) => (
              <div
                className="bg-white shadow-md rounded p-4 m-2 flex-none w-64"
                key={item.id}
              >
                <img
                  src={item.thumb}
                  alt={item.title}
                  className="w-full h-32 object-contain mb-2 rounded"
                />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <div className="text-gray-600 mb-2">
                  {formatCurrency(item.price)}
                </div>
                <div>{renderStars(item.totalRating)}</div>
                <Link
                  to={`/product/${item.id}`}
                  className="text-blue-500 hover:text-blue-700 "
                >
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail2;
