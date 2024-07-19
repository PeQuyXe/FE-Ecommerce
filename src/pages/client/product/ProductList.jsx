import { useEffect, useState } from 'react';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    toast.success('Đã thêm vào giỏ hàng', {
      autoClose: 1000,
    });
    navigate('/cart');
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">
      <div>
        <label className="relative block">
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
          </span>
          <input
            className="placeholder-italic placeholder-text-slate-400 block bg-white border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="Tìm tên sản phẩm ..."
            type="text"
            name="search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </label>
      </div>
      <br></br>
      {products.length === 0 && (
        <div>
          <p>Loading...</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-auto">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full"
          >
            <div className="flex justify-center mb-4">
              <img
                src={product.thumb}
                alt="Product"
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="flex flex-col items-center mb-4">
              <h3 className="text-lg text-center font-semibold text-gray-800">
                {product.title}
              </h3>
              <p className="mt-2 font-extrabold text-black">
                Giá:{' '}
                {(product.price * 22000).toLocaleString('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => addToCart(product)}
                className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              >
                <FaShoppingCart className="mr-2" /> Mua
              </button>
              <button
                onClick={() => goToProductDetail(product.id)}
                className="flex items-center bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
              >
                <FaInfoCircle className="mr-2" /> Xem
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {'<<'}
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 text-gray-800'
            } hover:bg-gray-400 font-bold py-2 px-4`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default ProductList;
