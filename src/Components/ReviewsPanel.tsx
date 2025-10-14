import Row from "./Row.tsx";
import SidebarMenuItem from "./SidebarMenuItem.tsx";

const ReviewsPanel = ({
  handleSetSelected,
  isSelected,
  allReviewsCount,
  writeReviewCount,
  propertyReviewsCount,
}) => {
  return (
    <Row className="w-[70%] px-6 gap-8 py-3 bg-white shadow-md rounded-2xl items-center justify-center">
      <SidebarMenuItem
        onClick={() => handleSetSelected(1)}
        sectionName="All reviews"
        count={allReviewsCount}
        isSelected={isSelected === 1}
      />
      <SidebarMenuItem
        onClick={() => handleSetSelected(2)}
        sectionName="Property reviews"
        count={propertyReviewsCount}
        isSelected={isSelected === 2}
      />
      <SidebarMenuItem
        onClick={() => handleSetSelected(3)}
        sectionName="Write a review"
        count={writeReviewCount}
        isSelected={isSelected === 3}
      />
    </Row>
  );
};

export default ReviewsPanel;
