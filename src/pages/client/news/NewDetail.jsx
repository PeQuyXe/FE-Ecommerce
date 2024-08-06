import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const NewDetail = () => {
  const { id } = useParams();
  const [dataNew, setDataNew] = useState({});
  const [dataNews, setDataNews] = useState([]);
  const [dataProdRecent, setDataProdRecent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newRes = await axios.get(`http://localhost:8080/api/news/${id}`);
        const newsRes = await axios.get('http://localhost:8080/api/news');
        const prodRecentRes = await axios.get(
          'http://localhost:8080/api/products-recent'
        );

        setDataNew(newRes.data);
        setDataNews(newsRes.data);
        setDataProdRecent(prodRecentRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <section className="py-6">
      <div className="container mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="container mx-auto mb-4">
          <nav className="text-blue-500">
            <Link to="/" className="hover:underline">
              Trang chủ
            </Link>{' '}
            <span className="mx-2">/</span>
            <span className="text-gray-500">Tin tức</span>
          </nav>
        </div>

        <div className="flex flex-wrap">
          {/* Main News Content */}
          <div className="lg:w-2/3 w-full pr-4">
            <div className="bg-white shadow-md rounded overflow-hidden">
              <div className="relative">
                <img
                  src={dataNew.thumb}
                  alt={dataNew.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{dataNew.title}</h2>
                <div className="text-gray-600 text-sm mb-4">
                  <ul className="list-disc pl-4">
                    <li>
                      {new Date(dataNew.createAt).toLocaleDateString('vi-VN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </li>
                    <li>{dataNew.view} Lượt xem</li>
                  </ul>
                </div>
                <div
                  className="content-description"
                  dangerouslySetInnerHTML={{ __html: dataNew.content }}
                />
              </div>
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
                      <Link to={`news/${newsItem.id}`}>
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
                          to={`news/${newsItem.id}`}
                          className="text-gray-600 hover:underline"
                        >
                          {newsItem.title}
                        </Link>
                      </h6>
                      <div className="text-gray-600 text-sm">
                        <ul className="list-disc pl-4">
                          <li>
                            {new Date(newsItem.createAt).toLocaleDateString(
                              'vi-VN',
                              {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </li>
                          <li>{newsItem.view} Lượt xem</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recently Viewed Products Widget */}
              <div className="bg-white shadow-md rounded p-4">
                <h6 className="text-lg font-semibold mb-4">
                  Sản phẩm đã xem gần đây
                </h6>
                <ul>
                  {dataProdRecent.slice(0, 4).map((item) => (
                    <li className="flex mb-4" key={item.id}>
                      <div className="flex-shrink-0 w-24 h-24 mr-4">
                        <Link to={`product/${item.slug}-${item.id}`}>
                          <img
                            src={item.thumb}
                            alt={item.title}
                            className="w-full h-full object-cover rounded"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <h6 className="text-md font-semibold mb-2">
                          <Link
                            to={`product/${item.slug}-${item.id}`}
                            className="text-blue-600 hover:underline"
                          >
                            {item.title}
                          </Link>
                        </h6>
                        <div className="text-gray-600 text-sm">
                          <span className="block">
                            {item.discount ? (
                              <del className="text-red-500 mr-2">
                                {item.price -
                                  (item.price * item.discount) / 100}
                              </del>
                            ) : null}
                            {item.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewDetail;
