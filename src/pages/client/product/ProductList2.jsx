import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { FaEye, FaShoppingCart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  formatCurrency,
  renderStars,
  calculateOriginalPrice,
} from '../../../utils/configformat';

const priceOptions = [
  { title: 'Dưới 2 triệu', value: '0 - 2000000' },
  { title: 'Từ 2 - 4 triệu', value: '2000000 - 4000000' },
  { title: 'Từ 4 - 7 triệu', value: '4000000 - 7000000' },
  { title: 'Từ 7 - 13 triệu', value: '7000000 - 13000000' },
  { title: 'Từ 13 - 20 triệu', value: '13000000 - 20000000' },
  { title: 'Từ 20 - 32 triệu', value: '20000000 - 32000000' },
  { title: 'Trên 32 triệu', value: '32000000 - 8000000000' },
];

const ProductList2 = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    price: '',
    sort: '-create_at',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse, brandsResponse] =
          await Promise.all([
            axios.get('http://localhost:8080/api/products'),
            axios.get('http://localhost:8080/api/category'),
            axios.get('http://localhost:8080/api/brand'),
          ]);
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error('Lỗi nhận list product data:', error);
      }
    };

    fetchData();
  }, []);
  console.log('SP', products);
  console.log('danh mục ', categories);
  console.log('brand', brands);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products', {
          params: {
            category: filters.category,
            brand: filters.brand,
            price: filters.price,
            sort: filters.sort,
            search: filters.search,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Lỗi nhận filter products:', error);
      }
    };

    fetchProducts();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
    setCurrentPage(1);
  };

  const filteredProducts = products
    .filter((product) =>
      filters.search
        ? product.title.toLowerCase().includes(filters.search.toLowerCase())
        : true
    )
    .filter((product) =>
      filters.category ? product.categoryId === filters.category : true
    )
    .filter((product) =>
      filters.brand ? product.brandId === filters.brand : true
    )
    .filter((product) => {
      if (filters.price) {
        const [min, max] = filters.price.split(' - ').map(Number);
        return product.price >= min && product.price <= max;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === '-create_at') {
        return new Date(b.createAt) - new Date(a.createAt);
      }
      if (filters.sort === '-sold') {
        return b.sold - a.sold;
      }
      if (filters.sort === 'price') {
        return a.price - b.price;
      }
      if (filters.sort === '-price') {
        return b.price - a.price;
      }
      return 0;
    });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const addToCart = (item) => {
    dispatch(ADD_TO_CART(item));
    toast.success('Đã thêm vào giỏ hàng', {
      autoClose: 1000,
    });
    navigate('/cart');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-4">
          <nav className="text-gray-700">
            <Link to="/" className="text-blue-500 hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Danh sách sản phẩm</span>
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
                value={filters.search}
                onChange={handleSearchChange}
              />
            </label>
          </div>
        </div>

        <div className="mb-4">
          <form method="post">
            <div className="flex flex-wrap justify-between">
              <div className="w-full lg:w-3/4 flex flex-wrap space-x-2">
                <select
                  className="p-2 border rounded-md"
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                >
                  <option value="">Danh mục</option>
                  {categories.map((cateItem) => (
                    <option key={cateItem.id} value={cateItem.id}>
                      {cateItem.name}
                    </option>
                  ))}
                </select>

                <select
                  className="p-2 border rounded-md"
                  name="brand"
                  value={filters.brand}
                  onChange={handleFilterChange}
                >
                  <option value="">Thương hiệu</option>
                  {brands.map((brandItem) => (
                    <option key={brandItem.id} value={brandItem.id}>
                      {brandItem.name}
                    </option>
                  ))}
                </select>

                <select
                  className="p-2 border rounded-md"
                  name="price"
                  value={filters.price}
                  onChange={handleFilterChange}
                >
                  <option value="">Khoảng giá</option>
                  {priceOptions.map((priceOption) => (
                    <option key={priceOption.value} value={priceOption.value}>
                      {priceOption.title}
                    </option>
                  ))}
                </select>

                <select
                  className="p-2 border rounded-md"
                  name="sort"
                  value={filters.sort}
                  onChange={handleFilterChange}
                >
                  <option value="-create_at">Mới nhất</option>
                  <option value="-sold">Bán chạy nhất</option>
                  <option value="price">Giá: Thấp đến cao</option>
                  <option value="-price">Giá: Cao đến thấp</option>
                </select>
              </div>
              <div className="w-full lg:w-1/4 text-right">
                <button
                  type="button"
                  onClick={() =>
                    setFilters({
                      category: '',
                      brand: '',
                      price: '',
                      sort: '-create_at',
                      search: '',
                    })
                  }
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Làm mới
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center">
          {currentProducts.length > 0 ? (
            currentProducts.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md relative flex flex-col justify-between h-full"
              >
                <Link to={`product/${item.title}-${item.id}`} className="block">
                  <img
                    src={item.thumb}
                    alt={item.title}
                    className="w-full h-40 object-contain hover:scale-105 transition-transform"
                  />
                  {item.discount !== 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded">
                      Giảm {item.discount}%
                    </div>
                  )}
                </Link>

                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center opacity-0 hover:opacity-75 transition-opacity">
                  <ul className="flex space-x-2">
                    <li>
                      <button
                        onClick={() => goToProductDetail(item.id)}
                        className="text-white p-2 bg-black rounded-full hover:bg-gray-800"
                      >
                        <FaEye />
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => addToCart(item)}
                        className={`text-white p-2 bg-black rounded-full hover:bg-gray-800 ${
                          item.quantity === 0
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
                        disabled={item.quantity === 0}
                      >
                        <FaShoppingCart />
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-500 ">
                    {renderStars(item.totalRating)}
                  </p>

                  <p className="text-xl font-bold ">
                    {formatCurrency(item.price)}
                    {item.discount !== 0 && (
                      <span className="text-sm line-through text-gray-500 ml-2">
                        {formatCurrency(
                          calculateOriginalPrice(item.price, item.discount)
                        )}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              Không có sản phẩm nào
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <nav className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 border rounded-md ${
                  currentPage === index + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-blue-500'
                } hover:bg-blue-100`}
              >
                {index + 1}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ProductList2;
