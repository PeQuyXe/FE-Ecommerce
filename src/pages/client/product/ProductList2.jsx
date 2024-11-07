import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ADD_TO_CART } from '../../../actions/cartAction';
import { FaEye, FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import {
  formatCurrency,
  renderStars,
  calculateOriginalPrice,
} from '../../../utils/configformat';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const priceOptions = [
  { title: 'Dưới 2 triệu', value: '0 - 2000000' },
  { title: 'Từ 2 - 4 triệu', value: '2000000 - 4000000' },
  { title: 'Từ 4 - 7 triệu', value: '4000000 - 7000000' },
  { title: 'Từ 7 - 13 triệu', value: '7000000 - 13000000' },
  { title: 'Từ 13 - 20 triệu', value: '13000000 - 20000000' },
  { title: 'Từ 20 - 32 triệu', value: '20000000 - 32000000' },
  { title: 'Trên 32 triệu', value: '32000000 - 8000000000' },
];

const dataBanners = [
  'src/assets/banner/banner1.jpg',
  'src/assets/banner/banner2.jpg',
  'src/assets/banner/banner3.jpg',
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
  const productsPerPage = 12;

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

  const filteredProducts = products
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
    const productWithQuantity = {
      ...item,
      quantity: 1,
    };

    dispatch(ADD_TO_CART(productWithQuantity));
    toast.success('Đã thêm vào giỏ hàng', {
      autoClose: 1000,
    });

    window.scrollTo(0, 0);
    navigate('/cart');
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-8">
      <div className="container mx-auto px-4 py-5">
        {/* Breadcrumbs */}
        <div className="mb-5">
          <nav className="text-gray-700">
            <Link to="/" className="text-blue-500 hover:underline">
              Trang chủ
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Danh sách sản phẩm</span>
          </nav>
        </div>

        <div className="mb-2 flex flex-col lg:flex-row justify-between items-center">
          <label className="relative block w-full lg:w-auto mb-4 lg:mb-0">
            <input
              className="placeholder-italic placeholder-gray-400 block bg-white border border-gray-300 rounded-md py-2 pl-4 pr-3 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 focus:ring-1 sm:text-sm w-full lg:w-auto"
              placeholder="Tìm tên sản phẩm ..."
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
            />
          </label>

          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto">
            <Menu
              as="div"
              className="relative inline-block text-left w-full lg:w-auto"
            >
              <MenuButton className="inline-flex justify-between w-full lg:w-auto px-3 py-2 text-sm font-sans text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {filters.category
                  ? categories.find((cate) => cate.id === filters.category)
                      ?.name
                  : 'Danh mục'}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-full lg:w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                {categories.map((cateItem) => (
                  <MenuItem
                    key={cateItem.id}
                    as="button"
                    onClick={() => handleFilterChange('category', cateItem.id)}
                  >
                    <span className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      {cateItem.name}
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
                {filters.brand
                  ? brands.find((brand) => brand.id === filters.brand)?.name
                  : 'Thương hiệu'}
                <ChevronDownIcon
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-400"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-full lg:w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                {brands.map((brandItem) => (
                  <MenuItem
                    key={brandItem.id}
                    as="button"
                    onClick={() => handleFilterChange('brand', brandItem.id)}
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
              <MenuItems className="absolute right-0 z-10 mt-2 w-full lg:w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
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
              <MenuItems className="absolute right-0 z-10 mt-2 w-full lg:w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
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
            <div className="w-full lg:w-auto">
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
                className="w-full lg:w-auto bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
              >
                Làm mới
              </button>
            </div>
          </div>
        </div>

        <section className="relative py-6">
          <div className="container mx-auto">
            <Slide>
              <div className="flex flex-row overflow-x-auto">
                {dataBanners.map((banner, index) => (
                  <div
                    key={index}
                    className="w-full h-auto md:w-3/4 lg:w-2/3 xl:w-1/2 px-3"
                  >
                    <div className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="p-2 transform transition-transform duration-500 hover:scale-105">
                        <img
                          className="w-full h-auto rounded-md object-contain"
                          src={banner}
                          alt={`Banner ${index + 1}`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Slide>
          </div>
        </section>

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
                        onClick={() =>
                          goToProductDetail(item.id) & window.scrollTo(0, 0)
                        }
                        className="text-white bg-white p-3 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500"
                      >
                        <FaEye />
                      </button>
                    </li>

                    <li>
                      <button
                        onClick={() => addToCart(item)}
                        className={`text-white p-2 rounded-lg bg-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ${
                          item.quantity === 0
                            ? 'cursor-not-allowed'
                            : 'cursor-pointer'
                        }`}
                        disabled={item.quantity === 0}
                      >
                        Mua sản phẩm
                      </button>
                    </li>
                    <li>
                      <button className="text-white p-3 rounded-lg bg-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
                        <FaHeart />
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <div className="text-gray-500">
                    {renderStars(item.totalRating)}
                  </div>
                  <div className="text-xl font-bold">
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

        <div className="mt-6 flex justify-center">
          <nav className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => {
                  paginate(index + 1);
                  window.scrollTo(0, 0);
                }}
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
