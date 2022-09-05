import { markAsPaid } from "./bill-services";
import { v4 as uuid } from "uuid";
import {
  doc,
  db,
  setDoc,
  query,
  collection,
  where,
  getDocs,
  updateDoc,
  addDoc,
} from "../firebase";

const createPayment = async ({ paidTo, paidBy, paidAmount, billId }) => {
  try {
    const _uuid = uuid();
    const response = await setDoc(doc(db, "payments", _uuid), {
      id: uuid(),
      paidBy,
      paidTo,
      paidAmount,
      billId,
    });
    markAsPaid({ billId, paidBy });
  } catch (error) {
    console.error(error);
  }
};

export { createPayment };
