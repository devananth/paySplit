import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, db, addDoc, auth, signOut } from "../firebase";
import { authActions, authReducer } from "../reducers";
import { signupUserServerCall, loginUserServerCall } from "../services";

const initialAuthState = {
  email: null,
  uid: null,
  isUserLoggedIn: null,
};

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [authState, authDispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
      authDispatch({
        type: authActions.SAVE_USER_DETAILS,
        payload: userDetails,
      });
      navigate("/");
    }
  }, []);

  const signUpHandler = async (signupForm) => {
    const { userName, emailId: email, password } = signupForm;

    try {
      const response = await signupUserServerCall({ email, password });

      const user = response?.user;

      if (user) {
        try {
          const docRef = await addDoc(collection(db, "users"), {
            uid: user.uid,
            userName,
            email,
          });
          authDispatch({
            type: authActions.SAVE_USER_DETAILS,
            payload: {
              email,
              uid: user.uid,
            },
          });
          navigate("/");
        } catch (error) {
          console.error(error.message);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const loginHandler = async (loginForm) => {
    const { emailId: email, password } = loginForm;
    try {
      const response = await loginUserServerCall({ email, password });
      authDispatch({
        type: authActions.SAVE_USER_DETAILS,
        payload: {
          email: response?.user?.email,
          uid: response?.user?.uid,
        },
      });
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  const logoutHandler = () => {
    console.log("Logout called");
    signOut(auth);
    authDispatch({
      type: authActions.DELETE_USER_DETAILS,
      payload: "",
    });
    navigate("/login");
  };

  const values = {
    authState,
    authDispatch,
    signUpHandler,
    loginHandler,
    logoutHandler,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
