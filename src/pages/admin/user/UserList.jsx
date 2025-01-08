import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8080/users/${deleteUserId}`);
      setDeleteUserId(null);
      fetchUsers();
      setModalIsOpen(false);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const handleBlockUser = async (userId) => {
    const user = users.find((u) => u.id === userId);
    try {
      await axios.put(`http://localhost:8080/users/${userId}`, {
        isBlock: !user.isBlock,
      });
      fetchUsers();
    } catch (error) {
      console.error('Failed to update user block status:', error);
    }
  };

  const openModal = (userId) => {
    setDeleteUserId(userId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDeleteUserId(null);
  };

  return (
    <section className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">
          Danh sách người dùng
        </h2>
        <Link
          to="/admin/add-user"
          className="px-6 py-3 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
        >
          Thêm người dùng
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="spinner border-t-4 border-green-600 border-solid w-12 h-12 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-4 text-left">Ảnh</th>
                <th className="p-4 text-left">Ngày tham gia</th>
                <th className="p-4 text-left">Họ và tên</th>
                <th className="p-4 text-left">Số điện thoại</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Quyền</th>
                <th className="p-4 text-left">Chặn</th>
                <th className="p-4 text-left">Thực thi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-green-50 transition-all duration-300"
                >
                  <td className="p-4">
                    <img
                      src={user.avatar || 'https://via.placeholder.com/150'}
                      alt={user.fullname}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </td>
                  <td className="p-4">
                    {new Date(user.createAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 font-semibold">{user.fullname}</td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">{user.roleDescription}</td>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={user.isBlock === 1}
                      onChange={() => handleBlockUser(user.id)}
                      className="form-checkbox h-5 w-5 text-green-600 transition-all duration-300"
                    />
                  </td>
                  <td className="p-4 flex gap-4">
                    <Link to={`/admin/update-user/${user.id}`}>
                      <FaEdit className="text-blue-500 hover:text-blue-700 transition-all duration-300" />
                    </Link>
                    <button onClick={() => openModal(user.id)}>
                      <FaTrashAlt className="text-red-500 hover:text-red-700 transition-all duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {modalIsOpen && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto mt-20"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h3 className="text-lg font-bold mb-4 text-red-600">
            Xóa người dùng
          </h3>
          <p>Bạn có chắc chắn muốn xóa người dùng này không?</p>
          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={closeModal}
              className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition-all duration-300"
            >
              Hủy
            </button>
            <button
              onClick={handleDeleteUser}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Xóa
            </button>
          </div>
        </Modal>
      )}
    </section>
  );
}

export default UserList;
