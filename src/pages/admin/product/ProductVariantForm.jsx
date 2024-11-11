import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductVariantForm = () => {
  const { prodId, variantId } = useParams();
  const navigate = useNavigate();
  const [variant, setVariant] = useState({
    attributeValue: '',
    nameValueAttribute: '',
    quantity: '',
    price: '',
    salePrice: '',
  });

  useEffect(() => {
    if (variantId) {
      fetchVariantDetails();
    }
    // eslint-disable-next-line
  }, [variantId]);

  const fetchVariantDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product-variants/${variantId}`
      );
      setVariant(response.data);
    } catch (error) {
      console.error('Error fetching variant details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (variantId) {
        await axios.put(
          `http://localhost:8080/api/product-variants/${variantId}`,
          variant
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/product-variants/${prodId}`,
          variant
        );
      }
      navigate(`/admin/product-variants/${prodId}`);
    } catch (error) {
      console.error('Error saving variant:', error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">
        {variantId ? 'Cập nhật biến thể sản phẩm' : 'Thêm biến thể sản phẩm'}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-6">
          <label className="block text-gray-600">Kết hợp</label>
          <input
            type="text"
            value={variant.attributeValue}
            onChange={(e) =>
              setVariant({ ...variant, attributeValue: e.target.value })
            }
            className="w-full border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600">Tên biến thể</label>
          <input
            type="text"
            value={variant.nameValueAttribute}
            onChange={(e) =>
              setVariant({ ...variant, nameValueAttribute: e.target.value })
            }
            className="w-full border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600">Số lượng</label>
          <input
            type="number"
            value={variant.quantity}
            onChange={(e) =>
              setVariant({ ...variant, quantity: e.target.value })
            }
            className="w-full border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600">Giá</label>
          <input
            type="number"
            value={variant.price}
            onChange={(e) => setVariant({ ...variant, price: e.target.value })}
            className="w-full border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600">Giá sale</label>
          <input
            type="number"
            value={variant.salePrice || ''}
            onChange={(e) =>
              setVariant({ ...variant, salePrice: e.target.value })
            }
            className="w-full border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {variantId ? 'Cập nhật biến thể' : 'Thêm biến thể'}
        </button>
      </form>
    </div>
  );
};

export default ProductVariantForm;
