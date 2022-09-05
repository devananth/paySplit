import { useAllPayments, useAuth, useGroup } from "../../contexts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createPayment } from "../../services";
import { v4 as uuid } from "uuid";

const TableHeading = ({ headingText }) => {
  return (
    <th
      scope="col"
      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
    >
      {headingText}
    </th>
  );
};

const TableData = ({ data }) => {
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm font-regular text-gray-900">
      {data}
    </td>
  );
};

const BillDetailsList = ({ members = [], toUser }) => {
  const navigate = useNavigate();

  const { id: billId } = useParams();

  const {
    authState: { uid },
  } = useAuth();

  const checkIsPending = (status) => {
    return status === false ? "Pending" : "Completed";
  };

  const paymentHandler = (data) => {
    const { amountToPay, uid: paidBy, billId } = data.member;
    const { uid: paidTo } = data.toUser;
    createPayment({ paidBy, paidTo, billId, paidAmount: amountToPay });
  };

  return (
    <div className="flex flex-col ">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded">
            <table className="min-w-full  border-2 border-gray-300   ">
              <thead className="border-b bg-[#fafafa]">
                <tr>
                  <TableHeading headingText={"#"} />
                  <TableHeading headingText={"From user"} />
                  <TableHeading headingText={"To user"} />
                  <TableHeading headingText={"Amount to be Paid"} />
                  <TableHeading headingText={"Payment Status"} />
                  <TableHeading headingText={"Actions"} />
                </tr>
              </thead>
              <tbody>
                {members.map((member, idx) => {
                  return (
                    <tr className="border-b bg-white" key={uuid()}>
                      <TableData data={idx + 1} />
                      <TableData data={member.userName} />
                      <TableData data={toUser?.userName} />
                      <TableData data={member?.amountToPay} />
                      <TableData data={checkIsPending(member?.isPaid)} />
                      {uid === member.uid && member?.isPaid == false ? (
                        <TableData
                          data={
                            <button
                              className="bg-blue-500 p-1 rounded text-white font-semibold"
                              onClick={() => paymentHandler({ member, toUser })}
                            >
                              Mark as Paid
                            </button>
                          }
                        />
                      ) : (
                        <TableData data={"-"} />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BillDetailsList };
