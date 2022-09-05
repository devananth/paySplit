const groupReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case groupActions.TOGGLE_MODAL:
      return { ...state, isGroupModalOpen: !state.isGroupModalOpen };
    case groupActions.SET_ALL_GROUPS:
      return { ...state, groups: payload };
    case groupActions.TOGGLE_BILL_MODAL:
      return { ...state, isBillModalOpen: !state.isBillModalOpen };
    case groupActions.SET_CURRENT_GROUP:
      return { ...state, currentGroup: payload };
    default:
      return { ...state };
  }
};

const groupActions = {
  TOGGLE_MODAL: "TOGGLE_MODAL",
  TOGGLE_BILL_MODAL: "TOGGLE_BILL_MODAL",
  CREATE_GROUP: "CREATE_GROUP",
  SET_ALL_GROUPS: "SET_ALL_GROUPS",
  SET_CURRENT_GROUP: "SET_CURRENT_GROUP",
};

export { groupActions, groupReducer };
