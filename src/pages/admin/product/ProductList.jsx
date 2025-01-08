import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatCurrency } from '../../../utils/configformat';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchProducts(), fetchCategories(), fetchBrands()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/brand');
      setBrands(response.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProduct(null);
    setIsDeleteModalOpen(false);
  };

  const deleteProduct = async () => {
    if (selectedProduct) {
      try {
        await axios.delete(
          `http://localhost:8080/api/products/${selectedProduct.id}`
        );
        closeDeleteModal();
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center py-6">Loading...</div>;
  }

  return (
    <section className="p-8 min-h-screen">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h5 className="text-xl font-semibold text-gray-700">
            Danh sách sản phẩm
          </h5>
          <Link
            to="/admin/products/new"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-2 rounded-lg hover:from-blue-500 hover:to-purple-500 transition duration-300 ease-in-out"
          >
            <span className="flex items-center space-x-2">
              <FaEdit /> <span>Thêm Sản Phẩm</span>
            </span>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead className="bg-indigo-600 text-white uppercase text-sm leading-normal">
              <tr>
                <th className="p-3">Tên sản phẩm</th>
                <th className="p-3">Ngày nhập</th>
                <th className="p-3">Danh mục</th>
                <th className="p-3">Thương hiệu</th>
                <th className="p-3">Tồn kho</th>
                <th className="p-3">Giá</th>
                <th className="p-3">Trạng thái</th>
                <th className="p-3">Hiển thị</th>
                <th className="p-3">Biến thể</th>
                <th className="p-3">Đánh giá</th>
                <th className="p-3">Thực thi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b hover:bg-gray-100 transition duration-300"
                >
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.thumb}
                        alt={product.title}
                        className="w-10 h-10 object-contain rounded"
                      />
                      <span>
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {product.title}
                        </Link>
                      </span>
                    </div>
                  </td>
                  <td className="p-3">
                    {new Date(product.createAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    {categories.find((cat) => cat.id === product.cateId)?.name}
                  </td>
                  <td className="p-3">
                    {brands.find((brand) => brand.id === product.brandId)?.name}
                  </td>
                  <td className="p-3">{product.quantity || 0}</td>
                  <td className="p-3">{formatCurrency(product.price)}</td>
                  <td className="p-3">
                    <span
                      className={`${
                        product.status === 1 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {product.quantity >= 1 && product.status === 1
                        ? 'Đang bán'
                        : 'Dừng bán'}
                    </span>
                  </td>
                  <td className="p-3">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={product.status === 1}
                        readOnly
                      />
                      <span className="slider"></span>
                    </label>
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin/product-variants/${product.id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FaEye /> <span className="ml-1">Xem</span>
                    </Link>
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin/rating-product/${product.id}`}
                      className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                      <FaEye /> <span className="ml-1">Xem</span>
                    </Link>
                  </td>
                  <td className="p-3 flex space-x-3">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-yellow-500 hover:text-yellow-700 flex items-center"
                    >
                      <FaEdit /> <span className="ml-1">Sửa</span>
                    </Link>
                    <button
                      onClick={() => openDeleteModal(product)}
                      className="text-red-500 hover:text-red-700 flex items-center"
                    >
                      <FaTrashAlt /> <span className="ml-1">Xóa</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal xác nhận xóa */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        className="fixed inset-0 flex items-center justify-center z-50 p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
          <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
          <p>Bạn có chắc chắn muốn xóa sản phẩm {selectedProduct?.title}?</p>
          <div className="flex justify-end mt-6 space-x-4">
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
            >
              Hủy
            </button>
            <button
              onClick={deleteProduct}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Xóa
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default ProductList;
