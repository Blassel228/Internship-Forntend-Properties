import Column from "./Column.tsx";

const ContainerWithBorders = ({ children, className }) => {
  return (
    <Column
      className={`
        border-gray-300 
        border 
        w-full 
        p-4               
        gap-2
        rounded-lg         
        bg-white          
        shadow-sm         
        ${className || ""}
      `}
    >
      {children}
    </Column>
  );
};

export default ContainerWithBorders;