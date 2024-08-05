import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import 'react-slideshow-image/dist/styles.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { formatCurrency, renderStars } from '../../../utils/configformat';

const ProductDetail2 = () => {
  const { cateId } = useParams(); // Assuming cateId is the category ID parameter
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productsRes = await axios.get(
          `http://localhost:8080/api/category/${cateId}`
        );
        setProducts(productsRes.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductsByCategory();
  }, [cateId]);

  const handleAddToCart = (product) => {
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
              Sản phẩm Theo Danh Mục
            </Link>{' '}
            <span className="mx-2">/</span>
            <span className="text-gray-400">
              {products.length > 0 ? products[0].productcol : ''}
            </span>
          </nav>
        </div>
      </section>

      {/* Product List Section */}
      <section className="py-8">
        <div className="container mx-auto flex flex-wrap">
          {products.map((product) => (
            <div className="w-full lg:w-1/3 px-4 mb-4" key={product.id}>
              <div className="bg-white shadow-md rounded p-4 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <img
                  src={product.thumb}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-2 rounded"
                />
                <div className="text-gray-600 mb-2">
                  <span className="font-semibold">
                    {formatCurrency(product.price)}
                  </span>
                  {product.discount !== 0 && (
                    <span className="ml-2 text-red-500">
                      -{product.discount}%
                    </span>
                  )}
                </div>
                <div>{renderStars(product.totalRating)}</div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`rounded-lg ${
                      product.quantity !== 0
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-500 text-gray-300'
                    } py-2 px-4 rounded`}
                    disabled={product.quantity === 0}
                  >
                    {product.quantity !== 0
                      ? 'Thêm vào giỏ hàng'
                      : 'Sản phẩm tạm hết'}
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    className="text-blue-500 hover:text-blue-700 items-center"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail2;
