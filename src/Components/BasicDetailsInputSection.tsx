import React, { useEffect, useState } from "react";
import Row from "./Row.tsx";
import Column from "./Column.tsx";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import CustomCheckbox from "./CustomCheckbox.tsx";
import { useForm } from "react-hook-form";
import useCreateBooking from "../Hooks/useCreateBooking.tsx";
import { BookingCreate, GuestCreate } from "../Types/types.tsx";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import calculaterNights from "../Utils/calculateNights.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import RequiredStar from "./RequiredStar.tsx";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import RegistrationFormError from "./RegistrationFormError.tsx";

const BasicDetailsInputSection = ({ room }) => {
  const user = useSelector((state: RootState) => state.authorizedUser.authorizedUser);

  const [country, setCountry] = useState<string>(user.country || "");

  const { register, handleSubmit, setError, formState: { errors }, clearErrors } = useForm();
  const [phoneNumber, setPhoneNumber] = useState<string>(user?.phone_number || "");
  const { startDate, endDate } = useBookingParams();
  let nights = calculaterNights(startDate, endDate);
  const { mutate: bookingMutate } = useCreateBooking();

  useEffect(() => {
    console.log(user)
  })

  const onSubmit = (data) => {
    if (!isValidPhoneNumber(data.phone_number)) {
      setError("phone_number", {
        type: "manual",
        message: "Please enter a valid phone number",
      });
      return;
    }

    const isMainGuest = data.mainGuest === "true";

    const guest: GuestCreate = {
      name: data.name,
      surname: data.surname,
      email: data.email,
      phone: data.phone_number,
      country: country,
      whether_send_confirmation: data.wantsEmailConfirmation,
      is_booking_for_me: isMainGuest,
    };
    console.log("GUEST" + guest);
    console.log(country);

    const booking: BookingCreate = {
      price: nights * room.price,
      start_date: startDate,
      end_date: endDate,
      room_id: room.id,
      special_requests: data.specialRequests || "",
    };

    bookingMutate({ booking, guest });
  };

  return (
    <form
      className="userInfoSection w-full h-full gap-5 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContainerWithBorders className="basicDataSection">
        <Column>
          <h1 className="font-bold text-xl">Enter your data</h1>
          <p className="text-green-600 leading-7 text-[13px]">
            Everything is almost done! All remains is entering your data.
            <br />
            Please enter your data in Latin, so the administration could understand it.
          </p>
        </Column>

        <Row className="flex-col gap-5 md:flex-row md:gap-5">
          <Column className="w-full md:w-[23rem]">
            <label htmlFor="name">
              Name (latin)
              <RequiredStar />
            </label>
            <input
              defaultValue={user?.name || ""}
              className="border rounded pl-2 py-1 w-full"
              type="text"
              id="name"
              placeholder="For example: John"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </Column>

          <Column className="w-full md:w-[23rem]">
            <label htmlFor="surname">
              Surname (latin)
              <RequiredStar />
            </label>
            <input
              defaultValue={user?.surname || ""}
              className="border rounded pl-2 py-1 w-full"
              type="text"
              id="surname"
              placeholder="For example: Smith"
              {...register("surname", { required: "Surname is required" })}
            />
            {errors.surname && (
              <p className="text-red-500 text-xs mt-1">{errors.surname.message}</p>
            )}
          </Column>
        </Row>

        {/* Email */}
        <Column className="w-full md:w-[23rem] gap-1">
          <label htmlFor="email">
            Email Address
            <RequiredStar />
          </label>
          <input
            defaultValue={user?.email || ""}
            className="border rounded pl-2 py-1 w-full"
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
          />
          <p className="text-xs">Booking confirmation will be sent to here.</p>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </Column>

        {/* Phone */}
        <Column className="w-full md:w-[23rem]">
          <label htmlFor="phone_number" className="mb-1">
            Phone
            <RequiredStar />
          </label>
          <PhoneInput
            international
            className="border rounded pl-2 py-1 w-full"
            defaultCountry={user.country || "GB"}
            value={phoneNumber}
            onCountryChange={(country: string) => setCountry(country)}
            onChange={(phone: string) => {
              setPhoneNumber(phone);
              clearErrors("phone_number");
            }}
            {...register("phone_number", { required: "Phone is required" })}
          />
          <RegistrationFormError error={errors.phone_number}>
            {errors.phone_number?.message || "\u00A0"}
          </RegistrationFormError>
        </Column>

        {/* Email confirmation checkbox */}
        <Row className="items-center gap-2">
          <CustomCheckbox {...register("wantsEmailConfirmation")} />
          <p className="text-xs content-center">
            Yes, I want to get an electronic confirmation to my Email address.
          </p>
        </Row>

        {/* Booking for who */}
        <Column className="gap-2">
          <h1 className="font-bold">Who are you booking for?</h1>
          <Row className="items-center gap-2">
            <input
              type="radio"
              {...register("mainGuest")}
              className="h-6 w-6"
              value="true"
              defaultChecked
              id="mainGuestTrue"
            />
            <label htmlFor="mainGuestTrue" className="text-xs cursor-pointer">
              I am the main guest
            </label>
          </Row>
          <Row className="items-center gap-2">
            <input
              type="radio"
              {...register("mainGuest")}
              className="h-6 w-6"
              value="false"
              id="mainGuestFalse"
            />
            <label htmlFor="mainGuestFalse" className="text-xs cursor-pointer">
              This booking is not for me
            </label>
          </Row>
        </Column>
      </ContainerWithBorders>

      <ContainerWithBorders>
        <Column>
          <h1 className="font-bold text-xl">Useful to know</h1>
          <p className="leading-7">
            Keep yourself free: you can cancel booking for free before 17th of July,
            so make a booking for this wonderful price now!
          </p>
        </Column>
      </ContainerWithBorders>

      <ContainerWithBorders>
        <Column>
          <h1 className="font-bold text-xl">Write your special requests</h1>
          <p className="leading-7">
            Fulfillment of special requests is not guaranteed, but the accommodation
            administration will do everything possible to meet your needs. You can always
            submit a request or special request after completing the booking!
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
        </Column>
      </ContainerWithBorders>

      <Row className="mt-4 w-full">
        <button
          type="submit"
          className="bg-blue-500 ml-auto mb-10 text-white px-6 py-4 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Next: Finalize details
        </button>
      </Row>
    </form>
  );
};

export default BasicDetailsInputSection;
