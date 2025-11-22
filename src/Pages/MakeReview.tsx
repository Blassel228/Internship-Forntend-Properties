import { useLocation } from "react-router-dom";
import Row from "../Components/Ui/Row.tsx";
import ReviewForm from "../Feature/MakeReview/Components/ReviewForm.tsx";
import { useEffect } from "react";
import useRoom from "../Hooks/useRoom.tsx";

const MakeReview = () => {
  const location = useLocation();
  const roomId = location.state?.roomId;
  const { room, isRoomLoading, isError } = useRoom(roomId || "");
  useEffect(() => {}, [roomId, room, location.state]);

  if (!roomId || isRoomLoading) {
    return (
      <>
        <Row className="pt-40 pb-20 min-h-screen justify-center items-center">
          <p className="text-gray-600">Loading your stay details...</p>
        </Row>
      </>
    );
  }

  if (isError || !room) {
    return (
      <>
        <Row className="pt-40 pb-20 min-h-screen justify-center items-center">
          <p className="text-red-600">
            Failed to load room details. Please try again.
          </p>
        </Row>
      </>
    );
  }

  return (
    <>
      <Row className="pt-40 pb-20 min-h-screen justify-center">
        <ReviewForm room={room} />
      </Row>
    </>
  );
};

export default MakeReview;
