import Column from "./Column.tsx";
import AvatarImage from "./AvatarImage.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import Row from "./Row.tsx";
import routers from "../Constants/routers.tsx";
import useNavigation from "../Utils/navigate.tsx";
import SidebarMenuItem from "./SidebarMenuItem.tsx";
import { stringToColor } from "../Utils/helpers.tsx";

const ReviewsPanel = ({
  handleSetSelected,
  isSelected,
  allReviewsCount,
  writeReviewCount,
  propertyReviewsCount,
}) => {
  const { goTo } = useNavigation();
  const { name, surname, image_data, username } = useSelector(
    (state: RootState) => state.authorizedUser.authorizedUser,
  );

  const bgColor = stringToColor(username);
  const initial = username.charAt(0).toUpperCase();

  const image = image_data ? `data:image/jpeg;base64,${image_data}` : undefined;

  return (
    <Column className="shadow pt-4 w-96">
      <Row className="gap-4 pl-4 pb-4">
        <AvatarImage
          fallbackText={initial}
          src={image}
          bgColor={bgColor}
          imageClassName="w-18 h-18 rounded-full object-cover p-4"
          rootClassName="w-18 h-18 rounded-full overflow-hidden p-4"
          fallbackClassName="w-full h-full flex items-center justify-center text-white font-medium p-4"
        />
        <Column className="pt-4 pr-4">
          <p className="font-bold">
            {name} {surname}
          </p>
          <p
            onClick={() => goTo(routers.personalData)}
            className="text-blue-600 cursor-pointer"
          >
            Edit Profile
          </p>
        </Column>
      </Row>
      <Column>
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
      </Column>
    </Column>
  );
};

export default ReviewsPanel;
