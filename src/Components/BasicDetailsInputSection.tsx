import Row from "./Row.tsx";
import Column from "./Column.tsx";
import React, { useState } from "react";
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import CustomCheckbox from "./CustomCheckbox.tsx";
import { useForm } from "react-hook-form";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import { calculateNights } from "../Utils/helpers.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import RequiredStar from "./RequiredStar.tsx";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import RegistrationFormError from "./RegistrationFormError.tsx";
import { GuestCreateIn } from "../Types/Guest.tsx";
import { getItem } from "../Utils/localStorage.tsx";
import { User } from "../Types/User.tsx";
import { CreateCheckoutSessionRequest } from "../Types/Payment.tsx";
import {
  useCreateCheckoutSessionWithoutToken,
  useCreateCheckoutSessionWithToken,
} from "../Hooks/useCreateCheckoutSession.tsx";

interface BasicDetailsInputSectionProps {
  room: {
    id: string;
    price: number;
    type: string;
  };
}

const BasicDetailsInputSection: React.FC<BasicDetailsInputSectionProps> = ({
  room,
}) => {
  const user: User | null = useSelector(
    (state: RootState) => state.authorizedUser.authorizedUser,
  );

  const [country, setCountry] = useState<string>(user?.country || "GB");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm();

  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phone_number || "",
  );

  const { startDate, endDate } = useBookingParams();
  const nights = calculateNights(startDate, endDate);

  const { mutate: createCheckoutWithToken, isPending: isWithTokenLoading } =
    useCreateCheckoutSessionWithToken();
  const {
    mutate: createCheckoutWithoutToken,
    isPending: isWithoutTokenLoading,
  } = useCreateCheckoutSessionWithoutToken();

  const isBookingCreating = isWithTokenLoading || isWithoutTokenLoading;

  const onSubmit = (data) => {
    if (!isValidPhoneNumber(data.phone_number)) {
      setError("phone_number", {
        type: "manual",
        message: "Please enter a valid phone number",
      });
      return;
    }

    const isMainGuest = data.mainGuest === "true";

    const guestIn: GuestCreateIn = {
      name: data.name.trim(),
      surname: data.surname.trim(),
      email: data.email.trim(),
      phone: data.phone_number,
      country: country,
      whether_send_confirmation: !!data.wantsEmailConfirmation,
      is_booking_for_me: isMainGuest,
    };

    const request: CreateCheckoutSessionRequest = {
      room_id: room.id,
      price: nights * room.price,
      start_date: startDate,
      end_date: endDate,
      currency: "usd",
      special_requests: data.specialRequests?.trim() || null,
      guest_data: guestIn,
    };

    const token = getItem("token");
    const mutateFn = token
      ? createCheckoutWithToken
      : createCheckoutWithoutToken;

    mutateFn(request, {
      onSuccess: (response) => {
        window.location.href = response.url;
      },
      onError: (error: any) => {
        const message =
          error.response?.data?.detail ||
          error.message ||
          "Something went wrong. Please try again.";
        setError("serverError", {
          type: "server",
          message,
        });
      },
    });
  };

  return (
    <form
      className="userInfoSection w-full h-full gap-5 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContainerWithBorders className="basicDataSection">
        <div>
          <h1 className="font-bold text-xl">Enter your data</h1>
          <p className="text-green-600 leading-7 text-[13px]">
            Everything is almost done! All remains is entering your data.
            <br />
            Please enter your data in Latin, so the administration could
            understand it.
          </p>
        </div>

        <Row className="w-full gap-5">
          <Column className="w-[23rem]">
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
          </Column>

          <Column className="w-[23rem]">
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
          </Column>
        </Row>

        <Column className="w-[23rem] gap-1">
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
        </Column>

        <Column className="w-[23rem]">
          <Row>
            <label htmlFor="phone">
              Phone
              <RequiredStar />
            </label>
          </Row>
          <PhoneInput
            international
            className="border rounded pl-2 py-1 w-full"
            defaultCountry={user?.country || "GB"}
            value={phoneNumber}
            onCountryChange={(countryCode: string) => setCountry(countryCode)}
            onChange={(phone: string | undefined) => {
              setPhoneNumber(phone || "");
              clearErrors("phone_number");
            }}
            inputComponent="input"
            {...register("phone_number", { required: "Phone is required" })}
          />
          <RegistrationFormError error={errors.phone_number}>
            {errors.phone_number?.message || "\u00A0"}
          </RegistrationFormError>
        </Column>

        <Row>
          <CustomCheckbox {...register("wantsEmailConfirmation")} />
          <p className="text-xs ml-2 content-center">
            Yes, I want to get an electronic confirmation to my Email address.
          </p>
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
            <p className="text-xs content-center ml-2">
              This booking is not for me
            </p>
          </Row>
        </Column>
      </ContainerWithBorders>

      <ContainerWithBorders>
        <h1 className="font-bold text-xl">Useful to know</h1>
        <p className="leading-7">
          Keep yourself free: you can cancel booking for free before 17th of
          July, so make a booking for this wonderful price now!
        </p>
      </ContainerWithBorders>

      <ContainerWithBorders>
        <h1 className="font-bold text-xl">Write your special requests</h1>
        <p className="leading-7">
          Fulfillment of special requests is not guaranteed, but the
          accommodation administration will do everything possible to meet your
          needs. You can always submit a request or special request after
          completing the booking!
        </p>
        <label htmlFor="specialRequests">
          Please write your request in English or these languages: Korean
          (optional).
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
          disabled={isBookingCreating}
          className="bg-blue-500 ml-auto mb-10 text-white px-6 py-4 rounded-md font-medium text-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBookingCreating
            ? "Redirecting to Payment..."
            : "Pay Now via Stripe"}
        </button>
      </div>

      <RegistrationFormError error={errors.serverError}>
        {errors.serverError?.message || "\u00A0"}
      </RegistrationFormError>
    </form>
  );
};

export default BasicDetailsInputSection;
