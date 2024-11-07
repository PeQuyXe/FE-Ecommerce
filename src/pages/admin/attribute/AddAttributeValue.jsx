import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AddAttributeValue = () => {
  const { attributeId } = useParams(); // Lấy attributeId từ URL
  const [valueName, setValueName] = useState('');
  const [values, setValues] = useState([]);

  // Lấy giá trị thuộc tính từ API
  useEffect(() => {
    const fetchAttributeValues = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/attributes/${attributeId}/values`
        );
        setValues(response.data);
      } catch (error) {
        console.error('Error fetching attribute values:', error);
      }
    };

    fetchAttributeValues();
  }, [attributeId]);

  // Thêm giá trị thuộc tính
  const handleAddValue = async () => {
    if (valueName.trim()) {
      try {
        await axios.post('http://localhost:8080/api/attributes/value', {
          attributeId,
          name: valueName,
        });
        setValues((prevValues) => [...prevValues, valueName]);
        setValueName('');
      } catch (error) {
        console.error('Error adding attribute value:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:8080/api/attributes/${attributeId}/values`,
        { name: valueName }
      );
    } catch (error) {
      console.error('Error submitting attribute value:', error);
    }
  };

  return (
    <div className="add-attribute-value">
      <h2>Thêm giá trị thuộc tính</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên giá trị</label>
          <input
            type="text"
            className="form-control"
            value={valueName}
            onChange={(e) => setValueName(e.target.value)}
            placeholder="Nhập giá trị"
          />
        </div>
        <button
          type="button"
          className="btn btn-custom"
          onClick={handleAddValue}
        >
          Thêm giá trị
        </button>
        <button type="submit" className="btn btn-submit">
          Lưu
        </button>
      </form>

      <h4>Danh sách giá trị thuộc tính</h4>
      <ul>
        {values.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
    </div>
  );
};

export default AddAttributeValue;
