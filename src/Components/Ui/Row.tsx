const Row = ({ className = "", key, children, onClick }) => {
  return (
    <div onClick={onClick} className={`flex flex-row ${className}`} key={key}>
      {children}
    </div>
  );
};

export default Row;
