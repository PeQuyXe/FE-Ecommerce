import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Khởi tạo state cho form data
  const [formData, setFormData] = useState({
    title: '',
    brandId: '',
    price: '',
    discount: '',
    isVariant: 0,
    sold: '',
    quantity: '',
    thumb: '',
    totalRatings: '',
    totalUserRatings: '',
    shortDescription: '',
    description: '',
    cateId: '',
    slug: '',
    status: 0,
    view: 0,
    createAt: '',
    updateAt: '',
  });

  // State cho danh sách brand và category
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch product data khi chỉnh sửa (isEdit)
  useEffect(() => {
    if (isEdit && id) {
      fetchProductById(id);
    }
    fetchBrands();
    fetchCategories();
  }, [id, isEdit]);

  // Fetch product by ID
  const fetchProductById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      setFormData(response.data);
    } catch (error) {
      console.error('Failed to fetch product by ID', error);
    }
  };

  // Fetch available brands
  const fetchBrands = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/brand');
      setBrands(response.data);
    } catch (error) {
      console.error('Failed to fetch brands', error);
    }
  };

  // Fetch available categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories', error);
    }
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
    });
  };
  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = isEdit
      ? `http://localhost:8080/api/products/${id}`
      : 'http://localhost:8080/api/products';
    const method = isEdit ? 'put' : 'post';
    console.log(formData);
    try {
      await axios({
        method,
        url: apiUrl,
        data: formData,
      });

      navigate('/admin/products');
    } catch (error) {
      console.error('Failed to save product', error);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold mb-4">
        {isEdit ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm'}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Tên sản phẩm */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Tên sản phẩm
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Thương hiệu */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Thương hiệu
          </label>
          <select
            name="brandId"
            value={formData.brandId}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Chọn thương hiệu</option>
            {brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phân loại
          </label>
          <select
            name="cateId"
            value={formData.cateId}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Chọn phân loại</option>
            {categories.map((cate) => (
              <option key={cate.id} value={cate.id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Giá */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Giảm giá */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Giảm giá
          </label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Mô tả ngắn */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả ngắn
          </label>
          <textarea
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="3"
            required
          />
        </div>

        {/* Mô tả chi tiết */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả chi tiết
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows="6"
          />
        </div>

        {/* Số lượng */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Số lượng
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        {/* Hình ảnh */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hình ảnh (URL)
          </label>
          <input
            type="text"
            name="thumb"
            value={formData.thumb}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        {/* Trạng thái */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleInputChange}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Đang bán</span>
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md"
          >
            {isEdit ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </button>
        </div>
      </form>
    </div>
  );
};

ProductForm.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};

export default ProductForm;
