import Row from "./Row.tsx";
import Column from "./Column.tsx";
import React from "react"; // ✅ useState видалено — не потрібен
import ContainerWithBorders from "./ContainerWithBorders.tsx";
import CustomCheckbox from "./CustomCheckbox.tsx";
import { Controller, useForm } from "react-hook-form";
import useBookingParams from "../Hooks/useSearchParams.tsx";
import { calculateNights } from "../Utils/helpers.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Store/store.tsx";
import RequiredStar from "./RequiredStar.tsx";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import { GuestCreateIn } from "../Types/Guest.tsx";
import { getItem } from "../Utils/localStorage.tsx";
import { User } from "../Types/User.tsx";
import { CreateCheckoutSessionRequest } from "../Types/Payment.tsx";
import {
  useCreateCheckoutSessionWithoutToken,
  useCreateCheckoutSessionWithToken,
} from "../Hooks/useCreateCheckoutSession.tsx";
import BookingInput from "./BookingInput.tsx";
import CountrySelector from "./CountrySelect.tsx";
import AppButton from "./Buttons/AppButton.tsx";
import PersonalDataFooter from "./PersonalDataFooter.tsx";
import isEmail from "validator/lib/isEmail";

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

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      surname: user?.surname || "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      country: user?.country || "",
      wantsEmailConfirmation: true,
      mainGuest: "true",
      specialRequests: "",
    },
  });

  const { startDate, endDate } = useBookingParams();
  const nights = calculateNights(startDate, endDate);

  const {
    mutate: createCheckoutWithToken,
    isPending: isWithTokenLoading,
    error: creatingError,
    isSuccess: creatingSuccess,
    isError: creatingErrorWithoutToken,
  } = useCreateCheckoutSessionWithToken();
  const {
    mutate: createCheckoutWithoutToken,
    isPending: isWithoutTokenLoading,
  } = useCreateCheckoutSessionWithoutToken();

  const isBookingCreating = isWithTokenLoading || isWithoutTokenLoading;

  const onSubmit = (data) => {
    const isMainGuest = data.mainGuest === "true";

    const guestIn: GuestCreateIn = {
      name: data.name.trim(),
      surname: data.surname.trim(),
      email: data.email.trim(),
      phone: data.phone_number,
      country: data.country,
      whether_send_confirmation: data.wantsEmailConfirmation,
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
      className="userInfoSection w-full h-full gap-8 flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <ContainerWithBorders className="basicDataSection bg-white">
        <div>
          <h1 className="font-bold text-xl">Enter your data</h1>
          <p className="text-green-600 leading-7 text-[13px]">
            Please enter your data in Latin, so the administration could
            understand it.
          </p>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded mb-6">
          <p className="text-sm text-amber-700">
            <strong>Important:</strong> Editing bookings is not available. If
            your plans change, you’ll need to cancel this booking and create a
            new one (rebooking).
          </p>
        </div>

        <Row className="w-full gap-5">
          <Column className="w-[23rem]">
            <label htmlFor="name">
              Name (latin)
              <RequiredStar />
            </label>
            <BookingInput
              defaultValue={user?.name || ""}
              type="text"
              id="name"
              placeholder="For example: John"
              error={!!errors.name}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">
                {errors.name.message as string}
              </span>
            )}
          </Column>

          <Column className="w-[23rem]">
            <label htmlFor="surname">
              Surname (latin)
              <RequiredStar />
            </label>
            <BookingInput
              defaultValue={user?.surname || ""}
              type="text"
              id="surname"
              placeholder="For example: Smith"
              error={!!errors.surname}
              {...register("surname", { required: "Surname is required" })}
            />
            {errors.surname && (
              <span className="text-red-500 text-sm mt-1">
                {errors.surname.message as string}
              </span>
            )}
          </Column>
        </Row>

        <Column className="w-[23rem] gap-1">
          <label htmlFor="email">
            Email Address
            <RequiredStar />
          </label>
          <BookingInput
            defaultValue={user?.email || ""}
            type="email"
            id="email"
            error={!!errors.email}
            {...register("email", {
              required: "Email is required",
              validate: (value) => {
                if (!isEmail(value.trim())) {
                  return "Please enter a valid email address";
                }
                return true;
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </span>
          )}
        </Column>

        {/* ✅ Оновлений блок телефону з Controller */}
        <Column className="w-[23rem]">
          <Row>
            <label htmlFor="phone">
              Phone
              <RequiredStar />
            </label>
          </Row>
          <Controller
            name="phone_number"
            control={control}
            rules={{
              required: "Phone is required",
              validate: (value) => {
                if (!value) return "Phone is required";
                if (!isValidPhoneNumber(value)) {
                  return "Please enter a valid phone number";
                }
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                international
                className={`border py-2 px-3 rounded pl-2 w-full ${
                  errors.phone_number ? "border-red-500" : "border-gray-300"
                }`}
                defaultCountry={user?.country || "GB"}
                value={value}
                onChange={(phone) => {
                  onChange(phone || "");
                }}
                inputComponent="input"
              />
            )}
          />
          {errors.phone_number && (
            <span className="text-red-500 text-sm mt-1">
              {errors.phone_number.message as string}
            </span>
          )}
        </Column>

        <Column className="w-[23rem]">
          <label htmlFor="country">
            Country
            <RequiredStar />
          </label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country is required" }}
            render={({ field: { onChange, value } }) => (
              <CountrySelector
                value={value}
                onChange={(option) => onChange(option?.label || "")}
              />
            )}
          />
          {errors.country && (
            <span className="text-red-500 text-sm mt-1">
              {errors.country.message as string}
            </span>
          )}
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

      <ContainerWithBorders className="bg-white">
        <h1 className="font-bold text-xl">Refund Policy</h1>
        <p className="leading-7">
          Book with confidence! You can cancel your reservation and receive a
          partial refund depending on how many days are left before check-in:
        </p>
        <ul className="mt-3 space-y-1 list-disc pl-5 leading-7">
          <li>More than 12 days before check-in: 100% refund</li>
          <li>10–12 days before check-in: 70% refund</li>
          <li>7–9 days before check-in: 50% refund</li>
          <li>Fewer than 7 days before check-in: 35% refund</li>
        </ul>
        <p className="mt-3 leading-7">
          Secure your stay at this great price today!
        </p>
      </ContainerWithBorders>

      <ContainerWithBorders className="bg-white">
        <h1 className="font-bold text-xl">Write your special requests</h1>
        <p className="leading-7">
          You can ask the administration for something. Not all requests can be
          satisfied, but our staff will do its best.
        </p>
        <label htmlFor="specialRequests">
          Please write your request in English. (optional).
        </label>
        <textarea
          id="specialRequests"
          className="border rounded p-2 mt-2 w-full resize-none min-h-[100px]"
          placeholder="Enter your special requests here..."
          {...register("specialRequests")}
        />
      </ContainerWithBorders>

      <div className="mt-4 w-full flex">
        <AppButton
          type="submit"
          disabled={isBookingCreating}
          className="ml-auto px-6 py-4"
        >
          {isBookingCreating
            ? "Redirecting to Payment..."
            : "Pay Now via Stripe"}
        </AppButton>
      </div>

      <PersonalDataFooter
        message={
          errors.phone_number?.message ||
          (creatingErrorWithoutToken && !creatingSuccess
            ? "Something went wrong during booking creation"
            : undefined)
        }
      />
    </form>
  );
};

export default BasicDetailsInputSection;
