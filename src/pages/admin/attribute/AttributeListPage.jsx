import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AttributeListPage = () => {
  const [attributes, setAttributes] = useState([]);

  // Lấy tất cả các thuộc tính từ API
  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/attributes'
        );
        setAttributes(response.data);
      } catch (error) {
        console.error('Error fetching attributes:', error);
      }
    };

    fetchAttributes();
  }, []);

  // Xoá thuộc tính
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/attributes/${id}`);
      setAttributes(attributes.filter((attribute) => attribute.id !== id)); // Cập nhật lại danh sách
    } catch (error) {
      console.error('Error deleting attribute:', error);
    }
  };

  return (
    <div className="attribute-list-page">
      <h2>Danh sách thuộc tính</h2>
      <table>
        <thead>
          <tr>
            <th>Tên thuộc tính</th>
            <th>Thực thi</th>
          </tr>
        </thead>
        <tbody>
          {attributes.map((attribute) => (
            <tr key={attribute.id}>
              <td>{attribute.name}</td>
              <td>
                <Link
                  to={`/admin/page/attributes/value/add/${attribute.id}`}
                  className="btn btn-custom"
                >
                  Thêm giá trị
                </Link>
                <button
                  onClick={() => handleDelete(attribute.id)}
                  className="btn btn-danger"
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttributeListPage;
