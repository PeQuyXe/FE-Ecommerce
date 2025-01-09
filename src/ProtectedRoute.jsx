import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const storedUser = localStorage.getItem('userData');
  const user = storedUser ? JSON.parse(storedUser) : null;
  console.log(user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.roleId)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.number).isRequired,
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
