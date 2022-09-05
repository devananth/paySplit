import { v4 as uuid } from "uuid";
import { BiArrowBack } from "react-icons/bi";
import {
  BillDetailsList,
  BillsList,
  Drawer,
  GroupCard,
  GroupModal,
  Header,
  MembersList,
  MobileNavbar,
} from "../components";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useAllBills,
  useAllPayments,
  useAllUsers,
  useData,
  useGroup,
} from "../contexts";
import { getBillByID } from "../services";
import { groupActions } from "../reducers";

const BillDetails = () => {
  const { id: billId } = useParams();

  const { getUserByUID, allPayments, allBills } = useData();

  const [paidUser, setPaidUser] = useState("");

  const [currentBill, setCurrentBill] = useState({
    name: "",
    id: "",
    members: [],
    paidBy: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const bill = await getBillByID(billId);
        setCurrentBill(bill);
        const response = await getUserByUID(bill?.billPaidBy);
        setPaidUser(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [billId, allBills]);

  const currentBillPayments = allPayments.map(
    (payment) => payment.billId === billId
  );

  useEffect(() => {
    console.log("Bill Details State updated");
  }, [allBills]);

  const [activeTab, setActiveTab] = useState(0);

  const members = currentBill?.splittedMembers?.filter(
    (member) => member.isPaid == activeTab
  );

  return (
    <main className="min-h-screen mt-[4rem] lg:ml-[15rem]">
      <Header />
      <div className="flex flex-row min-h-screen h-full">
        <Drawer />
        <section className="p-4 min-h-screen h-full w-full flex flex-col justify-items-start text-left bg-gray-50">
          <div className="flex flex-row items-center gap-4 text-2xl">
            <span
              className="cursor-pointer hover:bg-gray-200 p-1 rounded-full "
              onClick={() => navigate(-1)}
            >
              <BiArrowBack />
            </span>

            <h4 className="">{currentBill?.name}</h4>
          </div>
          <nav className="flex flex-row items center gap-8 w-full border-b-2 border-gray-200 mt-4 sm:ml-8 text-lg ">
            <div
              className={`cursor-pointer hover:text-blue-700 hover:border-b-2 hover:border-blue-600 p-2 ${
                activeTab === 0 && "text-blue-700 border-b-2 border-blue-600"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Pending
            </div>
            <div
              className={`cursor-pointer hover:text-blue-700 hover:border-b-2 hover:border-blue-600 p-2 ${
                activeTab === 1 && "text-blue-700 border-b-2 border-blue-600"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Success
            </div>
          </nav>
          <div className="sm:ml-8 p-4">
            <BillDetailsList members={members} toUser={paidUser} />
          </div>
        </section>
      </div>
      <MobileNavbar />
    </main>
  );
};

export { BillDetails };
