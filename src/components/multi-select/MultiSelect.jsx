import { v4 as uuid } from "uuid";
import { IoMdCloseCircle } from "react-icons/io";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useAuth, useData } from "../../contexts";
import { useLocation } from "react-router-dom";

const Option = ({ optionText, addToSelectedOptions, isSelected, uid }) => {
  return (
    <div
      className={`cursor-pointer w-full border-gray-100 border-b hover:bg-teal-100 ${
        isSelected && "bg-gray-100 border-l-2 border-b-0 border-blue-300"
      }`}
      onClick={() => addToSelectedOptions(uid)}
    >
      <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-teal-100">
        <div className="w-full items-center flex">
          <div className="mx-2 leading-6">{optionText} </div>
        </div>
      </div>
    </div>
  );
};

const Chip = ({ optionText, deleteFromSelectedOptions, uid }) => {
  return (
    <div className="h-[1.25rem] flex justify-center items-center m-1 font-medium py-1 px-1.5 bg-white rounded-full text-teal-700 bg-teal-100 border border-teal-300 ">
      <div className="text-xs font-normal leading-none max-w-full flex-initial">
        {optionText}
      </div>
      <div className="flex flex-auto flex-row-reverse">
        <div onClick={() => deleteFromSelectedOptions(uid)}>
          <IoMdCloseCircle />
        </div>
      </div>
    </div>
  );
};

const MultiSelect = ({ optionsList, addOptionsHandler }) => {
  const [showDropdown, setShowDropdown] = useState(true);

  const { findUserByUID } = useData();

  const location = useLocation();

  const isAllGroups = location.pathname === "/";

  const {
    authState: { uid },
  } = useAuth();

  const [selectedOptions, setSelectedOptions] = useState([]);

  const checkIsOptionSelected = (id) => {
    return selectedOptions.find((option) => id === option?.uid) !== undefined;
  };

  const addToSelectedOptions = (id) => {
    if (!checkIsOptionSelected(id)) {
      setSelectedOptions((prevState) => [...prevState, findUserByUID(id)]);
    }
  };

  const deleteFromSelectedOptions = (id) => {
    if (uid !== id || !isAllGroups) {
      setSelectedOptions((prev) => prev.filter(({ uid }) => id !== uid));
    }
  };

  const toggleDropDown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    addOptionsHandler(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className="w-full  flex flex-col items-center h-64 mx-auto">
      <div className="w-full ">
        <div className="flex flex-col items-center relative">
          <div className="w-full">
            <div className="my-2 p-1 flex border border-gray-200 bg-white rounded ">
              <div className="flex flex-auto flex-wrap max-h-[5rem] overflow-auto">
                {selectedOptions.length > 0 &&
                  selectedOptions.map((option) => (
                    <Chip
                      key={uuid()}
                      optionText={option?.userName}
                      uid={option?.uid}
                      deleteFromSelectedOptions={deleteFromSelectedOptions}
                    />
                  ))}

                <div className="flex-1">
                  <input
                    placeholder=""
                    className="bg-transparent p-1 px-2 appearance-none outline-none h-full w-full text-gray-800"
                  />
                </div>
              </div>
              <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200 svelte-1l8159u">
                <button
                  className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none"
                  onClick={toggleDropDown}
                >
                  <HiOutlineArrowSmDown />
                </button>
              </div>
            </div>
          </div>
          {showDropdown && (
            <div className="absolute shadow top-[100%] bg-white z-40 w-full left-0 rounded h-[10rem] overflow-y-auto">
              {optionsList.map(({ uid, userName }) => {
                return (
                  <Option
                    key={uuid()}
                    optionText={userName}
                    uid={uid}
                    isSelected={checkIsOptionSelected(uid)}
                    addToSelectedOptions={addToSelectedOptions}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { MultiSelect };
