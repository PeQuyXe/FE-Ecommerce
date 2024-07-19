const dataBannerTitle = {
  title: 'Hot Deals',
  description: 'Discover amazing products at great prices!',
  cate_id: 1,
};

const dataBanner = [
  {
    slug: 'product-1',
    id: 1,
    thumb: 'image-url-1.jpg',
    title: 'Product 1',
    price: 100,
  },
  // Add more products here
];

const dataCate = [
  {
    id: 1,
    image: 'category-image-1.jpg',
    name: 'Category 1',
  },
];

const dataProdRecent = [
  {
    slug: 'recent-product-1',
    id: 1,
    thumb: 'recent-product-image-1.jpg',
    quantity: 10,
    discount: 20,
    price: 100,
    totalRatings: 4.5,
    totalUserRatings: 50,
    title: 'Recent Product 1',
  },
];

const Body = () => {
  return (
    <div>
      <section className="banner py-16">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 pr-8">
              <div>
                <span className="title-highlighter highlighter-secondary">
                  <i className="fas fa-fire"></i>
                  {dataBannerTitle.title}
                </span>
                <h1 className="title">{dataBannerTitle.description}</h1>
                <div className="shop-btn">
                  <a
                    href={`product-category?category=${dataBannerTitle.cate_id}`}
                    className="btn btn-bg-white right-icon"
                  >
                    Khám phá <i className="fal fa-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="slide-banner-thumb">
                {dataBanner.map((item, index) => (
                  <div key={index} className="main-banner-thumb">
                    <div className="banner-product">
                      <div className="thumb">
                        <a href={`product/${item.slug}-${item.id}`}>
                          <img src={item.thumb} alt={item.title} />
                        </a>
                      </div>
                      <div className="content">
                        <h5 className="title">
                          <a href={`product/${item.slug}-${item.id}`}>
                            {item.title}
                          </a>
                        </h5>
                        <div className="product-price-variant">
                          <span className="price">{item.price}</span>
                        </div>
                        <ul className="cart-action">
                          <li className="select-option">
                            <a
                              href={`product/${item.slug}-${item.id}`}
                              className="btn-custom"
                            >
                              Mua sản phẩm
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-category py-16">
        <div className="container mx-auto">
          <div className="title text-center mb-8">
            <span className="title-highlighter highlighter-secondary">
              <i className="far fa-tags"></i> Danh mục
            </span>
            <h2 className="title">Tìm kiếm theo danh mục</h2>
          </div>
          <div className="category flex flex-wrap">
            {dataCate.map((cateItem, index) => (
              <a
                key={index}
                className="category-item"
                href={`product-category?category=${cateItem.id}`}
              >
                <div className="categrie-product">
                  <div className="categorie-link">
                    <img
                      className="img-fluid"
                      src={`public/images/category/${cateItem.image}`}
                      alt={cateItem.name}
                    />
                    <h6 className="cate-title">{cateItem.name}</h6>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-poster py-16">
        <div className="container mx-auto">
          <div className="poster-wrap flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <div className="content">
                <div className="title">
                  <span className="title-highlighter highlighter-secondary">
                    <i className="fal fa-headphones-alt"></i> Không Nên Bỏ Lỡ!!
                  </span>
                  <h2 className="title">
                    Nâng cao Trải nghiệm Âm nhạc Của Bạn
                  </h2>
                </div>
                <a
                  href="product-category?category=4"
                  className="btn-custom btn-bg-primary"
                >
                  Kiểm tra ngay!
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="thumb">
                <img
                  src="public/images/others/poster-03.png"
                  alt="Poster Product"
                />
                <div className="music-singnal">
                  <div className="item-circle circle-1"></div>
                  <div className="item-circle circle-2"></div>
                  <div className="item-circle circle-3"></div>
                  <div className="item-circle circle-4"></div>
                  <div className="item-circle circle-5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-area py-16">
        <div className="container mx-auto">
          <div className="title text-center mb-8">
            <span className="title-highlighter highlighter-secondary">
              <i className="far fa-shopping-basket"></i>Lượt xem sản phẩm
            </span>
            <h2 className="title">Sản phẩm được nhiều lượt xem</h2>
          </div>
          <div className="main-product">
            <div className="flex flex-wrap">
              {dataProdRecent.map((product, index) => (
                <div key={index} className="w-full lg:w-1/3 mb-8 px-3">
                  <div className="product-item">
                    <div className="thumb">
                      <div className="thumb-img">
                        <a
                          className="thumb-link"
                          href={`product/${product.slug}-${product.id}`}
                        >
                          <img src={product.thumb} alt={product.title} />
                        </a>
                        <div className="actions-hover">
                          <ul className="action-list">
                            <li className="quickview">
                              <a
                                className="btn-action"
                                href={`product/${product.slug}-${product.id}`}
                              >
                                <i className="far fa-eye"></i>
                              </a>
                            </li>
                            <li className="select-option">
                              {product.quantity > 0 ? (
                                <a
                                  href={`product/${product.slug}-${product.id}`}
                                  className="btn-action-large"
                                >
                                  Mua sản phẩm
                                </a>
                              ) : (
                                <a
                                  className="btn-action-large disabled"
                                  href="#"
                                >
                                  Sản phẩm hết hàng
                                </a>
                              )}
                            </li>
                            <li className="wishlist">
                              <button className="btn-action">
                                <i className="far fa-heart"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {product.discount !== 0 && (
                        <div className="label-sale">
                          <div className="product-badget">
                            Giảm {product.discount}%
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="content">
                      <div className="inner">
                        <div className="product-rating">
                          <span className="icon">
                            {/* Add a function to render stars based on the rating */}
                          </span>
                          <span className="rating-number">
                            ({product.totalRatings})
                          </span>
                        </div>
                        <h5 className="title">
                          <a href={`product/${product.slug}-${product.id}`}>
                            {product.title}
                          </a>
                        </h5>
                        <div className="product-price-variant">
                          <span className="price">{product.price}</span>
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
    </div>
  );
};

export default Body;
