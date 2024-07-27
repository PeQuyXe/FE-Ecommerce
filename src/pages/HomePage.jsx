import { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import { Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import {
  FaTag,
  FaShoppingBag,
  FaHeart,
  FaShoppingCart,
  FaArrowRight,
} from 'react-icons/fa';

const HomePage = () => {
  const [dataCate, setDataCate] = useState([]);
  const [dataProdRecent, setDataProdRecent] = useState([]);
  const [, setDataProdNewDate] = useState([]);
  const [, setDataProdMostSold] = useState([]);
  const [, setDataProduct] = useState([]);
  const dataBanners = [
    'src/assets/banner/banner1.jpg',
    'src/assets/banner/banner2.jpg',
    'src/assets/banner/banner3.jpg',
  ];

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
          axios.get('http://localhost:8080/api/view_product'),
          axios.get('http://localhost:8080/api/new_product'),
          axios.get('http://localhost:8080/api/product_sold'),
          axios.get('http://localhost:8080/api/products'),
        ]);

        setDataCate(category.data);
        setDataProdRecent(recentProducts.data);
        setDataProdNewDate(newProducts.data);
        setDataProdMostSold(mostSoldProducts.data);
        setDataProduct(products.data);
      } catch (error) {
        console.error('Lỗi nhận data trang Home:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Banner*/}
      <section className="relative py-6 bg-gray-100 shadow-md">
        <div className="container mx-auto px-4">
          <Slide>
            {dataBanners.map((banner, index) => (
              <div key={index} className="px-2">
                <div className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-2 transform transition-transform duration-500 hover:scale-105">
                    <img
                      className="w-full mx-auto rounded-md object-cover"
                      src={banner}
                      alt={`Banner ${index + 1}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </Slide>
        </div>
      </section>

      {/*Category */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <span className="text-xl font-FaTag text-gray-500 flex items-center">
              <FaTag className="mr-2" /> Danh mục
            </span>
            <h2 className="text-3xl font-bold mt-2">Tìm kiếm theo danh mục</h2>
          </div>
          <div className="flex flex-wrap -mx-2">
            {dataCate.map((cate) => (
              <div
                key={cate.id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4"
              >
                <Link
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  to={`/product-category?category=${cate.id}`}
                >
                  <div className="p-4 text-center">
                    <img
                      className="w-24 h-24 mx-auto object-cover mb-2"
                      src={`src/assets/category/${cate.image}`}
                      alt={cate.name}
                    />
                    <h6 className="text-lg font-semibold">{cate.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Poster  */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8 hover:bg-slate-300">
              <div className="relative hover:text-red-300">
                <Link to="product-category?category=4" className="block">
                  <img
                    src="src/assets/others/poster-01.png"
                    alt="eTrade promotion poster"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                    <div className="text-white">
                      <h3 className="text-2xl font-bold leading-tight">
                        Âm thanh phong phú
                      </h3>
                      <span className="text-lg mt-2 flex items-center">
                        Bộ sưu tập <FaArrowRight />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-8">
              <div className="relative">
                <Link to="product-category?category=9" className="block">
                  <img
                    src="src/assets/others/poster-02.png"
                    alt="eTrade promotion poster"
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4 flex flex-col justify-end">
                    <div className="text-white">
                      <span className="text-lg">Ưu đãi 50% vào mùa đông</span>
                      <h3 className="text-2xl font-bold mt-2">Nhận kính VR</h3>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Area Section */}
      <section className="py-6 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <span className="text-lg font-semibold text-gray-500 flex items-center">
              <FaShoppingBag className="mr-2" /> Lượt xem sản phẩm
            </span>
            <h2 className="text-3xl font-semibold mt-2">
              Sản phẩm được nhiều lượt xem
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dataProdRecent.map((product) => (
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

                <div className="flex justify-between mt-auto">
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
              to="/product-category"
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
