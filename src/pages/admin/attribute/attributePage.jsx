import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AttributePage = () => {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [values, setValues] = useState([]);
  const [valueName, setValueName] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const fetchAttributes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/attributes');
      setAttributes(response.data);
    } catch (error) {
      console.error('Error fetching attributes:', error);
    }
  };

  const fetchAttributeValues = async (attributeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/attributes/${attributeId}/values`
      );
      setValues(response.data);
    } catch (error) {
      console.error('Error fetching attribute values:', error);
    }
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  const handleSaveAttribute = async (e) => {
    e.preventDefault();
    const attributeData = { name, displayName };

    try {
      if (selectedAttribute) {
        await axios.put(
          `http://localhost:8080/api/attributes/${selectedAttribute.id}`,
          attributeData
        );
      } else {
        await axios.post('http://localhost:8080/api/attributes', attributeData);
      }
      fetchAttributes();
      resetForm();
    } catch (error) {
      console.error('Error saving attribute:', error);
    }
  };

  const handleDeleteAttribute = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/attributes/${id}`);
      setAttributes(attributes.filter((attr) => attr.id !== id));
    } catch (error) {
      console.error('Error deleting attribute:', error);
    }
  };

  const handleAddValue = async () => {
    if (selectedAttribute && valueName.trim()) {
      try {
        await axios.post('http://localhost:8080/api/attributes/value', {
          attribute: { id: selectedAttribute.id },
          valueName,
        });
        fetchAttributeValues(selectedAttribute.id);
        setValueName('');
      } catch (error) {
        console.error('Error adding attribute value:', error);
      }
    } else {
      console.error('Please select an attribute and provide a value name.');
    }
  };

  const handleDeleteValue = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/attributes/value/${id}`);
      fetchAttributeValues(selectedAttribute.id);
    } catch (error) {
      console.error('Error deleting attribute value:', error);
    }
  };

  const resetForm = () => {
    setSelectedAttribute(null);
    setName('');
    setDisplayName('');
    setValues([]);
  };

  const openDeleteModal = (id) => {
    setDeleteModalOpen(true);
    setDeleteTargetId(id);
  };

  const confirmDelete = () => {
    handleDeleteAttribute(deleteTargetId);
    setDeleteModalOpen(false);
    setDeleteTargetId(null);
  };

  return (
    <div className="w-full min-h-screen mx-auto p-6">

      <form onSubmit={handleSaveAttribute} className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên thuộc tính"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Tên hiển thị"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {selectedAttribute ? 'Cập nhật' : 'Thêm mới'}
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="flex items-center gap-2 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Hủy
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {attributes.map((attribute) => (
          <li key={attribute.id} className="p-4 bg-white rounded-md shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <span className="font-medium">{attribute.name}</span>
                <span className="block text-sm text-gray-500">
                  {attribute.displayName}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedAttribute(attribute);
                    setName(attribute.name);
                    setDisplayName(attribute.displayName);
                    fetchAttributeValues(attribute.id);
                  }}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <FaEdit /> Chọn
                </button>
                <button
                  onClick={() => openDeleteModal(attribute.id)}
                  className="flex items-center gap-2 px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  <FaTrash /> Xóa
                </button>
              </div>
            </div>

            {selectedAttribute?.id === attribute.id && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">
                  Giá trị của thuộc tính
                </h4>
                <ul className="space-y-2">
                  {values.map((value) => (
                    <li
                      key={value.id}
                      className="flex justify-between items-center p-2 bg-gray-100 rounded-md"
                    >
                      <span>{value.valueName}</span>
                      <button
                        onClick={() => handleDeleteValue(value.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                      >
                        Xóa
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={valueName}
                    onChange={(e) => setValueName(e.target.value)}
                    placeholder="Nhập giá trị"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleAddValue}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                  >
                    Thêm giá trị
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa?</h3>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributePage;