import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';


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
                  className="bg-white shadow rounded overflow-hidden "
                >
                  <Link to={`news/${newsItem.id}`} className="block">
                    <img
                      src={newsItem.thumb}
                      alt={newsItem.title}
                      className="w-full h-60 hover:scale-105 transition-transform duration-300 ease-in-out"
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">
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
                  <div className="flex mb-4" key={newsItem.id}>
                    <div className="flex-shrink-0 w-24 h-24 mr-4">
                      <Link
                        to={`/news/news/${newsItem.id}`}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <img
                          src={newsItem.thumb}
                          alt={newsItem.title}
                          className="w-full h-full object-cover rounded"
                        />
                      </Link>
                    </div>
                    <div className="flex-1">
                      <h6 className="text-md font-semibold mb-2">
                        <Link
                          to={`/news/news/${newsItem.id}`}
                          className="text-gray-600 hover:underline"
                          onClick={() => window.scrollTo(0, 0)}
                        >
                          {newsItem.title}
                        </Link>
                      </h6>
                      <div className="text-gray-600 text-sm">
                        <ul className="list-disc pl-4">
                          <li>
                            {newsItem.createAt
                              ? new Date(newsItem.createAt).toLocaleDateString(
                                'vi-VN',
                                {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )
                              : ''}
                          </li>
                          <li>{newsItem.view || 0} Lượt xem</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsPage;
