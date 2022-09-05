import { NavItem } from "../../components";
import { NAV_ITEMS } from "../../utils";

const Drawer = () => {
  return (
    <nav className="hidden lg:block fixed left-0 h-screen w-[13rem] lg:w-[15rem] overflow-y-auto border-r-2 border-gray-150">
      <ul className="list-none text-left">
        {NAV_ITEMS.map((navItem) => (
          <NavItem key={navItem.id} {...navItem} />
        ))}
      </ul>
    </nav>
  );
};

export { Drawer };
