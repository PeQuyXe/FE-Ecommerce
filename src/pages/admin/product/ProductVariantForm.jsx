import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ProductVariantForm = () => {
  const { id, variantId } = useParams();
  const navigate = useNavigate();

  const [variant, setVariant] = useState({
    rom: '',
    ram: '',
    color: '',
    pin: '',
    quantity: '',
    price: '',
    salePrice: '',
  });

  const [productTitle, setProductTitle] = useState('');
  const [attributes, setAttributes] = useState({
    romOptions: [],
    ramOptions: [],
    colorOptions: [],
    pinOptions: [],
  });

  useEffect(() => {
    if (variantId) fetchVariantDetails();
    fetchProductTitle();
    fetchAttributes();
    // eslint-disable-next-line
  }, [variantId, id]);

  // Hàm để lấy tiêu đề sản phẩm từ API
  const fetchProductTitle = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/${id}`
      );
      setProductTitle(response.data.title);
    } catch (error) {
      console.error('Lỗi khi lấy tiêu đề sản phẩm:', error);
    }
  };

  // Hàm để lấy các thuộc tính từ API
  const fetchAttributes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/variants/attributes`
      );
      const attributeData = response.data;

      const newAttributes = {
        romOptions: [],
        ramOptions: [],
        colorOptions: [],
        pinOptions: [],
      };

      // Duyệt qua từng thuộc tính và lấy các giá trị cần thiết
      attributeData.forEach((attr) => {
        const options = attr.values.map((value) => value.valueName); // Lấy ra mảng valueName từ values
        switch (attr.name) {
          case 'rom':
            newAttributes.romOptions = options;
            break;
          case 'ram':
            newAttributes.ramOptions = options;
            break;
          case 'color':
            newAttributes.colorOptions = options;
            break;
          case 'pin':
            newAttributes.pinOptions = options;
            break;
          default:
            break;
        }
      });

      setAttributes(newAttributes);
    } catch (error) {
      console.error('Lỗi khi lấy thuộc tính sản phẩm:', error);
    }
  };

  const fetchVariantDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/product-variants/${variantId}`
      );
      setVariant(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy chi tiết biến thể:', error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data payload (optional fields can be left as they are)
    const payload = { ...variant };
    console.log('Payload:', payload);
    try {
      if (variantId) {
        await axios.put(
          `http://localhost:8080/api/product-variants/${variantId}`,
          payload
        );
      } else {
        await axios.post(
          `http://localhost:8080/api/product-variants/${id}`,
          payload
        );
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

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg space-y-6"
      >
        <div className="mb-4">
          <label className="text-gray-600 mb-2 block">Tên sản phẩm*</label>
          <input
            type="text"
            value={productTitle}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 outline-none"
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 mb-2 block">
              Thuộc tính sản phẩm
            </label>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {/* ROM Options */}
              <div className="flex flex-col">
                <span>rom (Dung lượng)</span>
                {attributes.romOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="rom"
                      value={option}
                      onChange={(e) =>
                        setVariant({ ...variant, rom: e.target.value })
                      }
                    />{' '}
                    {option}
                  </label>
                ))}
              </div>

              {/* RAM Options */}
              <div className="flex flex-col">
                <span>ram (Ram)</span>
                {attributes.ramOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="ram"
                      value={option}
                      onChange={(e) =>
                        setVariant({ ...variant, ram: e.target.value })
                      }
                    />{' '}
                    {option}
                  </label>
                ))}
              </div>

              {/* Color Options */}
              <div className="flex flex-col">
                <span>color (Màu sắc)</span>
                {attributes.colorOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="color"
                      value={option}
                      onChange={(e) =>
                        setVariant({ ...variant, color: e.target.value })
                      }
                    />{' '}
                    {option}
                  </label>
                ))}
              </div>

              {/* Pin Options */}
              <div className="flex flex-col">
                <span>pin (Dung lượng pin)</span>
                {attributes.pinOptions.map((option) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name="pin"
                      value={option}
                      onChange={(e) =>
                        setVariant({ ...variant, pin: e.target.value })
                      }
                    />{' '}
                    {option}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Số lượng</label>
            <input
              type="number"
              value={variant.quantity}
              onChange={(e) =>
                setVariant({ ...variant, quantity: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-600 mb-2">Giá</label>
            <input
              type="number"
              value={variant.price}
              onChange={(e) =>
                setVariant({ ...variant, price: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-600 mb-2">Giá sale</label>
          <input
            type="number"
            value={variant.salePrice || ''}
            onChange={(e) =>
              setVariant({ ...variant, salePrice: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
          />
        </div>

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
