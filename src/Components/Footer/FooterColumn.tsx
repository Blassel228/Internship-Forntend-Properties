import React from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FooterColumnProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterColumnMobile = ({ title, links }: FooterColumnProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="w-full border-b-2 py-2 md:hidden">
      <button
        className="w-full flex justify-between items-center text-lg font-bold py-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {title}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>
      {isOpen && (
        <ul className="space-y-2 pl-2 pb-4">
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="hover:text-gray-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FooterColumnMobile;