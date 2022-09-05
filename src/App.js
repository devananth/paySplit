import "./App.css";
import { useDocumentTitle } from "./custom-hooks";
import { BillModal } from "./components";
import { useGroup } from "./contexts";
import { AllRoutes } from "./routes/AllRoutes";

function App() {
  useDocumentTitle("PaySplit");

  const {
    groupState: { isBillModalOpen },
  } = useGroup();

  return (
    <>
      <div className="App min-h-screen w-full overflow-x-hidden">
        <AllRoutes />
      </div>
      {isBillModalOpen && <BillModal />}
    </>
  );
}

export default App;
