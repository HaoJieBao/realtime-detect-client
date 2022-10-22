import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Link, NavLink } from "react-router-dom";

const NavItem = ({
  to,
  children,
  external: isExternal,
}: PropsWithChildren<{ to: string; external?: boolean }>) => {
  if (isExternal) {
    return (
      <a className="py-3 px-4 text-lg hover:bg-gray-700" href={to}>
        {children}
      </a>
    );
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames("py-3 px-4 text-lg hover:bg-gray-700", {
          "bg-gray-800": isActive,
        })
      }
    >
      {children}
    </NavLink>
  );
};

export const MainNavigation = () => {
  return (
    <div className="fixed top-0 inset-x-0 bg-[#16191D]/80 text-white shadow-lg">
      <div className="container flex justify-between items-center mx-auto">
        <div className="flex justify-center items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <h1 className="text-2xl">
            <Link to="/">Hao Jie Bao</Link>
          </h1>
        </div>
        <nav className="flex text-lg">
          <NavItem to="/feature">Feature</NavItem>
          <NavItem to="https://github.com/HaoJieBao" external>
            About Us
          </NavItem>
        </nav>
      </div>
    </div>
  );
};
