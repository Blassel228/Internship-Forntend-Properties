import Row from "./Row.tsx";
import Column from "./Column.tsx";
import React, {useEffect} from "react";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import CustomCheckbox from "./CustomCheckbox.tsx";
import {useForm} from "react-hook-form";
import useCreateBooking from "../Hooks/useCreateBooking.tsx";
import {BookingCreate, GuestCreate} from "../Types/types.tsx";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import calculaterNights from "../Utils/calculateNights.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import RequiredStar from "./RequiredStar.tsx";

const BasicDetailsInputSection = ({ room }) => {
  const user = useSelector((state: RootState) => state.authorizedUser.authorizedUser);

  const { register, handleSubmit } = useForm();
  const { startDate, endDate} = useBookingParams();
  let nights = calculaterNights(startDate, endDate);
  const { mutate: bookingMutate } = useCreateBooking();

  useEffect(() => {
    console.log(user)
  })

  const onSubmit = (data) => {
    const isMainGuest = data.mainGuest === "true";

    const guest: GuestCreate = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone,
      country: data.country,
      whether_send_confirmation: data.wantsEmailConfirmation,
      is_booking_for_me: isMainGuest
    };

    const booking: BookingCreate = {
      price: nights * room.price,
      start_date: startDate,
      end_date: endDate,
      room_id: room.id,
      special_requests: data.specialRequests || ""
    };

    bookingMutate({ booking, guest });
  };

  return (
    <form className="userInfoSection w-full h-full gap-5 flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <ContainerWithBorders className="basicDataSection">
        <div>
          <h1 className="font-bold text-xl">Enter your data</h1>
          <p className="text-green-600 leading-7 text-[13px]">
            Everything is almost done! All remains is entering your data.<br />
            Please enter your data in Latin, so the administration could understand it.
          </p>
        </div>
        <Row className="w-full gap-5">
          <Column className="w-[23rem]">
            <label htmlFor="name">Name (latin)<RequiredStar /></label>
            <input
              defaultValue={user?.name || ""}
              className="border rounded pl-2 py-1 w-full"
              type="text"
              id="name"
              placeholder="For example: John"
              {...register("name", { required: "Name is required" })}
            />
          </Column>

          <Column className="w-[23rem]">
            <label htmlFor="surname">Surname (latin)<RequiredStar /></label>
            <input
              defaultValue={user?.surname || ""}
              className="border rounded pl-2 py-1 w-full"
              type="text"
              id="surname"
              placeholder="For example: Smith"
              {...register("surname", { required: "Surname is required" })}
            />
          </Column>
        </Row>
        <Column className="w-[23rem] gap-1">
          <label htmlFor="email" >Email Address<RequiredStar /></label>
          <input
            defaultValue={user?.email || ""}
            className="border rounded pl-2 py-1 w-full"
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          <p className="text-xs">Booking confirmation will be sent to here.</p>
        </Column>
        <Column className="w-[23rem]">
          <Row>
            <label htmlFor="country">Country/region <RequiredStar /></label>
          </Row>
          <input
            className="border rounded pl-2 py-1 w-full"
            type="text"
            id="country"
            {...register("country", { required: "Country is required" })}
          />
        </Column>
        <Column className="w-[23rem] gap-1">
          <label htmlFor="phone">Phone (latin)<RequiredStar /></label>
          <input
            defaultValue={user?.phone_number || ""}
            className="border rounded pl-2 py-1 w-full"
            type="tel"
            id="phone"
            {...register("phone", { required: "Phone number is required" })}
          />
          <p className="text-xs">To confirm your booking and allow the accommodation team to contact you if needed.</p>
        </Column>
        <Row>
          <CustomCheckbox {...register("wantsEmailConfirmation")} />
          <p className="text-xs ml-2 content-center">Yes, I want to get an electronic confirmation to my Email address.</p>
        </Row>
        <Column className="gap-2">
          <h1 className="font-bold">Who are you booking for?</h1>
          <Row>
            <input
              type="radio"
              {...register("mainGuest")}
              className="h-6 w-6"
              value="true"
              defaultChecked
            />
            <p className="text-xs content-center ml-2">I am the main guest</p>
          </Row>
          <Row>
            <input
              type="radio"
              {...register("mainGuest")}
              className="h-6 w-6"
              value="false"
            />
            <p className="text-xs content-center ml-2">This booking is not for me</p>
          </Row>
        </Column>
      </ContainerWithBorders>
      <ContainerWithBorders>
        <h1 className="font-bold text-xl">Useful to know</h1>
        <p className="leading-7">
          Keep yourself free: you can cancel booking for free before 17th of July,
          so make a booking for this wonderful price now!
        </p>
      </ContainerWithBorders>
      <ContainerWithBorders>
        <h1 className="font-bold text-xl">Write your special requests</h1>
        <p className="leading-7">
          Fulfillment of special requests is not guaranteed, but the accommodation administration will do everything possible to meet your needs. You can always submit a request or special request after completing the booking!
        </p>
        <label htmlFor="specialRequests">
          Please write your request in English or these languages: Korean (optional).
        </label>
        <textarea
          id="specialRequests"
          className="border rounded p-2 mt-2 w-full resize-none min-h-[100px]"
          placeholder="Enter your special requests here..."
          {...register("specialRequests")}
        />
      </ContainerWithBorders>
      <div className="mt-4 w-full flex">
        <button
          type="submit"
          className="bg-blue-500 ml-auto mb-10 text-white px-6 py-4 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Next: Finalize details
        </button>
      </div>
    </form>
  );
};

export default BasicDetailsInputSection;