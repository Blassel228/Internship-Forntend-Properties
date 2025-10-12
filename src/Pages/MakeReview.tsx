import FullHeader from "../Components/Header/FullHeader.tsx";
import Footer from "../Components/Footer/Footer.tsx";
import useGetRoom from "../Hooks/useGetRoom";
import {useLocation} from "react-router-dom";
import Row from "../Components/Row.tsx";
import ReviewForm from "../Components/ReviewForm.tsx";
import {useEffect} from "react";

const MakeReview = () => {
  const location = useLocation();
  const roomId = location.state?.roomId;
  console.log("ROOM ID", roomId);
  const { room, isRoomLoading, isError } = useGetRoom(roomId || "");
  useEffect(() => {
    console.log("LOCATION STATE:", location.state);
    console.log("ROOM ID:", roomId);
    console.log("ROOM:", room);
  }, [roomId, room, location.state]);

  if (!roomId || isRoomLoading) {
    return (
      <>
        <FullHeader />
        <Row className="pt-40 pb-20 min-h-screen justify-center items-center">
          <p className="text-gray-600">Loading your stay details...</p>
        </Row>
        <Footer />
      </>
    );
  }

  if (isError || !room) {
    return (
      <>
        <FullHeader />
        <Row className="pt-40 pb-20 min-h-screen justify-center items-center">
          <p className="text-red-600">
            Failed to load room details. Please try again.
          </p>
        </Row>
        <Footer />
      </>
    );
  }

  return (
    <>
      <FullHeader />
      <Row className="pt-40 pb-20 min-h-screen justify-center">
        <ReviewForm room={room} />
      </Row>
      <Footer />
    </>
  );
};

export default MakeReview;
