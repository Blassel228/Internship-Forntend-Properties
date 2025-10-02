const AdminTableRow = ({ children, ...props}, ref) => {
  return(
    <tr className="border-b border-orange-100 hover:bg-orange-50 transition-colors" {...props} ref={ref}>{children}</tr>
  )
}

export default AdminTableRow;