import React from "react";
import { FaPhone } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="mt-4 flex items-center space-x-2">
      <FaPhone className="text-xl" />
      <span>+1 (650) 555-0198</span>
    </div>
  );
};

export default ContactInfo;
