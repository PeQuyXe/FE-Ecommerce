// src/contexts/AuthContext.jsuseContext
import { createContext, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = (children) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const jwtToken = userCredential.user.accessToken;
      const decoded = jwt_decode(jwtToken);
      const userRole = decoded.role || 'ROLE_USER';

      setCurrentUser(userCredential.user);
      setToken(jwtToken);
      setRole(userRole);

      localStorage.setItem('token', jwtToken);
      localStorage.setItem('role', userRole);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setToken('');
    setRole('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ currentUser, token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
