import Row from "../../Components/Ui/Row.tsx";
import SidebarMenuItem from "./SidebarMenuItem.tsx";

const ReviewsPanel = ({
  handleSetSelected,
  isSelected,
  allReviewsCount,
  writeReviewCount,
  propertyReviewsCount,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <Row className="min-w-full px-2 sm:px-6 py-3 bg-white shadow-sm rounded-xl items-center justify-center gap-2 sm:gap-6 whitespace-nowrap">
        <SidebarMenuItem
          onClick={() => handleSetSelected(1)}
          sectionName="All reviews"
          count={allReviewsCount}
          isSelected={isSelected === 1}
        />
        <SidebarMenuItem
          onClick={() => handleSetSelected(2)}
          sectionName="Reviewed"
          count={propertyReviewsCount}
          isSelected={isSelected === 2}
        />
        <SidebarMenuItem
          onClick={() => handleSetSelected(3)}
          sectionName="Not reviewed"
          count={writeReviewCount}
          isSelected={isSelected === 3}
        />
      </Row>
    </div>
  );
};

export default ReviewsPanel;
