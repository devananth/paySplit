import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../firebase";

const signupUserServerCall = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUserServerCall = (loginForm) => {
  const { email, password } = loginForm;
  return signInWithEmailAndPassword(auth, email, password);
};

export { signupUserServerCall, loginUserServerCall };
