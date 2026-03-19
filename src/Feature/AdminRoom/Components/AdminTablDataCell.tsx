const AdminTablDataCell = ({ children, ...props }, ref) => {
  return (
    <td className="p-3 font-medium text-gray-800" {...props} ref={ref}>
      {children}
    </td>
  );
};

export default AdminTablDataCell;
