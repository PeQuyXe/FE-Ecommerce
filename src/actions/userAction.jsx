import { auth } from '../firebase';
import { loginSuccess, logout } from '../firebase';
import { toast } from 'react-toastify';

export const loginUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    dispatch(loginSuccess(userCredential.user));
    toast.success('Đăng nhập thành công');
  } catch (error) {
    toast.error(error.message);
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    dispatch(loginSuccess(userCredential.user));
    toast.success('Đăng ký thành công');
  } catch (error) {
    toast.error(error.message);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await auth.signOut();
    dispatch(logout());
    toast.success('Đăng xuất thành công');
  } catch (error) {
    toast.error(error.message);
  }
};
