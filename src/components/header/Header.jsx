import { useAuth } from "../../contexts";

const Header = () => {
  const { logoutHandler } = useAuth();

  return (
    <header className="h-[4rem] px-[2rem] fixed inset-0 z-40 bg-white flex flex-row justify-between items-center border-2 border-bottom-black">
      <h1 className="text-xl font-bold">PaySplit</h1>
      <button
        className="bg-blue-600 font-bold text-white p-1 px-4 rounded-[2rem]"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </header>
  );
};

export { Header };
