import { useEffect, useState } from 'react';
import axios from 'axios';

const AttributePage = () => {
  const [attributes, setAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState(null);
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [values, setValues] = useState([]);
  const [valueName, setValueName] = useState('');

  // Lấy danh sách thuộc tính
  const fetchAttributes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/attributes');
      setAttributes(response.data);
    } catch (error) {
      console.error('Error fetching attributes:', error);
    }
  };

  // Lấy giá trị thuộc tính theo attributeId
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

  // Thêm hoặc cập nhật thuộc tính
  const handleSaveAttribute = async (e) => {
    e.preventDefault();
    try {
      const attributeData = { name, display_name: displayName };
      if (selectedAttribute) {
        // Cập nhật thuộc tính
        await axios.put(
          `http://localhost:8080/api/attributes/${selectedAttribute.id}`,
          attributeData
        );
      } else {
        // Thêm thuộc tính mới
        await axios.post('http://localhost:8080/api/attributes', attributeData);
      }
      fetchAttributes();
      setName('');
      setDisplayName('');
      setSelectedAttribute(null);
    } catch (error) {
      console.error('Error saving attribute:', error);
    }
  };

  // Xóa thuộc tính
  const handleDeleteAttribute = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/attributes/${id}`);
      setAttributes(attributes.filter((attr) => attr.id !== id));
    } catch (error) {
      console.error('Error deleting attribute:', error);
    }
  };

  // Thêm giá trị thuộc tính
  const handleAddValue = async () => {
    if (valueName.trim()) {
      try {
        await axios.post('http://localhost:8080/api/attributes/value', {
          attributeId: selectedAttribute.id,
          valueName,
        });
        fetchAttributeValues(selectedAttribute.id);
        setValueName('');
      } catch (error) {
        console.error('Error adding attribute value:', error);
      }
    }
  };

  // Xóa giá trị thuộc tính
  const handleDeleteValue = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/attributes/value/${id}`);
      fetchAttributeValues(selectedAttribute.id);
    } catch (error) {
      console.error('Error deleting attribute value:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Quản lý Thuộc Tính
      </h2>

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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {selectedAttribute ? 'Cập nhật' : 'Thêm mới'}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedAttribute(null);
              setName('');
              setDisplayName('');
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
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
                  {attribute.display_name}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedAttribute(attribute);
                    setName(attribute.name);
                    setDisplayName(attribute.display_name);
                    fetchAttributeValues(attribute.id);
                  }}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Chọn
                </button>
                <button
                  onClick={() => handleDeleteAttribute(attribute.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Xóa
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
    </div>
  );
};

export default AttributePage;
