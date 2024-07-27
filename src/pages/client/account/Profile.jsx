import { useAuth } from './AuthContext';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const history = useHistory();

  if (!user) {
    history.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-6 text-center">Profile</h2>
        <div className="mb-4">
          <p className="text-gray-700">Email: {user.email}</p>
        </div>
        <button
          onClick={logout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
