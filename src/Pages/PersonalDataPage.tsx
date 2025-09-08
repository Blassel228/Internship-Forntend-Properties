// noinspection TypeScriptValidateTypes

import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../Types/RootState.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import SettingsCancelButton from "../Components/SettingsCancelButton.tsx";
import SettingsSaveButton from "../Components/SettingsSaveButton.tsx";
import SettingsChangeButton from "../Components/SettingsChangeButton.tsx";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "libphonenumber-js";
import useUpdateUser from "../Hooks/useUpdateUser.tsx";
import { UserUpdate } from "../Types/User.tsx";

const PersonalDataPage = () => {
  const {
    mutate: updateUser,
    isPending,
    isError: isUpdatingError,
  } = useUpdateUser();

  const user = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  );

  const [editingField, setEditingField] = useState<
    | null
    | "name"
    | "username"
    | "email"
    | "phone_number"
    | "country"
    | "birthdate"
  >(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name ?? "",
      surname: user?.surname ?? "",
      email: user?.email ?? "",
      phone_number: user?.phone_number ?? "",
      country: user?.country ?? "",
      day: new Date(user?.birthdate).getDay() + 1,
      month: new Date(user?.birthdate).getMonth() + 1,
      year: new Date(user?.birthdate).getFullYear(),
    },
  });

  const handleEdit = (
    field:
      | "name"
      | "username"
      | "email"
      | "phone_number"
      | "country"
      | "birthdate",
  ) => {
    if (editingField === null) {
      setEditingField(field);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleSave = (data: any) => {
    if (data.phone_number) {
      if (!isValidPhoneNumber(data.phone_number)) {
        setError("phone_number", {
          type: "manual",
          message: "Please enter a valid phone number",
        });
        return;
      }
    }
    if (data.day !== null && data.month !== null && data.year !== null) {
      const dateStr = `${data.year}-${data.month.toString().padStart(2, "0")}-${data.day.toString().padStart(2, "0")}`;
      const isValidDate = !isNaN(new Date(dateStr).getTime());
      if (isValidDate) {
        setValue("birthdate", dateStr);
      }
    } else {
      setError("birthdate", "Enter all inputs.");
    }
    console.log("BIRTHDATE", getValues("birthdate"))
    console.log("USER", user);
    const userUpdate: UserUpdate = {
      ...data,
      birthdate: getValues("birthdate"),
    };
    console.log("DATA", userUpdate);
    updateUser(userUpdate);
    setEditingField(null);
  };

  return (
    <>
      <FullHeader />
      <Row className="settings-layout mt-36 justify-center content-center w-full">
        <Column className="user-settings w-2/4">
          <Row className="user-setting w-2/3">
            <div>
              <h1 className="text-2xl font-bold">Personal Data</h1>
              <p className="w-full py-4">
                You can see and renew your personal data here.
              </p>
            </div>
          </Row>

          <form onSubmit={handleSubmit(handleSave)}>
            <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
              <div className="w-30 flex-shrink-0 grow-0 flex">
                <label className="font-medium">Name</label>
              </div>

              {editingField === "name" ? (
                <>
                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Name<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      className={`
                        w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none pr-10
                        ${
                          errors.name
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                        }
                      `}
                      autoFocus
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </Column>

                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Surname<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("surname", {
                        required: "Surname is required",
                      })}
                      className={`
                        w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none pr-10
                        ${
                          errors.surname
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                        }
                      `}
                    />
                    {errors.surname && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.surname.message}
                      </p>
                    )}
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center min-w-[80px]">
                    <SettingsCancelButton onClick={handleCancel}>
                      Cancel
                    </SettingsCancelButton>
                    <SettingsSaveButton disabled={isPending} type="submit">
                      {isPending ? "Saving..." : "Save"}
                    </SettingsSaveButton>
                  </Column>
                </>
              ) : (
                <>
                  <Column className="w-full">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.name}
                    </p>
                  </Column>
                  <Column className="w-full">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.surname}
                    </p>
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center min-w-[80px]">
                    <SettingsChangeButton onClick={() => handleEdit("name")}>
                      Change
                    </SettingsChangeButton>
                  </Column>
                </>
              )}
            </Row>

            <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
              <div className="w-30 flex-shrink-0 grow-0 flex">
                <label className="font-medium">Username</label>
              </div>

              {editingField === "username" ? (
                <>
                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Username<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="username"
                      {...register("username", {
                        required: "Username is required",
                      })}
                      className={`
                        w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none pr-10
                        ${
                          errors.username
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                        }
                      `}
                    />
                    {errors.username && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.username.message}
                      </p>
                    )}
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsCancelButton onClick={handleCancel}>
                      Cancel
                    </SettingsCancelButton>
                    <SettingsSaveButton disabled={isPending} type="submit">
                      {isPending ? "Saving..." : "Save"}
                    </SettingsSaveButton>
                  </Column>
                </>
              ) : (
                <>
                  <Row className="flex-1">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.username}
                    </p>
                  </Row>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsChangeButton
                      onClick={() => handleEdit("username")}
                    >
                      Change
                    </SettingsChangeButton>
                  </Column>
                </>
              )}
            </Row>

            <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
              <div className="w-30 flex-shrink-0 grow-0 flex">
                <label className="font-medium">Email</label>
              </div>

              {editingField === "email" ? (
                <>
                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Email<span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      className={`
                        w-full border rounded px-3 py-4 h-8 text-sm focus:outline-none pr-10
                        ${
                          errors.email
                            ? "border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                        }
                      `}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsCancelButton onClick={handleCancel}>
                      Cancel
                    </SettingsCancelButton>
                    <SettingsSaveButton disabled={isPending} type="submit">
                      {isPending ? "Saving..." : "Save"}
                    </SettingsSaveButton>
                  </Column>
                </>
              ) : (
                <>
                  <Column className="flex-1">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      We will send a confirmation link to your new email
                      address. Please check your inbox.
                    </p>
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsChangeButton onClick={() => handleEdit("email")}>
                      Change
                    </SettingsChangeButton>
                  </Column>
                </>
              )}
            </Row>
            <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
              <div className="w-30 flex-shrink-0 grow-0 flex">
                <label className="font-medium">Phone number</label>
              </div>

              {editingField === "phone_number" ? (
                <>
                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Phone number<span className="text-red-600">*</span>
                    </label>
                    <Controller
                      name="phone_number"
                      control={control}
                      rules={{ required: "Phone number is required" }}
                      render={({ field }) => (
                        <PhoneInput
                          international
                          defaultCountry="GB"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          onCountryChange={(country) =>
                            setValue("country", country)
                          }
                          inputComponent={({
                            value,
                            onChange,
                            onBlur,
                            name,
                            autoFocus,
                            ...rest
                          }) => (
                            <input
                              type="tel"
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              name={name}
                              autoFocus={autoFocus}
                              {...rest}
                              className={`
                                w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none
                                ${
                                  errors.phone_number
                                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                                }
                              `}
                            />
                          )}
                        />
                      )}
                    />
                    {errors.phone_number && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone_number?.message}
                      </p>
                    )}
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsCancelButton onClick={handleCancel}>
                      Cancel
                    </SettingsCancelButton>
                    <SettingsSaveButton disabled={isPending} type="submit">
                      {isPending ? "Saving..." : "Save"}
                    </SettingsSaveButton>
                  </Column>
                </>
              ) : (
                <>
                  <Column className="flex-1">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.phone_number}
                    </p>
                    <p className="text-sm text-gray-600">
                      The number at which the staff of the booked accommodation
                      or leisure option will be able to contact you.
                    </p>
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsChangeButton
                      onClick={() => handleEdit("phone_number")}
                    >
                      Change
                    </SettingsChangeButton>
                  </Column>
                </>
              )}
            </Row>
            <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
              <div className="w-30 flex-shrink-0 grow-0 flex">
                <label className="font-medium">Birthdate</label>
              </div>

              {editingField === "birthdate" ? (
                <>
                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Birthdate<span className="text-red-600">*</span>
                    </label>
                    <Row className="gap-4">
                      <Column>
                        <input
                          type="number"
                          {...register("day", {
                            max: {
                              value: 31,
                              message: "31 is maximal number.",
                            },
                            min: { value: 1, message: "1 is minimal number." },
                          })}
                          placeholder="DD"
                          className={`
                          w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none appearance-none
                          ${
                            errors.day
                              ? "border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                          }
                          `}
                        />
                        {errors.day && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.day?.message}
                          </span>
                        )}
                      </Column>
                      <Column>
                        <input
                          type="number"
                          {...register("month", {
                            max: {
                              value: 12,
                              message: "12 is maximal number.",
                            },
                            min: { value: 1, message: "1 is minimal number." },
                          })}
                          placeholder="MM"
                          className={`
                          w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none
                          ${
                            errors.month
                              ? "border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                          }
                        `}
                        />
                        {errors.month && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.month?.message}
                          </span>
                        )}
                      </Column>

                      <Column>
                        <input
                          type="number"
                          {...register("year", {
                            max: {
                              value: new Date().getFullYear(),
                              message: "Irrelevant date.",
                            },
                            min: { value: 1910, message: "Irrelevant date." },
                          })}
                          placeholder="YYYY"
                          className={`
                          w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none appearance-none
                          ${
                            errors.year
                              ? "border-red-500 focus:ring-1 focus:ring-red-500"
                              : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                          }
                        `}
                        />
                        {errors.year && (
                          <span className="text-red-500 text-xs mt-1">
                            {errors.year?.message}
                          </span>
                        )}
                      </Column>
                    </Row>
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsCancelButton onClick={handleCancel}>
                      Cancel
                    </SettingsCancelButton>
                    <SettingsSaveButton disabled={isPending} type="submit">
                      {isPending ? "Saving..." : "Save"}
                    </SettingsSaveButton>
                  </Column>
                </>
              ) : (
                <>
                  <Column className="flex-1">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.birthdate
                        ? `${new Date(user?.birthdate).getDay()}.${new Date(user?.birthdate).getMonth() + 1}.${new Date(user?.birthdate).getFullYear()}`
                        : "Enter your birthdate"}
                    </p>
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsChangeButton
                      onClick={() => handleEdit("birthdate")}
                    >
                      Change
                    </SettingsChangeButton>
                  </Column>
                </>
              )}
            </Row>
            <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
              <div className="w-30 flex-shrink-0 grow-0 flex">
                <label className="font-medium">Sex</label>
              </div>

              {editingField === "sex" ? (
                <>
                  <Column className="w-full">
                    <label className="w-36 font-bold">
                      Sex<span className="text-red-600">*</span>
                    </label>
                    <select
                      name="sex"
                      className="w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none appearance-none"
                      {...register("sex")}
                      defaultValue={0}
                    >
                      <option value={0}>Choose your sex</option>
                      <option value={1}>I am a male</option>
                      <option value={2}>I am a female</option>
                      <option value={9}>I prefer not to answer</option>
                    </select>
                    {errors.sex && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.sex.message}
                      </p>
                    )}
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsCancelButton onClick={handleCancel}>
                      Cancel
                    </SettingsCancelButton>
                    <SettingsSaveButton disabled={isPending} type="submit">
                      {isPending ? "Saving..." : "Save"}
                    </SettingsSaveButton>
                  </Column>
                </>
              ) : (
                <>
                  <Column className="flex-1">
                    <p className="text-gray-600 text-sm mt-1 mb-1">
                      {user?.sex === 0
                        ? "Enter your sex please."
                        : user?.sex === 1
                          ? "I am a man."
                          : user?.sex === 2
                            ? "I am a woman."
                            : "I prefer not to say"}
                    </p>
                  </Column>

                  <Column className="w-16 gap-8 content-center items-center ml-auto min-w-[80px]">
                    <SettingsChangeButton onClick={() => handleEdit("sex")}>
                      Change
                    </SettingsChangeButton>
                  </Column>
                </>
              )}
            </Row>
            <p className="text-red-500 text-xs mt-1">
              {isUpdatingError && "We encountered problems while updating your data."}
            </p>
          </form>
        </Column>
      </Row>
    </>
  );
};

export default PersonalDataPage;
