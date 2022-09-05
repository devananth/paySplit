import { NavItem } from "../../components";
import { NAV_ITEMS } from "../../utils";

const MobileNavbar = () => {
  return (
    <nav className="lg:hidden h-[4rem] z-50 fixed bottom-0 left-0 right-0  bg-white border-t-2 border-gray-150">
      <ul className="list-none flex flex-row justify-between items-center text-center">
        {NAV_ITEMS.map((navItem) => (
          <NavItem key={navItem.id} {...navItem} />
        ))}
      </ul>
    </nav>
  );
};

export { MobileNavbar };
