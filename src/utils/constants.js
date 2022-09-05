import { v4 as uuid } from "uuid";

const PASSWORD_REGEX = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const NAV_ITEMS = [
  {
    id: uuid(),
    url: "/",
    name: "Groups",
  },
  {
    id: uuid(),
    url: "/payments",
    name: "Payments",
  },
];

export { PASSWORD_REGEX, EMAIL_REGEX, NAV_ITEMS };
