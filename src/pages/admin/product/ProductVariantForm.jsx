import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductVariantForm = () => {
  const { id, variantId } = useParams();
  const navigate = useNavigate();

  const [variant, setVariant] = useState({
    quantity: '',
    price: '',
    salePrice: '',
  });

  const [productTitle, setProductTitle] = useState('');
  const [attributes, setAttributes] = useState({});

  useEffect(() => {
    if (variantId) fetchVariantDetails();
    fetchProductTitle();
    fetchAttributes();
    // eslint-disable-next-line
  }, [variantId, id]);

  const fetchProductTitle = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/products/${id}`);
      setProductTitle(response.data.title);
    } catch (error) {
      console.error('Lỗi khi lấy tiêu đề sản phẩm:', error);
    }
  };

  // 🔵 Lấy thuộc tính sản phẩm từ API
  const fetchAttributes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/variants/attributes`);
      const attributeData = response.data;

      if (!Array.isArray(attributeData)) {
        throw new Error("Dữ liệu API không hợp lệ!");
      }

      const newAttributes = {};
      attributeData.forEach((attr) => {
        if (!attr.name || !Array.isArray(attr.values)) {
          console.warn("Lỗi thuộc tính không hợp lệ:", attr);
          return;
        }
        newAttributes[attr.name] = attr.values.map((value) => value.valueName);
      });

      console.log("Attributes:", newAttributes);
      setAttributes(newAttributes);
    } catch (error) {
      console.error("Lỗi khi lấy thuộc tính sản phẩm:", error);
    }
  };

  const fetchVariantDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product-variants/${variantId}`);
      setVariant(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết biến thể:', error);
    }
  };
  console.log('Variant:', variant);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (variantId) {
        await axios.put(`http://localhost:8080/api/product-variants/${variantId}`, variant);
      } else {
        await axios.post(`http://localhost:8080/api/product-variants/${id}`, variant);
      }
      navigate(`/admin/product-variants/${id}`);
    } catch (error) {
      console.error('Lỗi khi lưu biến thể:', error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-6 md:px-12 lg:px-20">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
        {variantId ? 'Cập nhật biến thể sản phẩm' : 'Thêm biến thể sản phẩm'}
      </h2>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
        {/* Hiển thị tên sản phẩm */}
        <div className="mb-4">
          <label className="text-gray-600 mb-2 block">Tên sản phẩm*</label>
          <input
            type="text"
            value={productTitle}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
        </div>

        {/* Render động thuộc tính từ API */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-600 mb-2 block">Thuộc tính sản phẩm</label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {Object.entries(attributes).map(([key, values]) => (
                <div key={key} className="flex flex-col">
                  <span className="capitalize">{key} (Chọn {key})</span>
                  {values.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={key}
                        value={option}
                        checked={variant[key] === option}
                        onChange={(e) => setVariant({ ...variant, [key]: e.target.value })}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nhập số lượng, giá và giá sale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Số lượng</label>
            <input
              type="number"
              value={variant.quantity}
              onChange={(e) => setVariant({ ...variant, quantity: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Giá</label>
            <input
              type="number"
              value={variant.price}
              onChange={(e) => setVariant({ ...variant, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Giá sale</label>
          <input
            type="number"
            value={variant.salePrice || ''}
            onChange={(e) => setVariant({ ...variant, salePrice: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          {variantId ? 'Cập nhật biến thể' : 'Thêm biến thể'}
        </button>
      </form>
    </div>
  );
};

export default ProductVariantForm;
