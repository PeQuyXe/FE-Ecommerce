import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteRoleId, setDeleteRoleId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/roles');
      setRoles(response.data);
    } catch (error) {
      toast.error(`Lỗi tải dữ liệu: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRole = async () => {
    try {
      await axios.delete(`http://localhost:8080/roles/${deleteRoleId}`);
      setRoles((prev) => prev.filter((role) => role.id !== deleteRoleId));
      toast.success('Xóa vai trò thành công!');
      closeModal();
    } catch (error) {
      toast.error(`Lỗi: ${error.message}`);
    }
  };

  const openModal = (roleId) => {
    setDeleteRoleId(roleId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteRoleId(null);
  };

  return (
    <section className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Danh sách vai trò</h2>
        <Link
          to="/admin/roles/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Thêm vai trò
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="spinner border-t-4 border-blue-600 border-solid w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">Tên</th>
                <th className="p-4 text-left">Mô tả</th>
                <th className="p-4 text-left">Thực thi</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr
                  key={role.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-semibold">{role.name}</td>
                  <td className="p-4">{role.description}</td>
                  <td className="p-4 flex gap-4">
                    <Link to={`/admin/roles/edit/${role.id}`}>
                      <FaEdit className="text-blue-500 hover:text-blue-700" />
                    </Link>
                    <button onClick={() => openModal(role.id)}>
                      <FaTrashAlt className="text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Xác nhận lại */}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h3 className="text-lg font-bold mb-4">Xóa vai trò</h3>
          <p>Bạn có chắc chắn muốn xóa vai trò này không?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Hủy
            </button>
            <button
              onClick={handleDeleteRole}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Xóa
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default RoleList;
