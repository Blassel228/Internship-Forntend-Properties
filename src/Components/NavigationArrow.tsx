type NavigationArrowProps = {
  direction: "left" | "right";
  onClick: () => void;
};

const NavigationArrow = ({ direction, onClick }: NavigationArrowProps) => {
  const arrowPoints =
    direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6";

  return (
    <button
      onClick={onClick}
      className="bg-white p-2 rounded-full text-gray-500 hover:text-gray-800"
      aria-label={`Navigate ${direction}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <polyline points={arrowPoints}></polyline>
      </svg>
    </button>
  );
};

export default NavigationArrow;
