import { useGroup } from "../../contexts";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useEffect } from "react";

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

const BillsList = ({ bills = [] }) => {
  const { getGroupByID } = useGroup();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Bill List State updated");
  });

  const checkIsPending = (bill) => {
    const result = bill?.splittedMembers.some(
      (member) => member.isPaid === false
    );
    return result ? "Pending" : "Completed";
  };

  const billClickHandler = (bill) => {
    navigate(`/bills/${bill.id}`);
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
                  <TableHeading headingText={"Bill Name"} />
                  <TableHeading headingText={"Bill Amount"} />
                  <TableHeading headingText={"Bill Status"} />
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, idx) => {
                  return (
                    <tr className="border-b bg-white" key={uuid()}>
                      <TableData data={idx + 1} />
                      <TableData data={bill.name} />
                      <TableData data={bill?.billAmount} />

                      <TableData
                        data={
                          <Link
                            to={`/bills/${bill.id}`}
                            className="text-blue-500 underline"
                          >
                            {checkIsPending(bill)}
                          </Link>
                        }
                      />
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

export { BillsList };
