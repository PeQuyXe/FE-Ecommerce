import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductVariantPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [updatedVariants, setUpdatedVariants] = useState([]); // Lưu trạng thái thay đổi
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState(null);

  // Fetch product and variants data on mount
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.get(
          `http://localhost:8080/api/products/${id}`
        );
        setProduct(productResponse.data);

        const variantsResponse = await axios.get(
          `http://localhost:8080/api/product-variants/${id}`
        );
        setVariants(variantsResponse.data);

        // Cập nhật initial state cho updatedVariants từ dữ liệu ban đầu
        setUpdatedVariants(
          variantsResponse.data.map((variant) => ({
            id: variant.productVariant.id,
            quantity: variant.productVariant.quantity,
            price: variant.productVariant.price,
            salePrice: variant.salePrice,
          }))
        );
      } catch (error) {
        console.error('Error fetching product and variants:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductData();
  }, [id]);

  // Handle variant update (chỉ cập nhật state local, không gửi yêu cầu lên server ngay lập tức)
  const handleVariantChange = (variantId, field, value) => {
    // Nếu giá trị trống (value là một chuỗi rỗng), ta sẽ gán giá trị là null hoặc 0 tùy thuộc vào trường hợp
    const newValue =
      value === '' // kiểm tra trường hợp giá trị rỗng
        ? null // hoặc bạn có thể dùng 0 nếu muốn gán giá trị mặc định
        : field === 'quantity' || field === 'price' || field === 'salePrice'
        ? parseFloat(value) // convert string to number for quantity, price, and salePrice
        : value;

    // Cập nhật lại state
    setUpdatedVariants((prevState) =>
      prevState.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: newValue } : variant
      )
    );
  };

  // Handle variant update on button click
  const handleUpdateVariant = async () => {
    console.log('Updated variants:', updatedVariants);
    try {
      for (const variant of updatedVariants) {
        console.log('Updating variant:', variant);
        await axios.put(
          `http://localhost:8080/api/product-variants/update/${variant.id}`,
          variant
        );
      }
      toast.success('Các biến thể đã được cập nhật thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi cập nhật biến thể');
    }
  };

  // Handle variant deletion
  const handleDeleteVariant = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/product-variants/delete/${variantToDelete}`
      );
      setVariants((prevVariants) =>
        prevVariants.filter(
          (variant) => variant.productVariant.id !== variantToDelete
        )
      );
      setIsModalOpen(false);
      toast.success('Biến thể đã được xóa thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa biến thể');
    }
  };

  return (
    <section className="add-wrap-admin py-10">
      <div className="container mx-auto">
        {/* Product Information */}
        {product && (
          <div className="mb-10">
            <div className="card">
              <div className="card-title-top">
                <h5 className="text-lg font-bold">Thông tin sản phẩm</h5>
              </div>
              <div className="form-input">
                <div className="mb-5">
                  <label className="form-label-title block mb-2">
                    Tên sản phẩm
                  </label>
                  <input
                    className="form-control w-full p-3 border rounded-md"
                    type="text"
                    value={product.title}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Product Variants */}
        <div className="mb-10">
          <div className="card">
            <div className="card-title-top flex justify-between items-center">
              <h5 className="text-lg font-bold">Biến thể sản phẩm</h5>
              <button
                className="btn btn-custom bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() =>
                  (window.location.href = `/admin/add-product-variants/${id}`)
                }
              >
                Thêm biến thể mới
              </button>
            </div>
            <div className="form-input">
              {isLoading ? (
                <span className="text-center block">Loading...</span>
              ) : variants.length === 0 ? (
                <span className="text-center block">Chưa có biến thể..</span>
              ) : (
                variants.map((variant) => (
                  <div
                    key={variant.productVariant.id}
                    className="form-input-item mb-8 p-5 border rounded-md"
                  >
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

                    <div className="mb-5">
                      <label className="form-label-title block mb-2">
                        Số lượng
                      </label>
                      <input
                        className="form-control w-full p-3 border rounded-md"
                        type="number"
                        value={
                          updatedVariants.find(
                            (v) => v.id === variant.productVariant.id
                          )?.quantity === null
                            ? '' // Nếu giá trị là null thì hiển thị ô input trống
                            : updatedVariants.find(
                                (v) => v.id === variant.productVariant.id
                              )?.quantity || variant.productVariant.quantity
                        }
                        onChange={(e) =>
                          handleVariantChange(
                            variant.productVariant.id,
                            'quantity',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="mb-5">
                      <label className="form-label-title block mb-2">Giá</label>
                      <input
                        className="form-control w-full p-3 border rounded-md"
                        type="number"
                        value={
                          updatedVariants.find(
                            (v) => v.id === variant.productVariant.id
                          )?.price === null
                            ? '' // Nếu giá trị là null thì hiển thị ô input trống
                            : updatedVariants.find(
                                (v) => v.id === variant.productVariant.id
                              )?.price || variant.productVariant.price
                        }
                        onChange={(e) =>
                          handleVariantChange(
                            variant.productVariant.id,
                            'price',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="mb-5">
                      <label className="form-label-title block mb-2">
                        Giá sale
                      </label>
                      <input
                        className="form-control w-full p-3 border rounded-md"
                        type="number"
                        value={
                          updatedVariants.find(
                            (v) => v.id === variant.productVariant.id
                          )?.salePrice === null
                            ? '' // Nếu giá trị là null thì hiển thị ô input trống
                            : updatedVariants.find(
                                (v) => v.id === variant.productVariant.id
                              )?.salePrice || variant.salePrice
                        }
                        onChange={(e) =>
                          handleVariantChange(
                            variant.productVariant.id,
                            'salePrice',
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <button
                      className="btn btn-custom bg-red-500 text-white py-2 px-4 rounded-md"
                      onClick={() => {
                        setVariantToDelete(variant.productVariant.id);
                        setIsModalOpen(true);
                      }}
                    >
                      Xoá biến thể
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Update Button */}
        {variants.length > 0 && (
          <button
            className="btn bg-green-500 text-white py-2 px-4 rounded-md mx-auto block"
            onClick={handleUpdateVariant}
          >
            Cập nhật biến thể
          </button>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="modal-dialog bg-white p-6 rounded-md w-1/3">
            <div className="modal-header text-center">
              <h5 className="font-bold text-xl">Bạn đã chắc chắn chưa?</h5>
            </div>
            <div className="modal-body text-center">
              <p className="text-sm">
                Nếu thực hiện đồng ý, biến thể sẽ bị xóa vĩnh viễn.
              </p>
            </div>
            <div className="modal-footer flex justify-between mt-4">
              <button
                className="btn bg-blue-500 text-white py-2 px-4 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Hủy bỏ
              </button>
              <button
                className="btn bg-red-500 text-white py-2 px-4 rounded-md"
                onClick={handleDeleteVariant}
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductVariantPage;
