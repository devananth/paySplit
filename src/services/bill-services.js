import { v4 as uuid } from "uuid";
import {
  doc,
  db,
  setDoc,
  query,
  collection,
  where,
  addDoc,
  getDocs,
  updateDoc,
} from "../firebase";

const createBill = async ({
  name,
  billAmount,
  billPaidBy,
  splittedMembers,
  groupId,
  createdBy,
}) => {
  const avgAmount = billAmount / splittedMembers.length;

  const _uuid = uuid();

  const members = splittedMembers
    .filter((member) => billPaidBy !== member.uid)
    .map((member) => {
      return {
        ...member,
        isPaid: false,
        amountToPay: avgAmount,
        billId: _uuid,
      };
    });

  try {
    const response = await setDoc(doc(db, "bills", _uuid), {
      id: _uuid,
      name: name.trim(),
      billAmount,
      billPaidBy,
      splittedMembers: members,
      createdBy,
      groupId,
    });
  } catch (error) {
    console.error(error);
  }
};

const getBillByID = async (id) => {
  try {
    const q = query(collection(db, "bills"), where("id", "==", id));
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

const markAsPaid = async ({ billId, paidBy }) => {
  try {
    const bill = await getBillByID(billId);

    const updatedMembers = bill.splittedMembers.map((member) => {
      if (member.uid === paidBy) {
        return { ...member, isPaid: true };
      } else {
        return { ...member };
      }
    });

    const response = await updateDoc(doc(db, "bills", billId), {
      splittedMembers: updatedMembers,
    });
  } catch (error) {
    console.error(error);
  }
};

export { createBill, getBillByID, markAsPaid };
