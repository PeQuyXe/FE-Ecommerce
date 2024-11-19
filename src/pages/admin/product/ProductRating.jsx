import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTrashAlt, FaSpinner } from 'react-icons/fa';

const ProductRatings = () => {
  const { prodId } = useParams();
  const [ratings, setRatings] = useState([]);
  const [deleteRatingId, setDeleteRatingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRatings();
    // eslint-disable-next-line
  }, [prodId]);

  const fetchRatings = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(
        `http://localhost:8080/api/ratings/${prodId}`
      );
      setRatings(response.data);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setError('Không thể tải danh sách đánh giá. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRating = async () => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:8080/api/ratings/${deleteRatingId}`);
      setRatings(ratings.filter((rating) => rating.id !== deleteRatingId));
      setDeleteRatingId(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting rating:', error);
      setError('Không thể xóa đánh giá. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteRatingId(id);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeleteRatingId(null);
  };

  return (
    <section className="container mx-auto py-6 px-4">
      <div className="bg-white p-8 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            {ratings.length > 0
              ? 'Đánh giá sản phẩm'
              : 'Sản phẩm chưa có đánh giá'}
          </h2>
          {loading && <FaSpinner className="animate-spin text-gray-500" />}
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="overflow-x-auto">
          <table className="w-full text-left bg-white border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
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
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={rating.user.avatar}
                      alt={rating.user.fullname}
                      className="w-8 h-8 rounded-full mr-2"
                    />
                    {rating.user.fullname}
                  </td>
                  <td className="px-4 py-2">{rating.product.title}</td>
                  <td className="px-4 py-2 text-yellow-400">
                    {'★'.repeat(rating.star)}
                  </td>
                  <td className="px-4 py-2 max-w-xs truncate">
                    {rating.comment}
                  </td>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={rating.status === 1}
                      readOnly
                      className="form-checkbox h-5 w-5 text-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => openDeleteModal(rating.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h5 className="text-lg font-bold mb-4">
              Bạn có chắc chắn muốn xóa?
            </h5>
            <p className="text-gray-700 mb-6">
              Nếu thực hiện đồng ý xóa, bạn sẽ không thể khôi phục lại đánh giá
              này.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleDeleteRating}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                {loading ? <FaSpinner className="animate-spin" /> : 'Đồng ý'}
              </button>
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Hủy bỏ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductRatings;
