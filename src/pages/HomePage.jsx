import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai';
import useScrollRestoration from '../hooks/useScrollRestoration';
import {
  FaEye,
  FaTag,
  FaShoppingBag,
  FaHeart,
  FaArrowRight,
  FaArrowLeft,
  FaHeadphones,
} from 'react-icons/fa';
import { renderStars, formatCurrency } from '../utils/configformat';
import { useNavigate } from 'react-router-dom';
import { calculateOriginalPrice } from '../utils/configformat';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites } from '../reducer/favoritesSlice';

const HomePage = () => {
  useScrollRestoration();
  const [dataCate, setDataCate] = useState([]);
  const [dataProdRecent, setDataProdRecent] = useState([]);
  const [dataProdNewDate, setDataProdNewDate] = useState([]);
  const [, setDataProdMostSold] = useState([]);
  const [, setDataProduct] = useState([]);
  const navigate = useNavigate();
  const dataBanners = [
    'src/assets/banner/banner5.jpg',
    'src/assets/banner/banner7.jpg',
    // 'src/assets/banner/banner7.jpg',
  ];
  const handleProductClick = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          category,
          recentProducts,
          newProducts,
          mostSoldProducts,
          products,
        ] = await Promise.all([
          axios.get('http://localhost:8080/api/category'),
          axios.get('http://localhost:8080/api/products/top-viewed'),
          axios.get('http://localhost:8080/api/products/new'),
          axios.get('http://localhost:8080/api/products/top-sold'),
          axios.get('http://localhost:8080/api/products'),
        ]);

        setDataCate(category.data);
        setDataProdRecent(recentProducts.data);
        setDataProdNewDate(newProducts.data);
        setDataProdMostSold(mostSoldProducts.data);
        setDataProduct(products.data);
      } catch (error) {
        error('Lỗi nhận data trang Home:', error);
      }
    };

    fetchData();
  }, []);

  const goToProductDetail = (productId) => {
    navigate(`/product/${productId}`);
  };

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

  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 6;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - itemsPerPage, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + itemsPerPage, dataCate.length - itemsPerPage)
    );
  };

  const visibleItems = dataCate.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div>
      {/* Banner*/}
      <section className="relative py-10">
        <div className="container mx-auto ">
          <Slide>
            <div className="flex flex-row overflow-x-auto">
              {dataBanners.map((banner, index) => (
                <div
                  key={index}
                  className="w-full h-auto md:w-3/4 lg:w-2/3 xl:w-1/2 px-3"
                >
                  <div className="block rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ">
                    <div className="p-2 transform transition-transform duration-500 hover:scale-105">
                      <img
                        className=" w-full h-auto rounded-md object-contain "
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
      <section className="py-4">
        <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 mb-8">
          {[
            { src: 'src/assets/intro/intro1.jpg', text: 'Miễn phí ship' },
            { src: 'src/assets/intro/intro2.jpg', text: 'Hàng ngàn ưu đãi' },
            {
              src: 'src/assets/intro/intro3.jpg',
              text: 'Hàng chính hãng 100%',
            },
            { src: 'src/assets/intro/intro4.jpg', text: 'Trả hàng miễn phí' },
            { src: 'src/assets/icons/service10.png', text: 'Hỗ trợ 24/7' },
            { src: 'src/assets/intro/intro6.jpg', text: 'Giá rẻ nhất' },
            { src: 'src/assets/intro/intro7.jpg', text: 'Bảo hành 12 tháng' },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4  border border-gray-200 rounded-lg shadow-sm transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              <div className="text-center">
                <div className="mb-4">
                  <img
                    src={item.src}
                    alt={`Service ${index + 1}`}
                    className="w-14 h-14 mx-auto object-contain"
                  />
                </div>
                <h6 className="text-base font-semibold text-gray-700">
                  {item.text}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className=" py-2 font-bold ">
        <div className="container mx-auto mt-2">
          <div className="mb-6">
            <div className="justify-between text-xl font-semibold text-red-500 flex items-center">
              <div className="flex items-center">
                <FaTag className="mr-2" /> Danh mục
              </div>

              <div className="flex justify-end items-center space-x-4 mt-1">
                <button
                  className="slide-arrow prev-arrow relative outline-none w-[50px] h-[50px] bg-lighter text-body border-none rounded-[6px] z-[2] flex items-center justify-center"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                >
                  <FaArrowLeft />
                  <div className="absolute inset-0 bg-lighter rounded-[6px] z-[-1] transition-transform duration-500 ease-in-out hover:scale-[1.1]"></div>
                </button>
                <button
                  className="slide-arrow next-arrow relative outline-none w-[50px] h-[50px] bg-lighter text-body border-none rounded-[6px] z-[2] flex items-center justify-center"
                  onClick={handleNext}
                  disabled={currentIndex + itemsPerPage >= dataCate.length}
                >
                  <FaArrowRight />
                  <div className="absolute inset-0 bg-lighter rounded-[6px] z-[-1] transition-transform duration-500 ease-in-out hover:scale-[1.1]"></div>
                </button>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-400">
              Tìm kiếm theo danh mục
            </h2>
          </div>

          <div className="category flex flex-wrap -mx-auto relative">
            {visibleItems.map((cateItem) => (
              <Link
                key={cateItem.id}
                className="category-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-[15px] mb-[30px] cursor-pointer"
                to={`category/${cateItem.id}`}
                onClick={() => {
                  window.scrollTo(0, 0);
                }}
              >
                <div className="p-[28px] text-center rounded-lg shadow-lg transition-transform duration-400 ease-in-out hover:scale-[1.2] relative mt-[20px] min-w-[120px]">
                  <div className="categorie-link">
                    <img
                      className="mx-auto mb-[8px] h-[41px] max-w-[64px] object-contain"
                      src={`src/assets/category/${cateItem.image}`}
                      alt={cateItem.name}
                    />
                    <h6 className="cate-title mb-0 text-[16px] leading-[24px]">
                      {cateItem.name}
                    </h6>
                  </div>
                  <div className="absolute inset-0 border border-[#f0f0f0] rounded-[4px] z-[-1] transition-transform duration-400 ease-in-out hover:scale-[1.2]"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8">
              <div className="relative hover:scale-105 transform transition-transform duration-300">
                <Link
                  to="category/4"
                  className="block relative"
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  <img
                    src="src/assets/others/poster-01.png"
                    alt="eTrade promotion poster"
                    className="w-full h-auto object-cover rounded-lg transition-opacity duration-300 hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold leading-tight">
                        Âm thanh phong phú
                      </h3>
                      <span className="text-lg mt-2 flex items-center">
                        Các sản phẩm với chất lượng âm thanh tốt nhất
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-8">
              <div className="relative hover:scale-105 transform transition-transform duration-300">
                <Link
                  to="category/9"
                  className="block relative"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <img
                    src="src/assets/others/poster-02.png"
                    alt="eTrade promotion poster"
                    className="w-full h-auto object-cover rounded-lg transition-opacity duration-300 hover:opacity-75"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white">
                      <span className="text-lg">Ưu đãi 50% vào mùa đông</span>
                      <h3 className="text-2xl font-bold mt-2">
                        Nhận kính VR miễn phí
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Area Section */}
      <section className="py-6">
        <div className="container mx-auto">
          <div className="p-4 md:p-0">
            <div className="mb-6">
              <div className="text-xl font-semibold text-red-500 flex items-center mb-2">
                <FaShoppingBag className="mr-2" /> Sản Phẩm
              </div>
              <h2 className="text-2xl font-bold text-gray-400">
                Các sản phẩm bán chạy
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dataProdRecent.length > 0 ? (
              dataProdRecent.map((item) => (
                <div
                  key={item.id}
                  className=" p-4 rounded-lg shadow-md relative flex flex-col justify-between h-full"
                >
                  <Link to={`product/${item.id}`} className="block">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-40 object-contain p-2 transform-gpu transition-transform duration-500 hover:scale-100"
                      onClick={() => {
                        window.scrollTo(0, 0);
                      }}
                    />
                    {item.discount !== 0 && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded">
                        Giảm {item.discount}%
                      </div>
                    )}
                  </Link>

                  <div className="absolute inset-0  bg-opacity-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <ul className="flex space-x-2">
                      <li>
                        <button
                          onClick={() =>
                            goToProductDetail(item.id) & window.scrollTo(0, 0)
                          }
                          className="text-white bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 p-3 rounded-lg"
                        >
                          <FaEye />
                        </button>
                      </li>

                      <li>
                        <button
                          onClick={() =>
                            addToCart(item) & window.scrollTo(0, 0)
                          }
                          className={`text-white p-2 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 ${item.quantity === 0
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
                    <h3 className="text-lg font-semibold line-clamp-2">{item.title}</h3>
                    <div className="text-gray-500">
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


          <div className="flex justify-center mt-10 mb-4">
            <Link
              to="/product"
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out font-medium"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Xem Thêm
            </Link>
          </div>
        </div>
      </section>
      {/* Poster  */}
      <section className="py-6">
        <div className="container mx-auto">
          <div className="poster-wrap ">
            <div className="flex flex-row items-center ml-10">
              <div className="lg:w-7/12 md:w-full">
                <div className="p-4 md:p-0">
                  <div className="mb-6">
                    <div className="text-2xl font-semibold text-red-500 flex items-center mb-2">
                      <FaHeadphones className="mr-2" /> Không nên bỏ lỡ
                    </div>
                    <h2 className="text-2xl font-bold text-gray-400">
                      Nâng cao trải nghiệm âm nhạc của bạn
                    </h2>
                  </div>
                  <Link
                    to="category/4"
                    className="font-semibold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white px-5 py-2 rounded-full flex items-center text-lg shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out w-max"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Kiểm tra!
                  </Link>
                </div>
              </div>
              <div className="lg:w-4/12 md:w-full">
                <div className="relative">
                  <img
                    src="src/assets/others/poster-03(1).png"
                    alt="Poster Product"
                    className="w-full h-auto object-contain rounded-lg transition-opacity duration-400 hover:ease-in-out hover:scale-[1.2]"
                  />
                  <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center pointer-events-none">
                    <div className="music-signal flex items-end gap-1">
                      <div className="bg-blue-500 w-1 h-10 rounded animate-wave1"></div>
                      <div className="bg-green-500 w-1 h-8 rounded animate-wave2"></div>
                      <div className="bg-red-500 w-1 h-6 rounded animate-wave3"></div>
                      <div className="bg-orange-500 w-1 h-8 rounded animate-wave2"></div>
                      <div className="bg-gray-500 w-1 h-10 rounded animate-wave1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Product Section */}
      <section className="most-sold-product py-8 ">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <div className="text-2xl font-semibold text-red-500 flex items-center mb-2">
              <FaHeadphones className="mr-2" /> Sản Phẩm
            </div>
            <h2 className="text-2xl font-bold text-gray-400">
              Các sản phẩm mới
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dataProdNewDate.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className=" shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-105"
              >
                {/* Hình ảnh sản phẩm */}
                <div className="relative">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={handleProductClick}
                  >
                    <img
                      className="w-full h-40 object-contain transition duration-300 ease-in-out transform hover:scale-105"
                      src={product.thumb}
                      alt={product.title}
                    />
                  </Link>
                </div>

                {/* Nội dung sản phẩm */}
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <span className="flex items-center text-yellow-500">
                      {renderStars(product.totalRating)}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">
                      {product.totalUserRatings} Đánh giá
                    </span>
                  </div>
                  <h6 className="text-gray-800 text-lg font-semibold truncate  hover:text-orange-500 transition duration-300 ease-in-out">
                    <Link
                      to={`/product/${product.id}`}
                      onClick={handleProductClick}
                    >
                      {product.title}
                    </Link>
                  </h6>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-lg text-red-500 font-bold">
                      {formatCurrency(product.price)} ₫
                    </span>
                    {product.discount !== 0 && (
                      <span className="text-gray-400 text-sm line-through">
                        {formatCurrency(
                          product.price / (1 - product.discount / 100)
                        )}{' '}
                        ₫
                      </span>
                    )}
                  </div>
                </div>

                {/* Nút chức năng */}
                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                  <Link
                    to={`/product/${product.id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    onClick={handleProductClick}
                  >
                    <AiOutlineShoppingCart size={20} />
                  </Link>
                  <button
                    onClick={() =>
                      toggleFavorite(product)
                    }
                    className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200">
                    <AiOutlineHeart size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
