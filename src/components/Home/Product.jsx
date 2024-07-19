import { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [dataProdRecent, setDataProdRecent] = useState([]);
  const [dataProdNewDate, setDataProdNewDate] = useState([]);
  const [dataProdMostSold, setDataProdMostSold] = useState([]);

  useEffect(() => {
    axios
      .get('/api/products/recent')
      .then((response) => setDataProdRecent(response.data))
      .catch((error) =>
        console.error('Error fetching recent products:', error)
      );

    axios
      .get('/api/products/new-date')
      .then((response) => setDataProdNewDate(response.data))
      .catch((error) =>
        console.error('Error fetching new date products:', error)
      );

    axios
      .get('/api/products/most-sold')
      .then((response) => setDataProdMostSold(response.data))
      .catch((error) =>
        console.error('Error fetching most sold products:', error)
      );
  }, []);

  if (
    !dataProdRecent.length ||
    !dataProdNewDate.length ||
    !dataProdMostSold.length
  )
    return <div>Loading...</div>;

  return (
    <>
      <section className="product-area">
        <div className="container">
          <div className="title">
            <span className="title-highlighter highlighter-secondary">
              <i className="far fa-shopping-basket"></i> Lượt xem sản phẩm
            </span>
            <h2 className="title">Sản phẩm được nhiều lượt xem</h2>
          </div>
          <div className="main-product">
            <div className="row">
              {dataProdRecent.map((item, index) => (
                <div
                  className="col-xl-3 mb-5 col-lg-4 col-sm-6 col-12"
                  key={index}
                >
                  <div className="product-item px-3">
                    <div className="thumb">
                      <div className="thumb-img">
                        <a
                          className="thumb-link"
                          href={`/product/${item.slug}-${item.id}`}
                        >
                          <img
                            data-sal="zoom-out"
                            data-sal-delay="200"
                            data-sal-duration="800"
                            loading="lazy"
                            src={item.thumb}
                            alt={item.title}
                          />
                        </a>
                        <div className="actions-hover">
                          <ul className="action-list mb-0">
                            <li className="quickview">
                              <a
                                className="btn-action"
                                href={`/product/${item.slug}-${item.id}`}
                              >
                                <i className="far fa-eye"></i>
                              </a>
                            </li>
                            <li className="select-option">
                              <a
                                href={`/product/${item.slug}-${item.id}`}
                                className="btn-action-lagre"
                              >
                                Mua sản phẩm
                              </a>
                            </li>
                            <li className="wishlist">
                              <button className="btn-action">
                                <i className="far fa-heart"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {item.discount !== 0 && (
                        <div className="lable-sale">
                          <div className="product-badget">
                            Giảm {item.discount} %
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="content">
                      <div className="inner">
                        <div className="product-rating">
                          <span className="icon">
                            {/* Render stars based on item.totalRatings */}
                          </span>
                          <span className="rating-number">
                            ({item.totalUserRatings})
                          </span>
                        </div>
                        <h5 className="title">
                          <a href={`/product/${item.slug}-${item.id}`}>
                            {item.title}
                          </a>
                        </h5>
                        <div className="product-price-variant">
                          <span className="price current-price">
                            {item.price}
                          </span>
                          {item.discount !== 0 && (
                            <span className="price old-price">
                              {/* Calculate original price */}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="product-area">
        <div className="container">
          <div className="title">
            <span className="title-highlighter highlighter-secondary">
              <i className="far fa-shopping-basket"></i> Sản phẩm mới
            </span>
            <h2 className="title">Sản phẩm mới ra mắt</h2>
          </div>
          <div className="main-product">
            <div className="row">
              {dataProdNewDate.map((item, index) => (
                <div
                  className="col-xl-3 mb-5 col-lg-4 col-sm-6 col-12"
                  key={index}
                >
                  <div className="product-item px-3">
                    <div className="thumb">
                      <div className="thumb-img">
                        <a
                          className="thumb-link"
                          href={`/product/${item.slug}-${item.id}`}
                        >
                          <img
                            data-sal="zoom-out"
                            data-sal-delay="200"
                            data-sal-duration="800"
                            loading="lazy"
                            src={item.thumb}
                            alt={item.title}
                          />
                        </a>
                        <div className="actions-hover">
                          <ul className="action-list mb-0">
                            <li className="quickview">
                              <a
                                className="btn-action"
                                href={`/product/${item.slug}-${item.id}`}
                              >
                                <i className="far fa-eye"></i>
                              </a>
                            </li>
                            <li className="select-option">
                              <a
                                href={`/product/${item.slug}-${item.id}`}
                                className="btn-action-lagre"
                              >
                                Mua sản phẩm
                              </a>
                            </li>
                            <li className="wishlist">
                              <button className="btn-action">
                                <i className="far fa-heart"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {item.discount !== 0 && (
                        <div className="lable-sale">
                          <div className="product-badget">
                            Giảm {item.discount} %
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="content">
                      <div className="inner">
                        <div className="product-rating">
                          <span className="icon">
                            {/* Render stars based on item.totalRatings */}
                          </span>
                          <span className="rating-number">
                            ({item.totalUserRatings})
                          </span>
                        </div>
                        <h5 className="title">
                          <a href={`/product/${item.slug}-${item.id}`}>
                            {item.title}
                          </a>
                        </h5>
                        <div className="product-price-variant">
                          <span className="price current-price">
                            {item.price}
                          </span>
                          {item.discount !== 0 && (
                            <span className="price old-price">
                              {/* Calculate original price */}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="product-area">
        <div className="container">
          <div className="title">
            <span className="title-highlighter highlighter-secondary">
              <i className="far fa-shopping-basket"></i> Bán chạy nhất
            </span>
            <h2 className="title">Sản phẩm bán chạy nhất</h2>
          </div>
          <div className="main-product">
            <div className="row">
              {dataProdMostSold.map((item, index) => (
                <div
                  className="col-xl-3 mb-5 col-lg-4 col-sm-6 col-12"
                  key={index}
                >
                  <div className="product-item px-3">
                    <div className="thumb">
                      <div className="thumb-img">
                        <a
                          className="thumb-link"
                          href={`/product/${item.slug}-${item.id}`}
                        >
                          <img
                            data-sal="zoom-out"
                            data-sal-delay="200"
                            data-sal-duration="800"
                            loading="lazy"
                            src={item.thumb}
                            alt={item.title}
                          />
                        </a>
                        <div className="actions-hover">
                          <ul className="action-list mb-0">
                            <li className="quickview">
                              <a
                                className="btn-action"
                                href={`/product/${item.slug}-${item.id}`}
                              >
                                <i className="far fa-eye"></i>
                              </a>
                            </li>
                            <li className="select-option">
                              <a
                                href={`/product/${item.slug}-${item.id}`}
                                className="btn-action-lagre"
                              >
                                Mua sản phẩm
                              </a>
                            </li>
                            <li className="wishlist">
                              <button className="btn-action">
                                <i className="far fa-heart"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {item.discount !== 0 && (
                        <div className="lable-sale">
                          <div className="product-badget">
                            Giảm {item.discount} %
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="content">
                      <div className="inner">
                        <div className="product-rating">
                          <span className="icon">
                            {/* Render stars based on item.totalRatings */}
                          </span>
                          <span className="rating-number">
                            ({item.totalUserRatings})
                          </span>
                        </div>
                        <h5 className="title">
                          <a href={`/product/${item.slug}-${item.id}`}>
                            {item.title}
                          </a>
                        </h5>
                        <div className="product-price-variant">
                          <span className="price current-price">
                            {item.price}
                          </span>
                          {item.discount !== 0 && (
                            <span className="price old-price">
                              {/* Calculate original price */}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-lg-12 text-center mt--20 mt_sm--0">
                <a
                  href="/product-category"
                  className="btn-custom btn-bg-lighter"
                >
                  Xem tất cả
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
