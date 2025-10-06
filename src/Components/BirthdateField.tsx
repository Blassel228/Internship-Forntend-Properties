import {useFormContext} from "react-hook-form";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import {User} from "../Types/User.tsx";
import EditInput from "./EditInput.tsx";
import FieldError from "./FieldError.tsx";

interface BirthdateFieldProps {
  user: User | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function BirthdateField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: BirthdateFieldProps) {
  const { register, formState: { errors } } = useFormContext();

  const birthdateDisplay = user?.birthdate
    ? new Date(user.birthdate).toLocaleDateString("en-GB")
    : "Not set";

  return (
    <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Birthdate</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
              Birthdate<span className="text-red-600">*</span>
            </label>
            <Row className="gap-2">
              <EditInput
                type="number"
                placeholder="DD"
                {...register("day", {
                  required: "Day is required",
                  min: { value: 1, message: "Min 1" },
                  max: { value: 31, message: "Max 31" },
                })}
              />
              <EditInput
                type="number"
                placeholder="MM"
                {...register("month", {
                  required: "Month is required",
                  min: { value: 1, message: "Min 1" },
                  max: { value: 12, message: "Max 12" },
                })}
              />
              <EditInput
                type="number"
                placeholder="YYYY"
                {...register("year", {
                  required: "Year is required",
                  min: { value: 1900, message: "Invalid year" },
                  max: { value: new Date().getFullYear(), message: "Future date" },
                })}
              />
            </Row>
            {(errors.day || errors.month || errors.year) && (
              <FieldError
                message={
                  (errors.day?.message ||
                   errors.month?.message ||
                   errors.year?.message) as string
                }
              />
            )}
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
            <p className="text-gray-600 text-sm">{birthdateDisplay}</p>
          </Column>
          <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
            <SettingsChangeButton onClick={onStartEdit}>Change</SettingsChangeButton>
          </Column>
        </>
      )}
    </Row>
  );
}
