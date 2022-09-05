const authReducer = (authState, authDispatch) => {
  const { type, payload } = authDispatch;

  switch (type) {
    case authActions.SAVE_USER_DETAILS:
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          ...payload,
          isUserLoggedIn: true,
        })
      );
      return { ...payload, isUserLoggedIn: true };
    case authActions.DELETE_USER_DETAILS:
      localStorage.removeItem("userDetails");
      return {
        firstName: null,
        lastName: null,
        email: null,
        userId: null,
        isUserLoggedIn: false,
      };
    default:
      return { ...authState };
  }
};

const authActions = {
  SAVE_USER_DETAILS: "SAVE_USER_DETAILS",
  DELETE_USER_DETAILS: "DELETE_USER_DETAILS",
};

export { authActions, authReducer };
