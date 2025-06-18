import Column from "./Column.tsx";

const ContainerWithBorders = ({ children, className }) => {
  return(
    <Column className={`border-gray-300 border w-full px-5 py-3 gap-2 ${className}`}>{children}</Column>
  )
}

export default ContainerWithBorders;