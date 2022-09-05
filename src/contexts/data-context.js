import { onSnapshot, doc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { collection, getDocs, db, where, query } from "../firebase";
import { useAuth } from "./auth-context";

const initialDataState = {
  allUsers: [],
};

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const [allUsers, setAllUsers] = useState([]);
  const [allPayments, setAllPayments] = useState([]);
  const [allBills, setAllBills] = useState([]);

  const {
    authState: { uid },
  } = useAuth();

  useEffect(() => {
    //all users
    (async () => {
      try {
        onSnapshot(collection(db, "users"), (snapshot) => {
          let arr = [];
          snapshot.docs.forEach((doc) => {
            arr.push(doc.data());
          });
          setAllUsers(() => [...arr]);
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  //all payments
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "payments"), (snapshot) => {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setAllPayments(() => [...arr]);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //all bills
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bills"), (snapshot) => {
      let arr = [];
      snapshot.docs.forEach((doc) => {
        arr.push(doc.data());
      });
      setAllBills([...arr]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const findUserByUID = (uid) => {
    return allUsers.find(({ uid: _uid }) => _uid === uid);
  };

  const getUserByUID = async (uid) => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", uid));
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
    allUsers,
    allPayments,
    allBills,
    findUserByUID,
    getUserByUID,
  };

  return <DataContext.Provider value={values}>{children}</DataContext.Provider>;
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
