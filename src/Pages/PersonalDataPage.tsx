import Column from "../Components/Column.tsx";
import Row from "../Components/Row.tsx";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Store/store.tsx";
import FullHeader from "../Components/Header/FullHeader.tsx";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, isValid, parseISO } from "date-fns";

const PersonalDataPage = () => {
  const user = useSelector(
    (root: RootState) => root.authorizedUser.authorizedUser,
  );
  const dispatch = useDispatch();

  const [editingField, setEditingField] = useState<
    | null
    | "name"
    | "username"
    | "email"
    | "phone"
    | "surname"
    | "sex"
    | "birthdate"
    | "citizenship"
  >(null);

  const [phone, setPhone] = useState(user.phone_number || "");
  const [country, setCountry] = useState<string>(user.country || "GB");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      phone: user.phone_number || "",
      surname: user.surname || "",
      sex: user.sex || "",
      birthdate: user.birthdate || undefined,
      citizenship: user.citizenship || "",
    },
  });

  // Слідкуємо за поточними значеннями полів форми
  const watchedValues = useWatch({ control });

  const handleEdit = (
    field:
      | "name"
      | "username"
      | "email"
      | "phone"
      | "surname"
      | "sex"
      | "birthdate"
      | "citizenship",
  ) => {
    if (editingField === null) {
      setEditingField(field);
      clearErrors?.(field);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleSave = (data: any) => {
    console.log("Saved:", data);
    setEditingField(null);
  };

  return (
    <>
      <p></p>
      {/*<FullHeader />*/}
      {/*<Row className="settings-layout mt-36 justify-center content-center w-full">*/}
      {/*  <Column className="user-settings w-2/4">*/}
      {/*    <Row className="user-setting w-2/3">*/}
      {/*      <div>*/}
      {/*        <h1>Personal Data</h1>*/}
      {/*        <p className="w-full">You can see and renew your personal data here.</p>*/}
      {/*      </div>*/}
      {/*    </Row>*/}

      {/*    <form onSubmit={handleSubmit(handleSave)}>*/}
      {/*      <SettingRow*/}
      {/*        label="Name"*/}
      {/*        field="name"*/}
      {/*        value={user.name || ""}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.name}*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Username"*/}
      {/*        field="username"*/}
      {/*        value={user.username || ""}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.username}*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Email Address"*/}
      {/*        field="email"*/}
      {/*        value={user.email || ""}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.email}*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Phone number"*/}
      {/*        field="phone"*/}
      {/*        value={phone}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={() => ({})}*/}
      {/*        error={errors.phone}*/}
      {/*        inputType="phone"*/}
      {/*        country={country}*/}
      {/*        setCountry={setCountry}*/}
      {/*        setPhone={(phone) => {*/}
      {/*          setPhone(phone);*/}
      {/*          setValue("phone", phone, { shouldValidate: true });*/}
      {/*          if (phone && errors.phone) clearErrors("phone");*/}
      {/*        }}*/}
      {/*        clearErrors={clearErrors}*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Surname"*/}
      {/*        field="surname"*/}
      {/*        value={user.surname || ""}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.surname}*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Sex"*/}
      {/*        field="sex"*/}
      {/*        value={user.sex || ""}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.sex}*/}
      {/*        inputType="select"*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Birthdate"*/}
      {/*        field="birthdate"*/}
      {/*        value={watchedValues.birthdate || ""} // ← Важливо: беремо значення з форми, а не з user*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.birthdate}*/}
      {/*        inputType="birthdate"*/}
      {/*        setValue={setValue}*/}
      {/*        clearErrors={clearErrors}*/}
      {/*      />*/}

      {/*      <SettingRow*/}
      {/*        label="Citizenship"*/}
      {/*        field="citizenship"*/}
      {/*        value={user.citizenship || ""}*/}
      {/*        editingField={editingField}*/}
      {/*        onEdit={handleEdit}*/}
      {/*        onCancel={handleCancel}*/}
      {/*        register={register}*/}
      {/*        error={errors.citizenship}*/}
      {/*      />*/}
      {/*    </form>*/}
      {/*  </Column>*/}
      {/*</Row>*/}
    </>
  );
};

const SettingRow = ({
  label,
  value,
  field,
  editingField,
  onEdit,
  onCancel,
  register,
  error,
  inputType = "text",
  country,
  setCountry,
  setPhone,
  clearErrors,
  setValue,
}: {
  label: string;
  value: string;
  field:
    | "name"
    | "username"
    | "email"
    | "phone"
    | "surname"
    | "sex"
    | "birthdate"
    | "citizenship";
  editingField:
    | null
    | "name"
    | "username"
    | "email"
    | "phone"
    | "surname"
    | "sex"
    | "birthdate"
    | "citizenship";
  onEdit: (
    field:
      | "name"
      | "username"
      | "email"
      | "phone"
      | "surname"
      | "sex"
      | "birthdate"
      | "citizenship",
  ) => void;
  onCancel: () => void;
  register: any;
  error?: { message?: string };
  inputType?: "text" | "select" | "phone" | "birthdate";
  country?: string;
  setCountry?: (country: string) => void;
  setPhone?: (phone: string) => void;
  clearErrors?: (name: string) => void;
  setValue?: (field: string, value: any, config?: any) => void;
}) => {
  const isEditing = editingField === field;
  const isEmpty = !value || value.trim() === "";

  const getSexLabel = (val: string) => {
    const labels: Record<string, string> = {
      "0": "Not known",
      "1": "Male",
      "2": "Female",
      "9": "Not applicable",
    };
    return labels[val] || (val ? "Unknown" : "");
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    try {
      return format(parseISO(dateString), "dd MMMM yyyy");
    } catch {
      return dateString;
    }
  };

  return (
    <Row className="user-setting w-full items-start justify-between border-t pt-4 pb-4 pr-2 pl-2 border-gray-200">
      <div className="flex-1">
        {isEditing ? (
          <Row>
            <label className="w-36 font-medium">{label}</label>
            <Column className="ml-12 w-full">
              <label className="w-36 font-bold">
                {label} <span className="text-red-600">*</span>
              </label>

              {inputType === "select" && field === "sex" ? (
                <div className="relative">
                  <select
                    {...register(field, { required: `${label} is required` })}
                    className={`
                      w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none appearance-none
                      ${error ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:ring-1 focus:ring-blue-500"}
                    `}
                  >
                    <option value="">Select...</option>
                    <option value="0">Not known</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="9">Not applicable</option>
                  </select>
                  {error && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.735 2.98H3.876c-1.522 0-2.485-1.646-1.735-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                //   : inputType === "phone" ? (
                //   <div className="relative">
                //     <PhoneInput
                //       international
                //       defaultCountry={country || "GB"}
                //       value={value}
                //       onCountryChange={(c) => setCountry?.(c)}
                //       onChange={(phone: string) => {
                //         setPhone?.(phone);
                //         if (phone && error) clearErrors?.(field);
                //       }}
                //       className={`w-full border ${error ? "border-red-500" : "border-gray-300"} rounded-md p-2`}
                //     />
                //     {error && (
                //       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                //         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                //           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.735 2.98H3.876c-1.522 0-2.485-1.646-1.735-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                //         </svg>
                //       </div>
                //     )}
                //   </div>
                // )
                //   : inputType === "birthdate" ? (
                //   <div className="relative">
                //     <DatePicker
                //       selected={}
                //       onChange={(date: Date | null) => {
                //         if (date) {
                //           const isoString = format(date, "yyyy-MM-dd");
                //           setValue?.("birthdate", isoString, { shouldValidate: true });
                //         } else {
                //           setValue?.("birthdate", "", { shouldValidate: true });
                //         }
                //         if (error) clearErrors?.("birthdate");
                //       }}
                //       dateFormat="dd/MM/yyyy"
                //       placeholderText="dd/mm/yyyy"
                //       className={`
                //         w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none
                //         ${error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-gray-300 focus:ring-1 focus:ring-blue-500'}
                //       `}
                //       wrapperClassName="w-full"
                //       popperPlacement="bottom-start"
                //       showYearDropdown
                //       yearDropdownItemNumber={100}
                //       scrollableYearDropdown
                //       autoComplete="off"
                //     />
                //     {error && (
                //       <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                //         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                //           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.735 2.98H3.876c-1.522 0-2.485-1.646-1.735-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                //         </svg>
                //       </div>
                //     )}
                //   </div>)
                <div className="relative">
                  <input
                    type="text"
                    {...register(field, { required: `${label} is required` })}
                    className={`
                      w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none
                      ${
                        error
                          ? "border-red-500 focus:ring-1 focus:ring-red-500"
                          : "border-gray-300 focus:ring-1 focus:ring-blue-500"
                      }
                      pr-10
                    `}
                    autoFocus
                  />
                  {error && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.487 0l5.58 9.92c.75 1.334-.213 2.98-1.735 2.98H3.876c-1.522 0-2.485-1.646-1.735-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              )}

              {error && (
                <p className="text-red-500 text-xs mt-1">{error.message}</p>
              )}
            </Column>
          </Row>
        ) : (
          <Row className="items-center gap-4">
            <p className="w-36 font-medium">{label}</p>
            <p
              className={`text-gray-600 text-sm mt-1 mb-1 cursor-pointer hover:text-blue-600 ${
                isEmpty ? "italic text-gray-400" : ""
              }`}
              onClick={() => isEmpty && onEdit(field)}
            >
              {isEmpty
                ? `Add ${label.toLowerCase()}...`
                : field === "sex"
                  ? getSexLabel(value)
                  : field === "birthdate"
                    ? formatDateDisplay(value)
                    : value}
            </p>
          </Row>
        )}
      </div>

      <div
        className="flex flex-col items-end gap-1 ml-4"
        style={{ minWidth: "80px" }}
      >
        {isEditing ? (
          <Column className="w-16 gap-8 justify-center">
            <button
              type="button"
              onClick={onCancel}
              className="text-blue-600 font-medium text-sm py-1 px-2 rounded-md transition duration-500 cursor-pointer hover:bg-blue-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-sm cursor-pointer rounded-md text-white bg-blue-700 py-2 px-2 transition duration-500 font-medium hover:bg-blue-900"
            >
              Save
            </button>
          </Column>
        ) : (
          <button
            type="button"
            onClick={() => onEdit(field)}
            disabled={editingField !== null}
            className={`text-blue-600 text-sm font-medium ${
              editingField !== null
                ? "opacity-50 cursor-not-allowed"
                : "hover:underline"
            }`}
          >
            {isEmpty ? "Add" : "Change"}
          </button>
        )}
      </div>
    </Row>
  );
};

export default PersonalDataPage;
