import { PASSWORD_REGEX, EMAIL_REGEX } from "./constants";

const signUpFormValidation = (values) => {
  const { userName, emailId, password, confirmPassword } = values;

  const errors = {};

  if (!userName) {
    errors.firstName = "Please enter the Username";
  }

  if (!values.emailId) {
    errors.emailId = "Please enter the Email Id";
  } else if (!EMAIL_REGEX.test(emailId)) {
    errors.emailId = "Invalid email address";
  }

  if (!password) {
    errors.password = "Please enter the Password";
  } else if (!PASSWORD_REGEX.test(password)) {
    errors.password =
      "Must be minimum 8 characters, atleast 1 symbol, atleast 1 digits";
  }

  if (!confirmPassword) {
    errors.confirmPassword = "Please enter the Confirm Password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Password and confirm password doesn't match";
  }

  return errors;
};

export { signUpFormValidation };
