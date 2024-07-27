import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import StarRating from './StarRating';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (selectedVariant) {
      dispatch(ADD_TO_CART({ ...selectedVariant, quantity }));
      toast.success('Đã thêm vào giỏ hàng', {
        autoClose: 1000,
      });
      navigate('/cart');
    } else {
      toast.error('Vui lòng chọn biến thể sản phẩm', {
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(productResponse.data);

        const variantResponse = await axios.get(
          `http://localhost:8080/api/product-variants?productId=${id}`
        );
        setVariants(variantResponse.data);
      } catch (error) {
        console.error('Lỗi nhận dữ liệu từng product:', error);
      }
    };

    fetchProductById(productId);
  }, [productId]);

  const selectVariant = (variant) => {
    setSelectedVariant(variant);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-center">
          <img
            src={product.thumb}
            alt={product.title}
            className="w-full max-w-sm h-auto object-contain rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <StarRating rating={product.totalRating} />
              <span className="ml-2 text-sm text-gray-600">
                {product.totalRating}
              </span>
            </div>
            <p className="text-lg font-semibold mb-4">
              Giá:
              {product.price.toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
            <div className="mb-6">
              <p className="text-lg font-semibold mb-2">Mô Tả:</p>
              <p className="text-gray-700">{product.shortDescription}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleAddToCart}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              <FaShoppingCart className="mr-2" /> Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <section className="mt-8">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  {product.images.map((thumbItem, index) => (
                    <div key={index} className="border rounded p-1">
                      <img
                        src={thumbItem.image}
                        alt={`image ${product.title}`}
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
                <div className="col-span-2">
                  <div className="relative">
                    {product.images.map((imageItem, index) => (
                      <div key={index} className="mb-4">
                        <img
                          src={imageItem.image}
                          alt={`image ${product.title}`}
                          className="object-contain w-full rounded"
                        />
                        <div className="absolute top-0 left-0 p-2">
                          <a
                            href={imageItem.image}
                            className="text-gray-700 hover:text-gray-900"
                          >
                            <i className="far fa-search-plus"></i>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="p-4">
                <h2 className="text-2xl font-bold">{product.title}</h2>
                <div className="mt-2">
                  <span className="block text-lg">
                    Số lượng: <span>{product.quantity}</span>
                  </span>
                  <span className="block text-lg">{product.sold} Đã bán</span>
                </div>
                <div className="mt-4">
                  <span className="text-xl font-bold">
                    {product.isVariant
                      ? `${product.priceRange.min} - ${product.priceRange.max}`
                      : product.price.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="line-through ml-2 text-gray-500">
                        {product.originalPrice.toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                      <span className="ml-2 text-red-600">{`${product.discount}%`}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center mt-4">
                  <StarRating rating={product.totalRatings} />
                  <span className="ml-2 text-gray-600">
                    (<span>{product.totalUserRatings}</span> Đánh giá)
                  </span>
                </div>
                <ul className="mt-4">
                  {product.quantity > 0 && (
                    <li className="flex items-center text-green-500">
                      <i className="fal fa-check mr-2"></i>Còn hàng
                    </li>
                  )}
                  <li className="flex items-center text-green-500">
                    <i className="fal fa-check mr-2"></i>Miễn phí giao hàng
                  </li>
                  <li className="flex items-center text-green-500">
                    <i className="fal fa-check mr-2"></i>Kiểm tra mã giảm giá
                    của bạn để có mã tốt nhất
                  </li>
                </ul>
                <p className="mt-4 text-gray-700">{product.shortDescription}</p>
                <form className="mt-6">
                  {variants.length > 0 && (
                    <div className="mt-4">
                      <h6 className="text-lg font-semibold">Phân loại:</h6>
                      <div className="flex space-x-2 mt-2">
                        <input
                          id="product_variant_id"
                          type="hidden"
                          name="product_variant_id"
                          value={selectedVariant ? selectedVariant._id : ''}
                        />
                        <ul className="flex space-x-2">
                          {variants.map((variant) => (
                            <li
                              key={variant._id}
                              className={`cursor-pointer border p-2 rounded ${
                                selectedVariant?._id === variant._id
                                  ? 'bg-blue-200'
                                  : ''
                              }`}
                              onClick={() => selectVariant(variant)}
                            >
                              {variant.attributeValues}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center mt-4">
                    <div className="flex items-center border rounded p-2">
                      <button
                        type="button"
                        className="px-2"
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        name="quantity"
                        value={quantity}
                        className="w-8 text-center"
                        readOnly
                      />
                      <button
                        type="button"
                        className="px-2"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                    >
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
