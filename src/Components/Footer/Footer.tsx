import React from "react";
import DesktopFooterColumns from "./DesktopFooterColumn.tsx";
import MobileFooterColumn from "./MobileFooterColumn.tsx";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black">
        <MobileFooterColumn />
        <DesktopFooterColumns />
      <div className="border-t border-gray-700 text-sm text-gray-400 py-4">
        <p className="container mx-auto px-4">
          © 2023 Radisson Hotel Group. All rights reserved. RHG Radisson Hotel Group, Radisson, Radisson RED, Radisson Blu, Radisson Collection, Radisson Individuals, Park Plaza, Park Inn, Country Inn & Suites, Prize by Radisson, Radisson Rewards, and Radisson Meetings are trademarks of Radisson Hotel Group.
        </p>
      </div>
    </footer>
  );
};

export default Footer;