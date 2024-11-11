import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ProductRatings = () => {
  const { prodId } = useParams();
  const [ratings, setRatings] = useState([]);
  const [deleteRatingId, setDeleteRatingId] = useState(null);

  // Lấy danh sách đánh giá khi component được mount
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/ratings/${prodId}`)
      .then((response) => {
        setRatings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching ratings:', error);
      });
  }, [prodId]);

  // Xóa đánh giá
  const handleDeleteRating = () => {
    axios
      .delete(`http://localhost:8080/api/ratings/${deleteRatingId}`)
      .then(() => {
        // Xóa đánh giá khỏi danh sách hiển thị
        setRatings(ratings.filter((rating) => rating.id !== deleteRatingId));
        setDeleteRatingId(null); // Reset id cần xóa
      })
      .catch((error) => {
        console.error('Error deleting rating:', error);
      });
  };

  // Hiển thị đánh giá
  return (
    <section className="product-wrap">
      <div className="card">
        <div className="title-header">
          {ratings.length > 0 ? (
            <h5 className="title">Đánh giá sản phẩm</h5>
          ) : (
            <h5 className="title">Sản phẩm chưa có đánh giá</h5>
          )}
        </div>

        <div className="table-custom">
          <table className="theme-table w-full text-left">
            <thead>
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Tên khách hàng</th>
                <th className="px-4 py-2">Tên sản phẩm</th>
                <th className="px-4 py-2">Xếp hạng</th>
                <th className="px-4 py-2">Đánh giá</th>
                <th className="px-4 py-2">Ẩn</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {ratings.map((rating, index) => (
                <tr key={rating.id} className="border-b">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">
                      <img
                        src={rating.avatar}
                        alt={rating.fullname}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <div>{rating.fullname}</div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{rating.title}</td>
                  <td className="px-4 py-2 text-yellow-400">
                    {'★'.repeat(rating.star)} {/* Render sao */}
                  </td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {rating.comment}
                  </td>
                  <td className="px-4 py-2">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={rating.status === 1}
                        onChange={() => {}}
                        disabled
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => setDeleteRatingId(rating.id)}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteConfirm"
                      className="btn btn-danger"
                    >
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      <div
        className="modal fade theme-modal"
        id="deleteConfirm"
        aria-hidden="true"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content py-3">
            <div className="modal-header border-0 text-center">
              <h5 className="modal-title w-100">Bạn đã chắc chắn chưa?</h5>
              <button
                type="button"
                className="btn-close-custom"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <p className="mb-0 text-center">
                Nếu thực hiện đồng ý xoá bạn sẽ bị xoá vĩnh viễn không thể khôi
                phục lại hãy suy nghĩ thật kĩ trước khi xoá.
              </p>
            </div>
            <div className="modal-footer border-0">
              <button
                onClick={handleDeleteRating}
                className="btn btn-danger fw-bold"
              >
                Đồng ý
              </button>
              <button
                type="button"
                className="btn btn-secondary fw-bold"
                data-bs-dismiss="modal"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductRatings;
