import {useFormContext} from "react-hook-form";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import {User} from "../Types/User.tsx";
import FieldError from "./FieldError.tsx";

interface SexFieldProps {
  user: User | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function SexField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: SexFieldProps) {
  const { register, formState: { errors } } = useFormContext();

  const sexDisplay = (() => {
    switch (user?.sex) {
      case 1: return "Male";
      case 2: return "Female";
      case 9: return "Prefer not to say";
      default: return "Not set";
    }
  })();

  return (
    <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Sex</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
              Sex<span className="text-red-600">*</span>
            </label>
            <select
              {...register("sex", { required: "Please select your sex" })}
              className="w-full border rounded px-3 py-1 h-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value={0}>Choose your sex</option>
              <option value={1}>I am a male</option>
              <option value={2}>I am a female</option>
              <option value={9}>I prefer not to answer</option>
            </select>
            {errors.sex && <FieldError message={errors.sex.message as string} />}
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
            <p className="text-gray-600 text-sm">{sexDisplay}</p>
          </Column>
          <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
            <SettingsChangeButton onClick={onStartEdit}>Change</SettingsChangeButton>
          </Column>
        </>
      )}
    </Row>
  );
}
