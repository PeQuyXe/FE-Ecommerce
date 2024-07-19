import { useEffect, useState } from 'react';
import axios from 'axios';
import BannerProduct from './BannerProduct';

const Banner = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/banners')
      .then((response) => setBannerData(response.data))
      .catch((error) => console.error('Lỗi nhận data banner', error));
  }, []);

  console.log(bannerData.cateId);

  return (
    <section className="banner">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
          <div className="lg:pr-8">
            <div>
              <span className="text-secondary inline-flex items-center space-x-2">
                <i className="fas fa-fire"></i>
                <span>{bannerData.title}</span>
              </span>
              <h1 className="text-4xl font-bold">{bannerData.description}</h1>
              <div className="mt-4">
                <a
                  href={`product-category?category=${bannerData.cateId}`}
                  className="btn bg-white text-black flex items-center space-x-2 px-4 py-2 rounded"
                >
                  Khám phá
                  <i className="fal fa-long-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>

          <BannerProduct />
        </div>
      </div>
    </section>
  );
};

export default Banner;
