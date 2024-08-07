import { useAuth } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleClosePopup = () => {
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96 relative">
        <button
          onClick={handleClosePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <h2 className="text-2xl mb-6 text-center">Hồ sơ người dùng</h2>
        <div className="mb-4">
          <div className="py-6">
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="w-20 h-20 object-cover rounded-full mx-auto"
            />
          </div>
          <div className="text-center font-sans mb-4">
            <h1>{user.displayName}</h1>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">
              Ngày Tạo:{' '}
              {new Date(user.metadata.creationTime).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Thoát
        </button>
      </div>
    </div>
  );
};

export default Profile;
