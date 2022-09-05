import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginFormValidation } from "../../utils";
import moneyAnimation from "../../assets/MoneyAnimation.json";
import { useAuth } from "../../contexts";

const initialLoginFormValues = {
  emailId: "",
  password: "",
};

const Login = () => {
  const { loginHandler } = useAuth();

  const { handleSubmit, values, handleChange, touched, errors } = useFormik({
    initialValues: initialLoginFormValues,
    onSubmit: loginHandler,
    validate: loginFormValidation,
  });

  const { emailId, password } = values;

  return (
    <main className="min-h-screen flex flex-col gap-8 lg:flex-row lg:gap-0 content-center">
      <div className="w-[18rem] lg:w-[40%] lg:mx-3 mx-auto mt-8  lg:m-0 self-center">
        <Lottie animationData={moneyAnimation} loop={true} />
      </div>
      <section className="sm:bg-gray-100 lg:w-[60%] flex flex-row items-center">
        <div className="h-fit shadow-lg  flex flex-col justify-center gap-4 sm:bg-white sm:w-[25rem] sm:mx-auto sm:my-4 lg:w-[30rem] lg:py-8 rounded">
          <h1 className="text-xl font-bold my-4">Sign In to PaySplit</h1>
          <form
            className="flex flex-col gap-8 p-4 md:w-[25rem] md:mx-auto "
            onSubmit={handleSubmit}
          >
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

            <button
              type="submit"
              className="w-100% bg-black text-white font-semibold rounded-[2rem] py-3"
            >
              Login
            </button>
          </form>
          <div className="my-4">
            <span className="text-gray-500">
              Don't have an account ?{" "}
              <Link to="/signup" className="text-blue-500 underline">
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </section>
    </main>
  );
};
export { Login };
