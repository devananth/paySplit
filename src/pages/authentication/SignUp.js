import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import moneyAnimation from "../../assets/MoneyAnimation.json";
import { signUpFormValidation } from "../../utils";
import { useAuth } from "../../contexts";
import { useEffect } from "react";

const SignUp = () => {
  const initialSignUpFormValues = {
    userName: "",
    emailId: "",
    password: "",
    confirmPassword: "",
  };

  const { signUpHandler } = useAuth();

  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: { ...initialSignUpFormValues },
    validate: signUpFormValidation,
    onSubmit: signUpHandler,
  });

  const { userName, emailId, password, confirmPassword } = values;

  return (
    <main className="min-h-screen flex flex-col gap-8 lg:flex-row lg:gap-0 content-center">
      <div className="w-[18rem] lg:w-[40%] lg:mx-3 mx-auto mt-8  lg:m-0 self-center">
        <Lottie animationData={moneyAnimation} loop={true} />
      </div>
      <section className="sm:bg-gray-100 lg:w-[60%] w-full sm:flex sm:flex-row sm:items-center ">
        <div className="h-fit shadow-lg flex flex-col justify-center  gap-4 sm:bg-white sm:w-[25rem] sm:mx-auto sm:my-8 lg:w-[30rem] lg:py-8 rounded">
          <h1 className="text-xl font-bold my-4">Join to PaySplit</h1>
          <form
            className="flex flex-col gap-8 p-4 md:w-[25rem] md:mx-auto "
            onSubmit={handleSubmit}
          >
            <div>
              <input
                className="w-full p-2 rounded border-1 border-gray-300"
                type="text"
                placeholder="Username"
                name="userName"
                value={userName}
                onChange={handleChange}
              />
              {touched.userName && errors.firstName && (
                <span className="block text-red-600 text-left">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div>
              <input
                className="w-full p-2 rounded border-1 border-gray-300"
                type="email"
                placeholder="Email ID"
                name="emailId"
                value={emailId}
                onChange={handleChange}
              />
              {touched.emailId && errors.emailId && (
                <span className="block text-red-600 text-left">
                  {errors.emailId}
                </span>
              )}
            </div>

            <div>
              <input
                className="w-full p-2 rounded border-1 border-gray-300"
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              {touched.password && errors.password && (
                <span className="block text-red-600 text-left">
                  {errors.password}
                </span>
              )}
            </div>

            <div>
              <input
                className="w-full p-2 rounded border-1 border-gray-300"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <span className="block text-red-600 text-left">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="w-100% bg-black text-white font-semibold rounded-[2rem] py-3"
            >
              SignUp
            </button>
          </form>
          <div className="my-4">
            <span className="text-gray-500">
              Alread have an account ?{" "}
              <Link to="/login" className="text-blue-500 underline">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};
export { SignUp };
