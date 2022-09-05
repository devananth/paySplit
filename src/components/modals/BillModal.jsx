import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useAuth, useData, useGroup } from "../../contexts";
import { createBill } from "../../services";
import { MultiSelect } from "../multi-select/MultiSelect";
import Select from "react-select";

const BillModal = () => {
  const { allUsers } = useData();

  const {
    authState: { uid },
  } = useAuth();

  const {
    toggleBillModal,
    groupState: { currentGroup },
  } = useGroup();

  const [billForm, setBillForm] = useState({
    name: "",
    billAmount: 0,
    billPaidBy: currentGroup?.members[0].uid,
    splittedMembers: [],
  });

  const addOptionsHandler = (selectedOptions) => {
    setBillForm((prev) => ({ ...prev, splittedMembers: selectedOptions }));
  };

  const billHandler = (e) => {
    e.preventDefault();
    console.log({ billForm });
    createBill({ ...billForm, groupId: currentGroup?.id, createdBy: uid });
    toggleBillModal();
  };

  const selectOptions = currentGroup?.members.map((user) => ({
    value: user?.uid,
    label: user?.userName,
  }));

  return (
    <div className="fixed inset-0 z-50 h-full w-full grid place-items-center">
      <div className="bg-white absolute z-50 mx-2 w-full md:w-[30rem] flex flex-col gap-2">
        <div className="flex items-center justify-between font-semibold px-2 py-2 border-b-2 border-gray-100">
          Create new group
          <div
            className="hover:bg-gray-100  w-9 h-9 flex items-center cursor-pointer justify-center xl:px-0"
            onClick={toggleBillModal}
          >
            <GrClose />
          </div>
        </div>
        <form className="p-2 px-4 flex flex-col gap-4" onSubmit={billHandler}>
          <div>
            <input
              className="w-full p-2 rounded border-1 border-gray-300"
              type="text"
              placeholder="Bill Name"
              name="name"
              onChange={(e) =>
                setBillForm((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <input
              className="w-full p-2 rounded border-1 border-gray-300"
              type="number"
              placeholder="Bill Amount"
              name="billAmount"
              onChange={(e) =>
                setBillForm((prev) => ({ ...prev, billAmount: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <h6 className="text-md   mb-1">Bill Paid By :</h6>

            <Select
              defaultValue={currentGroup?.members[0].uid}
              onChange={(e) => {
                setBillForm((prev) => ({
                  ...prev,
                  billPaidBy: e.value,
                }));
              }}
              options={selectOptions}
            />
          </div>
          <div>
            <h6 className="text-md ">Splitted Members :</h6>
            <MultiSelect
              optionsList={currentGroup?.members}
              addOptionsHandler={addOptionsHandler}
            />
          </div>
          <button
            className="w-fit bg-blue-600 p-1 px-2 md:p-2  md:px-4 self-center font-bold text-white rounded"
            type="submit"
          >
            Create Bill
          </button>
        </form>
      </div>
      <div className="h-full w-full  bg-[#e5e5e5] opacity-50"></div>
    </div>
  );
};

export { BillModal };
