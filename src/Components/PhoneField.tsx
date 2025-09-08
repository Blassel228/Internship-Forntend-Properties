import { useFormContext, Controller } from "react-hook-form";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import SettingsCancelButton from "./SettingsCancelButton.tsx";
import SettingsSaveButton from "./SettingsSaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import PhoneInput from "react-phone-number-input";
import { UserGet } from "../Types/User.tsx";

interface PhoneFieldProps {
  user: UserGet | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function PhoneField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: PhoneFieldProps) {
  const { control, formState: { errors } } = useFormContext();

  return (
    <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Phone number</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
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
                  inputComponent={(props) => (
                    <input
                      {...props}
                      className={inputClass(errors.phone_number)}
                    />
                  )}
                />
              )}
            />
            {errors.phone_number && <FieldError message={errors.phone_number.message as string} />}
          </Column>

          <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
            <SettingsCancelButton onClick={onCancel}>Cancel</SettingsCancelButton>
            <SettingsSaveButton type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </SettingsSaveButton>
          </Column>
        </>
      ) : (
        <>
          <Column className="flex-1">
            <p className="text-gray-600 text-sm">{user?.phone_number || "Not set"}</p>
            <p className="text-xs text-gray-500 mt-1">
              Staff will contact you via this number.
            </p>
          </Column>
          <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
            <SettingsChangeButton onClick={onStartEdit}>Change</SettingsChangeButton>
          </Column>
        </>
      )}
    </Row>
  );
}

const inputClass = (hasError?: any) =>
  `w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none focus:ring-1 ${
    hasError
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-300 focus:ring-blue-500"
  }`;

const FieldError = ({ message }: { message?: string }) =>
  message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;