import { PASSWORD_REGEX, EMAIL_REGEX } from "./constants";

const loginFormValidation = (values) => {
  const { emailId, password } = values;

  const errors = {};

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
  return errors;
};

export { loginFormValidation };
