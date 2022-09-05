import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { GrClose } from "react-icons/gr";
import { useAllUsers, useAuth, useData, useGroup } from "../../contexts";
import { MultiSelect } from "../multi-select/MultiSelect";

const GroupModal = () => {
  const { toggleModal, groupState, createGroup } = useGroup();

  const { isGroupModalOpen } = groupState;

  const {
    authState: { uid },
  } = useAuth();

  const { allUsers, findUserByUID } = useData();

  const [groupForm, setGroupForm] = useState({
    name: "",
    members: [findUserByUID(uid)],
  });

  const groupFromSubmitHandler = (e) => {
    e.preventDefault();
    createGroup(groupForm);
    toggleModal();
  };

  const addOptionsHandler = (selectedOptions) => {
    setGroupForm((prev) => ({ ...prev, members: selectedOptions }));
  };

  return (
    <Transition.Root show={isGroupModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 pt-8"
        onClose={toggleModal}
      >
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white h-fit rounded text-left overflow-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              <div className="flex items-center justify-between font-semibold px-2 py-2 border-b-2 border-gray-100">
                Create new group
                <div
                  className="hover:bg-gray-100  w-9 h-9 flex items-center cursor-pointer justify-center xl:px-0"
                  onClick={toggleModal}
                >
                  <GrClose />
                </div>
              </div>
              <form
                className="flex flex-col  p-4 md:mx-auto "
                onSubmit={groupFromSubmitHandler}
              >
                <div>
                  <input
                    className="w-full p-2 rounded border-1 border-gray-300"
                    type="text"
                    placeholder="Group name"
                    name="name"
                    onChange={(e) =>
                      setGroupForm((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="mt-3 font-semibold">Add Members : </div>
                <MultiSelect
                  optionsList={allUsers}
                  addOptionsHandler={addOptionsHandler}
                />

                <button
                  className="self-center bg-blue-500 w-fit px-2 py-1 font-semibold text-white rounded "
                  onClick={groupFromSubmitHandler}
                  disabled={
                    groupForm.members.length < 2 ||
                    groupForm.name.trim().length == 0
                  }
                >
                  Create Group
                </button>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export { GroupModal };
