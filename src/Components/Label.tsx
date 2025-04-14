import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ children, ...rest }) => {
  return (
    <label className="block text-sm font-medium text-gray-700" {...rest}>
      {children}
    </label>
  );
};

export default Label;
