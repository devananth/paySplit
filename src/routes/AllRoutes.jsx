import { Routes, Route } from "react-router-dom";
import { ProtectedRoutes } from "./ProtectedRoutes";
import {
  Home,
  Login,
  SignUp,
  Groups,
  GroupDetails,
  BillDetails,
  Payments,
} from "../pages";
const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<Groups />} />
        <Route path="/groups/:id" element={<GroupDetails />} />
        <Route path="/bills/:id" element={<BillDetails />} />
        <Route path="/payments" element={<Payments />} />
      </Route>
    </Routes>
  );
};

export { AllRoutes };
