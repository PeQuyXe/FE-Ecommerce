import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [editingBrand, setEditingBrand] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [deleteBrandId, setDeleteBrandId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/brand');
      setBrands(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error loading brands');
      setLoading(false);
    }
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) {
      setError('Brand name cannot be empty');
      return;
    }
    setLoading(true);
    try {
      const brandData = { name: brandName };
      if (modalType === 'edit') {
        await axios.put(
          `http://localhost:8080/api/brand/${editingBrand.id}`,
          brandData
        );
      } else {
        await axios.post('http://localhost:8080/api/brand', brandData);
      }
      setBrandName('');
      setModalType(null);
      setEditingBrand(null);
      fetchBrands();
    } catch (err) {
      setError('Error saving brand');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setBrandName(brand.name);
    setModalType('edit');
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:8080/api/brand/${id}`);
      fetchBrands();
      setDeleteBrandId(null);
    } catch (err) {
      setError('Error deleting brand');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen">
      <div className="container mx-auto">
        <button
          onClick={() => {
            setModalType('add');
            setBrandName('');
          }}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Thêm Thương Hiệu
        </button>
        {loading && (
          <div className="text-center py-4 text-gray-500">
            Đang tải dữ liệu...
          </div>
        )}
        {error && <div className="text-red-500 text-center py-4">{error}</div>}

        <div className="overflow-x-auto ">
          <table className="min-w-full bg-gray-100 rounded-lg overflow-hidden mt-6 items-center">
            <thead>
              <tr className="bg-indigo-600 text-white leading-normal ">
                <th className="py-3 px-6 text-center">Tên thương hiệu</th>
                <th className="py-3 px-6 text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-lg font-light">
              {brands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center">{brand.name}</td>
                  <td className="py-3 px-6 flex items-center justify-center space-x-6">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="text-indigo-600 hover:text-indigo-800 flex items-center space-x-2 transition duration-300"
                    >
                      <FaEdit /> <span>Sửa</span>
                    </button>
                    <button
                      onClick={() => setDeleteBrandId(brand.id)}
                      className="text-red-600 hover:text-red-800 flex items-center space-x-2 transition duration-300"
                    >
                      <FaTrashAlt /> <span>Sửa</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Add/Edit Brand */}
        {modalType && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h5 className="text-xl font-semibold text-gray-700 mb-4">
                {modalType === 'add'
                  ? 'Thêm thương hiệu mới'
                  : 'Cập nhật thương hiệu'}
              </h5>
              <form onSubmit={handleAddOrUpdate} className="space-y-4">
                <input
                  type="text"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="Tên thương hiệu"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-400 transition duration-300"
                    onClick={() => setModalType(null)}
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition duration-300"
                    disabled={loading}
                  >
                    {loading
                      ? 'Đang lưu...'
                      : modalType === 'add'
                        ? 'Thêm'
                        : 'Cập nhật'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal for Deletion */}
        {deleteBrandId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h5 className="text-xl font-semibold text-gray-700 mb-4">
                Bạn có chắc chắn muốn xóa thương hiệu này không?
              </h5>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition duration-300"
                  onClick={() => setDeleteBrandId(null)}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => handleDelete(deleteBrandId)}
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Brand;
