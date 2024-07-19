import { useEffect, useState } from 'react';
import axios from 'axios';

const BannerProducts = () => {
  const [dataBanner, setDataBanner] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/products')
      .then((response) => setDataBanner(response.data))
      .catch((error) => console.error('Lỗi nhận :', error));
  }, []);

  if (!dataBanner.length) return <div>Loading...</div>;

  return (
    <div className="slide-banner-thumb">
      {dataBanner.map((item, index) => (
        <div className="mian-banner-thumb" key={index}>
          <div className="banner-product">
            <div className="thumb">
              <a href={`/product/${item.slug}-${item.id}`}>
                <img
                  data-sal="zoom-out"
                  data-sal-delay="200"
                  data-sal-duration="500"
                  src={item.thumb}
                  alt={item.title}
                />
              </a>
            </div>
            <div className="content">
              <h5 className="title">
                <a href={`/product/${item.slug}-${item.id}`}>{item.title}</a>
              </h5>
              <div className="product-price-variant">
                <span className="price">{item.price}</span>
              </div>
              <ul className="cart-action">
                <li className="select-option">
                  <a
                    href={`/product/${item.slug}-${item.id}`}
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
  );
};

export default BannerProducts;
