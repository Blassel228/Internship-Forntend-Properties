const Row = ({ className = "", key, children }) => {
  return <div className={`flex flex-row ${className}`} key={key}>{children}</div>;
};

export default Row;
