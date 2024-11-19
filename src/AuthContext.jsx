import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from './firebase';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}
// eslint-disable-react-refresh/only-export-com
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Lưu JWT token
  const [role, setRole] = useState(null); // Vai trò người dùng

  // Theo dõi trạng thái xác thực
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // Kiểm tra nếu JWT token được lưu trữ trong localStorage
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
          setToken(storedToken);
          const decodedToken = jwtDecode(storedToken);
          setUser({ email: decodedToken.sub, userId: decodedToken.userId });
          setRole(decodedToken.roleId);
        }
      } else {
        setUser(null);
        setToken(null);
        setRole(null);
      }
    });
    return unsubscribe;
  }, []);

  // Đăng ký
  const signup = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Đăng nhập
  const login = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    // Giả định backend trả về JWT token khi đăng nhập thành công
    const jwtToken = await user.getIdToken(); // Hoặc gọi API backend để nhận JWT token
    const decodedToken = jwtDecode(jwtToken);

    setToken(jwtToken);
    setUser({ email: decodedToken.sub, userId: decodedToken.userId });
    setRole(decodedToken.roleId);

    localStorage.setItem('token', jwtToken); // Lưu token để sử dụng sau này
  };

  // Đăng xuất
  const logout = () => {
    setUser(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem('token');
    return signOut(auth);
  };

  const value = {
    user,
    token,
    role, // Vai trò của người dùng
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
