import React, { useEffect, useState } from "react";
import RoomDetailsContentSection from "./RoomDetailsContentSection.tsx";
import { useNavigate } from "react-router-dom";
import AdditionalRoomInfo from "./AdditionalRoomInfo.tsx";
import AppButton from "./AppButton.tsx";
import routers from "../Constants/routers.tsx";
import useSearchParams from "../Hooks/useSearchParams.tsx";
import KeyDetails from "./KeyDetails.tsx";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import ReviewSection from "./ReviewSection.tsx";
import { getReviewCount } from "../Api/apiReview.tsx";

export const RoomOverview = ({ room }) => {
  const navigate = useNavigate();
  const { startDate, endDate, capacity } = useSearchParams();
  const [reviewCount, setReviewCount] = useState<number | null>(null);

  useEffect(() => {
    const fetchReviewCount = async () => {
      try {
        const count = await getReviewCount(room.id);
        setReviewCount(count);
      } catch (error) {
        console.error("Failed to fetch review count:", error);
      }
    };

    if (room?.id) {
      fetchReviewCount();
    }
  }, [room.id]);

  const handleNavigate = () => {
    navigate(
      {
        pathname: `${routers.book}/${room.id}`,
        search: `?start_date=${startDate}&end_date=${endDate}&capacity=${capacity}`,
      },
      { state: { room, reviewCount } },
    );
  };

  const imageSrc = room.image?.startsWith("data:image")
    ? room.image
    : `data:image/png;base64,${room.image}`;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <div className="hidden lg:block">
        <Row className="gap-8">
          <Column className="w-3/4">
            <img
              src={imageSrc}
              className="w-full h-96 object-cover rounded-lg shadow-md"
              alt="Room"
            />
            <Row className="mt-4 items-center justify-between gap-3">
              <Row className="flex-wrap gap-2">
                <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
                <AdditionalRoomInfo>Has {room.bedrooms} bedrooms</AdditionalRoomInfo>
                <AdditionalRoomInfo>For {room.capacity} persons</AdditionalRoomInfo>
                {room.has_jacuzzi && <AdditionalRoomInfo>Jacuzzi available</AdditionalRoomInfo>}
              </Row>
              <AppButton className="py-2 px-4" onClick={handleNavigate}>
                Make Booking
              </AppButton>
            </Row>
          </Column>

          <Column className="w-1/4">
            <KeyDetails room={room} />
          </Column>
        </Row>

        <Column className="mt-8">
          <RoomDetailsContentSection room={room} />
          <ReviewSection room={room} />
        </Column>
      </div>

      <Column className="lg:hidden gap-8">
        <img
          src={imageSrc}
          className="w-full h-64 sm:h-80 object-cover rounded-lg shadow-md"
          alt="Room"
        />
        <Row className="flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <Row className="flex-wrap gap-2">
            <AdditionalRoomInfo>{room.type}</AdditionalRoomInfo>
            <AdditionalRoomInfo>Has {room.bedrooms} bedrooms</AdditionalRoomInfo>
            <AdditionalRoomInfo>For {room.capacity} persons</AdditionalRoomInfo>
            {room.has_jacuzzi && <AdditionalRoomInfo>Jacuzzi available</AdditionalRoomInfo>}
          </Row>
          <AppButton className="w-full sm:w-auto sm:h-[1rem] py-2 px-4" onClick={handleNavigate}>
            Make Booking
          </AppButton>
        </Row>

        <KeyDetails room={room} />

        <RoomDetailsContentSection room={room}/>
        <ReviewSection room={room} />
      </Column>
    </div>
  );
};