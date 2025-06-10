import FooterColumnMobile from "./FooterColumn.tsx";
import {corporate, help, legal, quickLinks, travelProfessionals} from "../../Constants/footer.tsx";
import ContactInfo from "../ContactInfo.tsx";
import React from "react";

const MobileFooterColumn = () => {
  return(
    <div className="container flex justify-center px-4 py-8 w-full">
      <div className="flex flex-col w-full md:hidden">
        <FooterColumnMobile title="Quick links" links={quickLinks} />
        <FooterColumnMobile title="Travel professionals" links={travelProfessionals} />
        <FooterColumnMobile title="Corporate" links={corporate} />
        <FooterColumnMobile title="Legal" links={legal} />
        <FooterColumnMobile title="Help" links={help} />
        <ContactInfo />
      </div>
    </div>
  )
}

export default MobileFooterColumn;
