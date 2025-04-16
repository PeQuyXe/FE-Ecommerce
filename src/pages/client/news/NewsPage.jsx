import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { MdAccessTime } from 'react-icons/md';

const NewsPage = () => {
  const [dataNews, setDataNews] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsRes = await axios.get('http://localhost:8080/api/news');
        setDataNews(newsRes.data);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-6">
      <div className="container mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="text-blue-500 mb-4">
          <Link to="/" className="hover:underline">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Tin tức</span>
        </nav>

        <div className="flex flex-wrap">
          {/* Main News Content */}
          <div className="lg:w-2/3 w-full pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dataNews.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="bg-white shadow rounded overflow-hidden"
                >
                  <Link to={`news/${newsItem.id}`} className="block">
                    <img
                      src={newsItem.thumb}
                      alt={newsItem.title}
                      className="w-full h-48 object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      <Link
                        to={`news/${newsItem.id}`}
                        className="hover:text-blue-500"
                      >
                        {newsItem.title}
                      </Link>
                    </h3>
                    <div className="text-right mt-3">
                      <Link
                        to={`news/${newsItem.id}`}
                        className="text-blue-500 flex items-center justify-end"
                      >
                        Đọc thêm <FaArrowRight className="ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 w-full pl-4">
            <aside>
              {/* Latest Articles Widget */}
              <div className="bg-white shadow-md rounded p-4 mb-6">
                <h6 className="text-lg font-semibold mb-4">
                  Bài viết mới nhất
                </h6>
                {dataNews.map((newsItem) => (
                  <div key={newsItem.id} className="flex items-center mb-4">
                    <Link to={`news/${newsItem.id}`} className="w-20 h-20">
                      <img
                        src={newsItem.thumb}
                        alt={newsItem.title}
                        className="rounded object-cover w-full h-full"
                      />
                    </Link>
                    <div className="ml-4">
                      <h5 className="font-semibold text-md">
                        <Link
                          to={`news/${newsItem.id}`}
                          className="hover:underline"
                        >
                          {newsItem.title}
                        </Link>
                      </h5>
                      <div className="text-gray-500 text-sm flex items-center space-x-2">
                        <MdAccessTime />{' '}
                        <span>
                          {new Date(newsItem.createAt).toLocaleDateString(
                            'vi-VN'
                          )}
                        </span>
                        <AiOutlineEye /> <span>{newsItem.view} Lượt xem</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* <div className="bg-white shadow-md rounded p-4">
                <h6 className="text-lg font-semibold mb-4">
                  Sản phẩm đã xem gần đây
                </h6>
                <ul>
                  {dataProdRecent.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-center mb-4">
                      <Link to={`product/${item.id}`} className="w-20 h-20">
                        <img
                          src={item.thumb}
                          alt={item.title}
                          className="rounded object-cover w-full h-full"
                        />
                      </Link>
                      <div className="ml-4">
                        <h5 className="font-semibold text-md">
                          <Link
                            to={`product/${item.id}`}
                            className="hover:text-blue-500"
                          >
                            {item.title}
                          </Link>
                        </h5>
                        <span className="text-gray-500">
                          {item.discount && (
                            <del className="text-red-500 mr-2">
                              {item.discount}%
                            </del>
                          )}
                          {item.price.toLocaleString('vi-VN', {
                            style: 'currency',
                            currency: 'VND',
                          })}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div> */}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
