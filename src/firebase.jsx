import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCCCtuVd3any3AvjQ8wfO1mWIRyoGjVJSs',
  authDomain: 'ecm-app-35a85.firebaseapp.com',
  projectId: 'ecm-app-35a85',
  storageBucket: 'ecm-app-35a85.appspot.com',
  messagingSenderId: '460194418937',
  appId: '1:460194418937:web:85fb7c3b14617057c41228',
  measurementId: 'G-QVMPZ9NKR0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  provider,
};
