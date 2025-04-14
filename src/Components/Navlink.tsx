import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const NavLink = ({ to, children }: NavLinkProps) => {
  return (
    <Link to={to} className="text-gray-700 hover:text-gray-900 font-bold">
      {children}
    </Link>
  );
};

export default NavLink;
