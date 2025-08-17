import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link
      to={to}
      className="text-black font-sans text-sm font-medium hover:text-gray-900"
    >
      {children}
    </Link>
  );
};

export default NavLink;
