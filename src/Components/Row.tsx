const Row = ({ className = "", children }) => {
  return(
    <div className={`flex flex-row ${className}`}>
      { children }
    </div>
  )
}

export default Row;