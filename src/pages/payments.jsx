import { useAuth, useData } from "../contexts";
import { Header, Drawer, MobileNavbar } from "../components";

const Payments = () => {
  const { allBills } = useData();

  const {
    authState: { uid },
  } = useAuth();

  const findBalanceAmounts = (billsArr) => {
    let amountToReceive = 0;
    let amountSpent = 0;
    let amountToPayOthers = 0;

    billsArr.map((bill) => {
      if (bill.billPaidBy === uid) {
        bill.splittedMembers.map((member) => {
          if (member.isPaid == false) {
            amountToReceive += Number(member.amountToPay);
          }
        });
        amountSpent += Number(bill.billAmount);
      } else {
        bill.splittedMembers.map((members) => {
          if (members.uid === uid && members.isPaid == false) {
            amountToPayOthers += Number(members.amountToPay);
          }
        });
      }
    });

    return { amountToReceive, amountSpent, amountToPayOthers };
  };

  console.log(allBills);

  const { amountToReceive, amountSpent, amountToPayOthers } =
    findBalanceAmounts(allBills);

  return (
    <main className="min-h-screen mt-[4rem] lg:ml-[15rem]">
      <Header />
      <div className="flex flex-row min-h-screen h-full">
        <Drawer />
        <section className="p-4 min-h-screen h-full w-full flex flex-col justify-items-start text-left bg-gray-50">
          <div className="mt-4 lg:mt-6 ">
            <h3 className="text-2xl font-semibold text-ellipsis">
              My Payments
            </h3>
            <div className="text-lg flex flex-col gap-4 mt-4 shadow-md p-3 bg-slate-100">
              <div>Total Amount Spent : {amountSpent}</div>
              <div>Amount Yet to Receive : {amountToReceive}</div>
              <div>Amount Have to Pay Others : {amountToPayOthers}</div>
            </div>
            <div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center  gap-8 m-3 mt-5"></div>
          </div>
        </section>
      </div>
      <MobileNavbar />
    </main>
  );
};

export { Payments };
