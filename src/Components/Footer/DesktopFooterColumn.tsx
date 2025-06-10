import React from "react";
import { quickLinks, travelProfessionals, corporate, legal, help } from "../../Constants/footer.tsx";
import ContactInfo from "../ContactInfo.tsx";

const DesktopFooterColumns = () => {
  return (
    <div className="hidden justify-center md:flex md:flex-row gap-8 mb-5">
      <FooterColumnDesktop title="Quick links" links={quickLinks} />
      <FooterColumnDesktop title="Travel professionals" links={travelProfessionals} />
      <FooterColumnDesktop title="Corporate" links={corporate} />
      <FooterColumnDesktop title="Legal" links={legal} />
      <div>
        <FooterColumnDesktop title="Help" links={help} />
        <ContactInfo />
      </div>
    </div>
  );
};

const FooterColumnDesktop = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a href={link.href} className="hover:text-gray-400">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DesktopFooterColumns;