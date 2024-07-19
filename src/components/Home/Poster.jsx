import { Link } from 'react-router-dom';

const Poster = () => {
  return (
    <section className="home-poster">
      <div className="container">
        <div className="poster-wrap">
          <div className="row align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="content">
                <div className="title">
                  <span className="title-highlighter highlighter-secondary">
                    <i className="fal fa-headphones-alt"></i> Không Nên Bỏ Lỡ!!
                  </span>
                  <h2 className="title">
                    Nâng cao Trải nghiệm Âm nhạc Của Bạn
                  </h2>
                </div>
                <Link
                  to="/product-category?category=4"
                  className="btn btn-primary"
                >
                  Kiểm tra ngay!
                </Link>
              </div>
            </div>
            <div className="col-xl-7 col-lg-6 ml-10">
              <div className="thumb">
                <img src="../../../assets/bg/bg-images-13.png" alt="Poster " />
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
      </div>
    </section>
  );
};

export default Poster;
