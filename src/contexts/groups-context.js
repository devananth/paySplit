import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { createContext, useContext, useReducer, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { db, query, getDocs, where } from "../firebase";
import { groupActions, groupReducer } from "../reducers";
import { useAuth } from "./auth-context";
import { useData } from "./data-context";

const initialGroupState = {
  isGroupModalOpen: false,
  groups: [],
  currentGroup: {},
  isBillModalOpen: false,
};

const GroupContext = createContext(null);

const GroupProvider = ({ children }) => {
  const navigate = useNavigate();

  const {
    authState: { uid },
  } = useAuth();

  const { allBills } = useData();

  const [groupState, groupDispatch] = useReducer(
    groupReducer,
    initialGroupState
  );

  useEffect(() => {
    (async () => {
      try {
        onSnapshot(collection(db, "groups"), (snapshot) => {
          let arr = [];
          snapshot.docs.forEach((doc) => {
            arr.push(doc.data());
          });
          groupDispatch({
            type: groupActions.SET_ALL_GROUPS,
            payload: arr,
          });
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const toggleModal = () => {
    groupDispatch({
      type: groupActions.TOGGLE_MODAL,
      payload: "",
    });
  };

  const toggleBillModal = () => {
    groupDispatch({
      type: groupActions.TOGGLE_BILL_MODAL,
      payload: "",
    });
  };

  const createGroup = async ({ name, members }) => {
    try {
      const response = await addDoc(collection(db, "groups"), {
        id: uuid(),
        name: name.trim(),
        members,
        adminId: uid,
        bills: [],
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const getGroupByID = async (id) => {
    try {
      const q = query(collection(db, "groups"), where("id", "==", id));
      let arr = [];
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        arr.push(doc.data());
      });
      return arr[0];
    } catch (error) {
      console.error(error);
    }
  };

  const values = {
    groupState,
    groupDispatch,
    toggleModal,
    createGroup,
    getGroupByID,
    toggleBillModal,
  };

  return (
    <GroupContext.Provider value={values}>{children}</GroupContext.Provider>
  );
};

const useGroup = () => useContext(GroupContext);

export { useGroup, GroupProvider };
