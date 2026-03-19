const Row = ({ className = "", key, children, onClick, ...props }) => {
  return (
    <div onClick={onClick} className={`flex flex-row ${className}`} key={key} {...props}>
      {children}
    </div>
  );
};

export default Row;
