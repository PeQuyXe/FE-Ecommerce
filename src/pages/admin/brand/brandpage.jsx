import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import các biểu tượng từ react-icons

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const [brandName, setBrandName] = useState('');
  const [editingBrand, setEditingBrand] = useState(null);
  const [modalType, setModalType] = useState('add');

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const response = await axios.get('http://localhost:8080/api/brand');
    setBrands(response.data);
  };

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    if (modalType === 'add') {
      await axios.post('http://localhost:8080/api/brand', { name: brandName });
    } else {
      await axios.put(`http://localhost:8080/api/brand/${editingBrand.id}`, {
        name: brandName,
      });
    }
    setBrandName('');
    setEditingBrand(null);
    fetchBrands();
  };

  const handleEdit = (brand) => {
    setEditingBrand(brand);
    setBrandName(brand.name);
    setModalType('edit');
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/api/brand/${id}`);
    fetchBrands();
  };

  return (
    <section className="p-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-5">
          <h5 className="text-2xl font-semibold text-gray-700">
            Danh sách thương hiệu
          </h5>
        </div>
        <button
          onClick={() => {
            setModalType('add');
            setBrandName('');
          }}
          className="px-4 py-2 bg-green-500 text-white font-medium rounded hover:bg-green-600 transition duration-300 mb-5"
        >
          Thêm thương hiệu
        </button>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Tên thương hiệu</th>
                <th className="py-3 px-6 text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {brands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{brand.name}</td>
                  <td className="py-3 px-6">
                    <button
                      onClick={() => handleEdit(brand)}
                      className="text-blue-500 hover:text-blue-700 mr-4"
                    >
                      <FaEdit /> {/* Biểu tượng Sửa */}
                    </button>
                    <button
                      onClick={() => handleDelete(brand.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt /> {/* Biểu tượng Xóa */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {modalType === 'add' || modalType === 'edit' ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
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
                    className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400 transition duration-300"
                    onClick={() => setModalType('')}
                  >
                    Huỷ bỏ
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-medium rounded hover:bg-blue-600 transition duration-300"
                  >
                    {modalType === 'add' ? 'Thêm mới' : 'Cập nhật'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Brand;
