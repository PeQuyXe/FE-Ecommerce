import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { ADD_TO_CART } from '../../../actions/cartAction';
import {
  formatCurrency,
  renderStars,
  calculateOriginalPrice,
} from '../../../utils/configformat';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { FaEye, FaHeart } from 'react-icons/fa';
import 'react-slideshow-image/dist/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../../../reducer/favoritesSlice';
import { FaRedo } from "react-icons/fa";

const priceOptions = [
  { title: 'Dưới 2 triệu', value: '0 - 2000000' },
  { title: 'Từ 2 - 4 triệu', value: '2000000 - 4000000' },
  { title: 'Từ 4 - 7 triệu', value: '4000000 - 7000000' },
  { title: 'Từ 7 - 13 triệu', value: '7000000 - 13000000' },
  { title: 'Từ 13 - 20 triệu', value: '13000000 - 20000000' },
  { title: 'Từ 20 - 32 triệu', value: '20000000 - 32000000' },
  { title: 'Trên 32 triệu', value: '32000000 - 8000000000' },
];

const CategoryProduct = () => {
  const { cateId } = useParams();
  const [productByCategory, setProductByCategory] = useState([]);
  const [, setProducts] = useState([]);
  const [, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    price: '',
    sort: '-create_at',
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const navigate = useNavigate();
  // const dispatch = useDispatch();

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
        console.error('Error fetching data:', error);

        toast.error('Lỗi khi tải dữ liệu sản phẩm');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const productsRes = await axios.get(
          `http://localhost:8080/api/products/category/${cateId}`
        );
        setProductByCategory(productsRes.data);
      } catch (error) {
        console.error('Lỗi nhận sản phẩm theo danh mục:', error);

        toast.error('Lỗi khi tải sản phẩm theo danh mục');
      }
    };

    fetchProductsByCategory();
  }, [cateId]);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
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
        console.error('Lỗi nhận thông tin tất cả các sản phẩm:', error);

        toast.error('Lỗi khi lọc sản phẩm theo category');
      }
    };

    fetchFilteredProducts();
  }, [filters]);

  const handleFilterChange = (name, value) => {
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

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = productByCategory
    .filter((product) =>
      filters.search
        ? product.title.toLowerCase().includes(filters.search.toLowerCase())
        : true
    )
    .filter((product) =>
      filters.category ? product.cateId === filters.category : true
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

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const favorites = useSelector((state) => state.favorites.items);
  const dispatch = useDispatch();
  const toggleFavorite = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    if (isFavorite) {
      toast.info("Sản phẩm đã có trong danh sách yêu thích", {
        autoClose: 500,
      });
    } else {
      toast.success("Đã thêm vào yêu thích", { autoClose: 500 });
      dispatch(addToFavorites(item));
    }
  };


  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

  const addToCart = (item) => {
    // const productWithQuantity = {
    //   ...item,
    //   quantity: 1,
    // };

    // dispatch(ADD_TO_CART(productWithQuantity));
    // toast.success('Đã thêm vào giỏ hàng', {
    //   autoClose: 1000,
    // });

    window.scrollTo(0, 0);
    navigate(`/product/${item.id}`);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="container mx-auto mb-6">
          <nav className="text-blue-500">
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>{' '}
            <span className="mx-2">/</span>
            <span className="text-gray-400"> Danh Mục</span>{' '}
            <span className="text-gray-400">
              {productByCategory.length > 0
                ? productByCategory[0].productcol
                : ''}
            </span>
          </nav>
        </div>
        <div className="mb-10 justify-between">
          <div className="flex items-center justify-between px-5">
            <label className="relative block w-full lg:w-auto mb-4 lg:mb-0">
              <input
                className="placeholder-italic placeholder-gray-500 block bg-gray-100 border border-gray-300 rounded-lg py-3 pl-5 pr-10 shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 sm:text-sm w-full lg:w-auto transition-all duration-300 ease-in-out transform hover:scale-105"
                placeholder="Tìm tên sản phẩm..."
                type="text"
                value={filters.search}
                onChange={handleSearchChange}
              />
              <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                🔍
              </span>
            </label>

            <div className="flex-1">
              <div className="flex items-center justify-end space-x-4 lg:space-x-6">
                <Menu
                  as="div"
                  className="relative inline-block text-left w-full lg:w-auto"
                >
                  <MenuButton className="inline-flex justify-between w-full lg:w-auto px-3 py-2 text-sm font-sans text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {filters.brand
                      ? brands.find((brand) => brand.id === filters.brand)?.name
                      : 'Thương hiệu'}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-400"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    {brands.map((brandItem) => (
                      <MenuItem
                        key={brandItem.id}
                        as="button"
                        onClick={() =>
                          handleFilterChange('brand', brandItem.id)
                        }
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {brandItem.name}
                        </span>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                <Menu
                  as="div"
                  className="relative inline-block text-left w-full lg:w-auto"
                >
                  <MenuButton className="inline-flex justify-between w-full lg:w-auto px-3 py-2 text-sm font-sans text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {filters.price
                      ? priceOptions.find(
                        (option) => option.value === filters.price
                      )?.title
                      : 'Khoảng giá'}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-400"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    {priceOptions.map((priceOption) => (
                      <MenuItem
                        key={priceOption.value}
                        as="button"
                        onClick={() =>
                          handleFilterChange('price', priceOption.value)
                        }
                      >
                        <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          {priceOption.title}
                        </span>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>

                <Menu
                  as="div"
                  className="relative inline-block text-left w-full lg:w-auto"
                >
                  <MenuButton className="inline-flex justify-between w-full lg:w-auto px-3 py-2 text-sm font-sans text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {filters.sort === '-create_at'
                      ? 'Mới nhất'
                      : filters.sort === '-sold'
                        ? 'Bán chạy nhất'
                        : filters.sort === 'price'
                          ? 'Giá từ thấp đến cao'
                          : 'Giá từ cao đến thấp'}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-400"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                    <MenuItem
                      as="button"
                      onClick={() => handleFilterChange('sort', '-create_at')}
                    >
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Mới nhất
                      </span>
                    </MenuItem>
                    <MenuItem
                      as="button"
                      onClick={() => handleFilterChange('sort', '-sold')}
                    >
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Bán chạy nhất
                      </span>
                    </MenuItem>
                    <MenuItem
                      as="button"
                      onClick={() => handleFilterChange('sort', 'price')}
                    >
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Giá từ thấp đến cao
                      </span>
                    </MenuItem>
                    <MenuItem
                      as="button"
                      onClick={() => handleFilterChange('sort', '-price')}
                    >
                      <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Giá từ cao đến thấp
                      </span>
                    </MenuItem>
                  </MenuItems>
                </Menu>
                <div className="flex justify-end space-x-6">
                  <button
                    type="button"
                    onClick={() =>
                      setFilters({
                        category: "",
                        brand: "",
                        price: "",
                        sort: "-create_at",
                        search: "",
                      })
                    }
                    className="w-full lg:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out font-medium"
                  >
                    <FaRedo className="text-lg animate-spin-slow" />
                    Làm mới
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-center">
          {/* Product Listing */}
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
                    className="w-full h-40 object-contain p-2 transform-gpu transition-transform duration-500 hover:scale-100"
                  />
                  {item.discount !== 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded">
                      Giảm {item.discount}%
                    </div>
                  )}
                </Link>

                <div className="absolute inset-0 bg-white bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <ul className="flex space-x-2">
                    <li>
                      <button
                        onClick={() => goToProductDetail(item.id)}
                        className="text-white  bg-white p-3  rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
                      >
                        <FaEye />
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => addToCart(item)}
                        className={`text-white p-2 rounded-lg bg-white  bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ${item.quantity === 0
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                          }`}
                        disabled={item.quantity === 0}
                      >
                        Mua sản phẩm
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          toggleFavorite(item)
                        }
                        className="text-white p-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
                        <FaHeart />
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="text-gray-500 ">
                    {renderStars(item.totalRating)}
                  </div>

                  <div className="text-xl font-bold text-red-500">
                    {formatCurrency(item.price)}
                    {item.discount !== 0 && (
                      <span className="text-sm line-through text-gray-500 ml-2">
                        {formatCurrency(
                          calculateOriginalPrice(item.price, item.discount)
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center">
              Không có sản phẩm nào
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <Link
            to="/product"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Xem tất cả sản phẩm
          </Link>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10">
            <nav
              className="relative z-0 inline-flex shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M13.707 5.293a1 1 0 010 1.414L9.414 10l4.293 4.293a1 1 0 11-1.414 1.414l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${currentPage === i + 1
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  paginate(
                    currentPage < totalPages ? currentPage + 1 : totalPages
                  )
                }
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 14.707a1 1 0 010-1.414L10.586 10 6.293 5.707a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default CategoryProduct;
