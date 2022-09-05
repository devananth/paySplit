import { v4 as uuid } from "uuid";
import { BiArrowBack } from "react-icons/bi";
import {
  BillsList,
  Drawer,
  GroupCard,
  GroupModal,
  Header,
  MembersList,
  MobileNavbar,
} from "../components";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData, useGroup } from "../contexts";
import { groupActions } from "../reducers";

const GroupDetails = () => {
  const { id: groupId } = useParams();

  const {
    groupState: { isBillModalOpen, currentGroup },
    groupDispatch,
    getGroupByID,
    toggleBillModal,
  } = useGroup();

  const { allBills } = useData();

  const currentGroupBills = allBills.filter(
    (bill) => bill?.groupId === currentGroup?.id
  );

  const totalMoneySpent = currentGroupBills.reduce(
    (acc, ele) => acc + Number(ele.billAmount),
    0
  );

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    (async () => {
      const group = await getGroupByID(groupId);
      groupDispatch({
        type: groupActions.SET_CURRENT_GROUP,
        payload: group,
      });
    })();
  }, [allBills]);

  return (
    <main className="min-h-screen mt-[4rem] lg:ml-[15rem]">
      <Header />
      <div className="flex flex-row min-h-screen h-full">
        <Drawer />
        <section className="p-4 min-h-screen h-full w-full flex flex-col justify-items-start text-left bg-gray-50">
          <div className="flex flex-row items-center gap-4 text-2xl">
            <Link
              to="/"
              className="cursor-pointer hover:bg-gray-200 p-1 rounded-full"
            >
              <BiArrowBack />
            </Link>

            <h4 className="">{currentGroup?.name}</h4>
          </div>
          <nav className="flex flex-row items-center gap-8 w-full border-b-2 border-gray-200 mt-4 sm:ml-8 text-lg ">
            <div
              className={`cursor-pointer hover:text-blue-700 hover:border-b-2 hover:border-blue-600 p-2 ${
                activeTab === 0 && "text-blue-700 border-b-2 border-blue-600"
              }`}
              onClick={() => setActiveTab(0)}
            >
              Members
            </div>
            <div
              className={`cursor-pointer hover:text-blue-700 hover:border-b-2 hover:border-blue-600 p-2 ${
                activeTab === 1 && "text-blue-700 border-b-2 border-blue-600"
              }`}
              onClick={() => setActiveTab(1)}
            >
              Bills
            </div>
            <h5 className="ml-auto mr-[5rem]">{`Total Money Spent : ${totalMoneySpent} INR`}</h5>
          </nav>
          <div className="sm:ml-8 p-4">
            {activeTab === 0 ? (
              <MembersList members={currentGroup?.members} />
            ) : (
              <>
                <button
                  className="w-fit bg-blue-600 p-1 px-2 md:p-2  md:px-4 font-bold text-white rounded"
                  onClick={toggleBillModal}
                >
                  Create bill
                </button>
                <BillsList
                  bills={currentGroupBills}
                  groupName={currentGroup?.name}
                />
              </>
            )}
          </div>
        </section>
      </div>
      <MobileNavbar />
    </main>
  );
};

export { GroupDetails };
