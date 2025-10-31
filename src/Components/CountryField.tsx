import { useFormContext } from "react-hook-form";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import CancelButton from "./Buttons/CancelButton.tsx";
import SaveButton from "./Buttons/SaveButton.tsx";
import SettingsChangeButton from "./Buttons/SettingsChangeButton.tsx";
import { User } from "../Types/User.tsx";
import FieldError from "./FieldError.tsx";
import CountrySelector from "./CountrySelect.tsx";

interface CountryFieldProps {
  user: User | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function CountryField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: CountryFieldProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const selectedCountry = watch("country");

  return (
    <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Country</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
              Country<span className="text-red-600">*</span>
            </label>
            <CountrySelector
              value={selectedCountry}
              onChange={(option) => {
                setValue("country", option?.label || "", {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
            />
          </Column>

          <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <SaveButton type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </SaveButton>
          </Column>
        </>
      ) : (
        <>
          <Column className="flex-1">
            <p className="text-gray-600 text-sm">
              {user?.country || "Not set"}
            </p>
          </Column>
          <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
            <SettingsChangeButton onClick={onStartEdit}>
              Change
            </SettingsChangeButton>
          </Column>
        </>
      )}
    </Row>
  );
}
