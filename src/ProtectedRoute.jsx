import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles, children }) => {
  // Lấy thông tin người dùng từ localStorage
  const storedUser = localStorage.getItem('userData');
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log(user);
  // Kiểm tra nếu không có user hoặc user không có role phù hợp
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.roleId)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired, // Đảm bảo roleId là số
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
