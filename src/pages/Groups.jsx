import { v4 as uuid } from "uuid";
import {
  Drawer,
  GroupCard,
  GroupModal,
  Header,
  MobileNavbar,
} from "../components";
import { useGroup } from "../contexts";

const Groups = () => {
  const { groupState, groupDispatch, toggleModal } = useGroup();

  const { isGroupModalOpen, groups } = groupState;

  return (
    <main className="min-h-screen mt-[4rem] lg:ml-[15rem]">
      <Header />
      <div className="flex flex-row min-h-screen h-full">
        <Drawer />
        <section className="p-4 min-h-screen h-full w-full flex flex-col justify-items-start text-left bg-gray-50">
          <button
            className="w-fit bg-blue-600 p-1 px-2 md:p-2  md:px-4 font-bold text-white rounded"
            onClick={toggleModal}
          >
            Create Group
          </button>

          <div className="mt-4 lg:mt-6 ">
            <h3 className="text-2xl font-semibold text-ellipsis">My Groups</h3>
            <div className="grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 place-items-center  gap-8 m-3 mt-5">
              {groups.length === 0 ? (
                <h4>No groups found</h4>
              ) : (
                groups.map((group) => <GroupCard key={uuid()} {...group} />)
              )}
            </div>
          </div>
        </section>
      </div>
      <MobileNavbar />
      {isGroupModalOpen && <GroupModal />}
    </main>
  );
};

export { Groups };
