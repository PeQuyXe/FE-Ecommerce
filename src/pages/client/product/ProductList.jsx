import { useEffect, useState } from 'react';
import { FaShoppingCart, FaInfoCircle } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { toast } from 'react-toastify';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000000]); // [min, max]
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
        console.error('Lỗi nhận dữ liệu product:', error);
      });

    axios
      .get('http://localhost:8080/api/category')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Lỗi nhận dữ liệu danh mục:', error);
      });
  }, []);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryFilter(categoryId);
    setCurrentPage(1);
  };

  const handlePriceChange = (event) => {
    const { value, name } = event.target;
    setPriceRange({
      ...priceRange,
      [name]: value,
    });
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      categoryFilter === 'all' ? true : product.categoryId === categoryFilter
    )
    .filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4 flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h3 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h3>
        <ul>
          <li>
            <button
              onClick={() => handleCategoryChange('all')}
              className="block py-2 px-4 w-full text-left bg-white hover:bg-gray-200 rounded"
            >
              Tất cả
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                onClick={() => handleCategoryChange(category.id)}
                className="block py-2 px-4 w-full text-left bg-white hover:bg-gray-200 rounded"
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>

        {/* Price Range Filter */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-2">Khoảng giá</h4>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              name="min"
              value={priceRange[0]}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded py-2 px-4 w-24"
              placeholder="Min"
            />
            <span className="text-gray-600">-</span>
            <input
              type="number"
              name="max"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="border border-gray-300 rounded py-2 px-4 w-24"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <nav className="flex">
            <Link to="/" className="text-blue-500 hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">Sản phẩm</span>
          </nav>
        </div>

        <div className="mb-4 flex justify-between">
          <div>
            <label className="relative block">
              <span className="sr-only">Search</span>
              <input
                className="placeholder-italic placeholder-gray-400 block bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm"
                placeholder="Tìm tên sản phẩm ..."
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </label>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center">
            <p>Loading...</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between h-full"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={product.thumb}
                  alt={product.title}
                  className="w-40 h-40 object-contain"
                />
              </div>

              <div className="flex flex-col items-center mb-4">
                <h3 className="text-lg text-center font-semibold text-gray-800">
                  {product.title}
                </h3>
                <p className="mt-2 font-extrabold text-black">
                  Giá:{' '}
                  {product.price.toLocaleString('vi-VN', {
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
    </div>
  );
};

export default ProductList;
