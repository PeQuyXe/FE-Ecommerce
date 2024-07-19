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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    toast.success('Đã thêm vào giỏ hàng', {
      autoClose: 1000,
    });
    navigate('/cart');
  };

  useEffect(() => {
    const fetchProductById = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProductById(productId);
  }, [productId]);

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center text-gray-500">
        <h1>Loading...</h1>
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
            <p className="text-lg font-bold">Tên sản phẩm: {product.title}</p>
            {/* <p className="text-lg font-bold">Danh Mục: {product.category}</p> */}
            <div className="flex items-center mt-2">
              <StarRating rating={product.totalRating} />
              <span className="ml-2 text-sm text-gray-600">
                {product.totalRating}
              </span>
            </div>
            <p className="text-lg font-semibold mt-4">
              Giá:{' '}
              {(product.price * 22000).toLocaleString('vi-VN', {
                style: 'currency',
                currency: 'VND',
              })}
            </p>
            <div className="mt-4">
              <p className="text-lg font-semibold">Mô Tả:</p>
              <p className="mt-2 text-gray-700">{product.shortDescription}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
            >
              <FaShoppingCart className="mr-2" /> Thêm giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
