import { useFormContext } from "react-hook-form";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import SettingsCancelButton from "./SettingsCancelButton.tsx";
import SettingsSaveButton from "./SettingsSaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import { UserGet } from "../Types/User.tsx";

interface NameFieldProps {
  user: UserGet | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function NameField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: NameFieldProps) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <Row className="gap-4 w-full border-gray-200 border-t align-center pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Name</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
              Name<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={inputClass(errors.name)}
              autoFocus
            />
            {errors.name && <FieldError message={errors.name.message as string} />}
          </Column>

          <Column className="w-full">
            <label className="block font-bold mb-1">
              Surname<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              {...register("surname", { required: "Surname is required" })}
              className={inputClass(errors.surname)}
            />
            {errors.surname && <FieldError message={errors.surname.message as string} />}
          </Column>

          <Column className="w-16 gap-4 content-center items-center min-w-[80px]">
            <SettingsCancelButton onClick={onCancel}>Cancel</SettingsCancelButton>
            <SettingsSaveButton type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </SettingsSaveButton>
          </Column>
        </>
      ) : (
        <>
          <Column className="w-full">
            <p className="text-gray-600 text-sm">{user?.name || "Not set"}</p>
          </Column>
          <Column className="w-full">
            <p className="text-gray-600 text-sm">{user?.surname || "Not set"}</p>
          </Column>
          <Column className="w-16 gap-4 content-center items-center min-w-[80px]">
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