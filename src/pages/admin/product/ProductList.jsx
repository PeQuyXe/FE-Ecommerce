import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatCurrency } from '../../../utils/configformat';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="product-wrap">
      <div className="card bg-white shadow-md rounded-lg p-6">
        <div className="title-header flex justify-between items-center mb-6">
          <h5 className="title text-lg font-semibold">Danh sách sản phẩm</h5>
          <div className="right-options">
            <Link
              to="/admin/products/new"
              className="btn btn-custom bg-purple-500 text-white px-4 py-2 rounded"
            >
              Thêm sản phẩm
            </Link>
          </div>
        </div>

        <div className="table-custom overflow-x-auto">
          <table className="theme-table table-auto w-full text-left border-collapse">
            <thead className="bg-gray-200 rounded-lg">
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
                <tr key={product.id} className="border-b hover:bg-gray-100">
                  <td className="p-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.thumb}
                        alt={product.title}
                        className="w-10 h-10 object-cover rounded"
                      />
                      <span className="text-truncate">
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          className="text-blue-500"
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
                      className="text-blue-500"
                    >
                      Chi tiết
                    </Link>
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin/rating-product/${product.id}`}
                      className="text-primary"
                    >
                      Chi tiết
                    </Link>
                  </td>
                  <td className="p-3 flex space-x-2">
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      className="text-yellow-500"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="text-red-500"
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
    </section>
  );
};

export default ProductList;
