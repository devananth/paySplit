import { Link } from "react-router-dom";

const NavItem = ({ url, name }) => {
  return (
    <Link to={url}>
      <li className="p-4 font-semibold hover:bg-gray-100 text-black text-lg">
        <span>{name}</span>
      </li>
    </Link>
  );
};

export { NavItem };
