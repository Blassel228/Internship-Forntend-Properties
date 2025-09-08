const FixedLabel = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className="min-w-[120px] max-w-[32px] w-24 flex-shrink-0 flex-grow-0"
      style={{ minWidth: "5rem", maxWidth: "5rem", width: "5rem" }}
    >
      <label className="font-medium truncate block">{children}</label>
    </div>
  );
};

export default FixedLabel;
