import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faTags } from '@fortawesome/free-solid-svg-icons';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import {
  FaHeadphones,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
} from 'react-icons/fa';
const HomePage = () => {
  const [dataBanner, setDataBanner] = useState([]);
  const [dataCate, setDataCate] = useState([]);
  const [dataProdRecent, setDataProdRecent] = useState([]);
  const [, setDataProdNewDate] = useState([]);
  const [, setDataProdMostSold] = useState([]);
  const [dataProduct, setDataProduct] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          banners,
          categories,
          recentProducts,
          newProducts,
          mostSoldProducts,
          products,
        ] = await Promise.all([
          axios.get('http://localhost:8080/api/banners'),
          axios.get('http://localhost:8080/api/categories'),
          axios.get('http://localhost:8080/api/products/views-product'),
          axios.get('http://localhost:8080/api/products/new_products'),
          axios.get('http://localhost:8080/api/products/products_sold'),
          axios.get('http://localhost:8080/api/products'),
        ]);
        setDataBanner(banners.data);
        setDataCate(categories.data);
        setDataProdRecent(recentProducts.data);
        setDataProdNewDate(newProducts.data);
        setDataProdMostSold(mostSoldProducts.data);
        setDataProduct(products.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {/* Banner Section */}
      <section className="py-6 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 pr-8 mb-4 lg:mb-0">
              {dataBanner.map((item, index) => (
                <div key={index} className="mb-6">
                  <span className="text-xl font-semibold text-gray-500">
                    <FontAwesomeIcon icon={faFire} /> {item.title}
                  </span>
                  <h1 className="text-4xl font-semibold my-4">
                    {item.description}
                  </h1>
                  <Link
                    to={`product-category?category=${item.cateId}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-flex items-center"
                  >
                    Khám phá{' '}
                    <FontAwesomeIcon
                      icon={faLongArrowAltRight}
                      className="ml-2"
                    />
                  </Link>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/2 ">
              <Slide>
                {dataProduct.map((item, index) => (
                  <div key={index} className="relative">
                    <div>
                      <Link to={`product/${item.id}`}>
                        <img
                          src={item.thumb}
                          alt={item.title}
                          className="w-64 h-64 object-cover rounded-md flex flex-col justify-center items-center"
                        />
                      </Link>
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center bg-gray-500 bg-opacity-50 p-4">
                      <h5 className="text-lg font-semibold text-white mb-2">
                        <Link to={`product/${item.id}`}>{item.title}</Link>
                      </h5>
                      <span className="text-white text-xl">
                        {(item.price * 22000).toLocaleString('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        })}
                      </span>
                      <Link
                        to={`product/${item.slug}-${item.id}`}
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
                      >
                        Mua sản phẩm
                      </Link>
                    </div>
                  </div>
                ))}
              </Slide>
            </div>
          </div>
        </div>
      </section>

      {/* Home Category Section */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <span className="text-xl font-semibold text-gray-500">
              <FontAwesomeIcon icon={faTags} /> Danh mục
            </span>
            <h2 className="text-3xl font-bold mt-2">Tìm kiếm theo danh mục</h2>
          </div>
          <Slide {...settings}>
            {dataCate.map((cate, index) => (
              <div key={index} className="px-2">
                <Link
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  to={`product-category?category=${cate.id}`}
                >
                  <div className="p-2 transform transition-transform duration-500 hover:scale-105">
                    <img
                      className="w-20 h-20 object-cover mx-auto"
                      src={`src/assets/category/${cate.image}`}
                      alt={cate.name}
                    />
                    <h6 className="text-lg font-semibold text-center mt-3 mb-4">
                      {cate.name}
                    </h6>
                  </div>
                </Link>
              </div>
            ))}
          </Slide>
        </div>
      </section>

      {/* Home Poster Section */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <div className="mb-6">
                <span className="text-lg font-semibold text-gray-500">
                  <FaHeadphones />
                  Không nên bỏ lỡ!
                </span>
                <h2 className="text-3xl font-bold mt-2">
                  Nâng cao Trải nghiệm Âm nhạc Của Bạn
                </h2>
                <Link
                  to="product-category?category=4"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block mt-4"
                >
                  Kiểm tra ngay!
                </Link>
              </div>
            </div>
            <div className="w-60 h-60 lg:w-1/2 relative">
              <img
                src="src/assets/others/poster-01.png"
                alt="Poster"
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <div className="w-8 h-8 bg-yellow-300 rounded-full animate-ping absolute"></div>
                <div className="w-12 h-12 bg-yellow-400 rounded-full animate-ping absolute"></div>
                <div className="w-16 h-16 bg-yellow-500 rounded-full animate-ping absolute"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Area Section */}
      <section className="py-6 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <span className="text-lg font-semibold text-gray-500">
              <FaShoppingBag /> Lượt xem sản phẩm
            </span>
            <h2 className="text-3xl font-semibold mt-2">
              Sản phẩm được nhiều lượt xem
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 flex-auto">
            {dataProdRecent.map((product) => (
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
                  <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    <FaShoppingCart className="mr-2" /> Mua
                  </button>
                  <button className="bg-gray-200 text-gray-600 px-4 py-2 rounded hover:bg-pink-400">
                    <FaHeart />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link
              to="product-category"
              className="bg-gray-300 text-white px-4 py-2 rounded hover:bg-green-300"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
