import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ProductVariantPage = () => {
  const { prodId } = useParams();
  const [variants, setVariants] = useState([]);
  const [productTitle, setProductTitle] = useState('');

  useEffect(() => {
    fetchProductVariants();
    fetchProductDetails();
    // eslint-disable-next-line
  }, [prodId]);

  const fetchProductVariants = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product-variants/${prodId}`
      );
      setVariants(response.data);
    } catch (error) {
      console.error('Error fetching product variants:', error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${prodId}`
      );
      setProductTitle(response.data.title);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleDelete = async (variantId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa biến thể này?')) {
      try {
        await axios.delete(
          `http://localhost:8080/api/product-variants/${variantId}`
        );
        fetchProductVariants();
      } catch (error) {
        console.error('Error deleting variant:', error);
      }
    }
  };

  // const handleSave = async (variant) => {
  //   try {
  //     await axios.put(
  //       `http://localhost:8080/api/product-variants/${variant.productVariant.id}`,
  //       variant
  //     );
  //     fetchProductVariants();
  //   } catch (error) {
  //     console.error('Error updating variant:', error);
  //   }
  // };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6">
        Thông tin sản phẩm: {productTitle}
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Biến thể sản phẩm</h3>
        <Link
          to={`/admin/add-product-variants/${prodId}`}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 inline-block"
        >
          Thêm biến thể mới
        </Link>

        {variants.length === 0 ? (
          <p className="text-center">Chưa có biến thể...</p>
        ) : (
          <div>
            {variants.map((variant, index) => (
              <div
                key={`${variant.productVariant.id}-${index}`}
                className="border-b py-4"
              >
                <div className="flex justify-between items-center">
                  <div className="w-1/3">
                    <label className="block text-gray-600">Kết hợp</label>
                    <input
                      type="text"
                      value={variant.variantValues
                        .map((value) => value.attributeValue.valueName.trim())
                        .join(', ')}
                      disabled
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div className="w-1/6">
                    <label className="block text-gray-600">Số lượng</label>
                    <input
                      type="number"
                      value={variant.productVariant.quantity}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v, i) =>
                            i === index
                              ? {
                                  ...v,
                                  productVariant: {
                                    ...v.productVariant,
                                    quantity: e.target.value,
                                  },
                                }
                              : v
                          )
                        )
                      }
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div className="w-1/6">
                    <label className="block text-gray-600">Giá</label>
                    <input
                      type="number"
                      value={variant.productVariant.price}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v, i) =>
                            i === index
                              ? {
                                  ...v,
                                  productVariant: {
                                    ...v.productVariant,
                                    price: e.target.value,
                                  },
                                }
                              : v
                          )
                        )
                      }
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div className="w-1/6">
                    <label className="block text-gray-600">Giá sale</label>
                    <input
                      type="number"
                      value={variant.sale_price || ''}
                      onChange={(e) =>
                        setVariants(
                          variants.map((v, i) =>
                            i === index
                              ? { ...v, sale_price: e.target.value }
                              : v
                          )
                        )
                      }
                      className="w-full border-gray-300 rounded-lg px-4 py-2"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/admin/edit-product-variant/${variant.productVariant.id}`}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    >
                      Cập nhật
                    </Link>
                    <button
                      onClick={() => handleDelete(variant.productVariant.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductVariantPage;
