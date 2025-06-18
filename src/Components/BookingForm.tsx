import React, { useState } from "react";
import { BookingCreate, Room } from "../Types/types.tsx";
import { createBooking } from "../Api/apiBooking.tsx";
import { useMutation } from "@tanstack/react-query";

interface BookingFormProps {
  room: Room;
}

const BookingForm: React.FC<BookingFormProps> = ({ room }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (booking: BookingCreate) => createBooking(booking),
    onSuccess: () => {
      setStartDate("");
      setEndDate("");
      setError("");
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to create booking. Please try again.");
    }
  });

  const handleBooking = () => {
    setError("");
    if (!startDate || !endDate) {
      setError("Choose both start-date and end-date.");
      return;
    }

    const booking: BookingCreate = {
      end_date: endDate,
      start_date: startDate,
      room_id: room.id
    };

    console.log("DATES: ", startDate, endDate);
    mutate(booking);
  };

  return (
    <div className="flex justify-center flex-col py-24">
      <div className="flex flex-row gap-4 justify-center items-center  w-full">
        <input
          type="date"
          id="start-date"
          value={startDate}
          onChange={(e) => {
            setStartDate(e.target.value);
            setEndDate("");
          }}
          disabled={isPending}
          className="border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 border-2 w-[15%]"
        />
        <input
          type="date"
          id="end-date"
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={isPending}
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-indigo-500 w-[15%]"
        />

        <button
          onClick={handleBooking}
          disabled={isPending}
          className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 transition h-10 w-auto"
        >
          {isPending ? "Booking..." : "Book Now"}
        </button>
      </div>
      <div className="flex justify-center">
         {isSuccess && (
            <p className="text-green-500">Booking successful!</p>
          )}
          <p className={`text-red-500 text-sm ${error ? "visible" : "invisible"}`}>
            {error || "\u00A0"}
          </p>
      </div>
    </div>
  );
};

export default BookingForm;