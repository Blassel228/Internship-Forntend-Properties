import { useFormContext } from "react-hook-form";
import Column from "../../../Components/Ui/Column.tsx";
import Row from "../../../Components/Ui/Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import { User } from "../../../Types/User.tsx";
import EditInput from "./EditInput.tsx";
import FieldError from "../../../Components/Ui/FieldError.tsx";

interface NameFieldProps {
  user: User | null;
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
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
            <EditInput
              type="text"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <FieldError message={errors.name.message as string} />
            )}
          </Column>

          <Column className="w-full">
            <label className="block font-bold mb-1">
              Surname<span className="text-red-600">*</span>
            </label>
            <EditInput
              type="text"
              {...register("surname", {
                required: "Surname is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters long",
                },
                maxLength: {
                  value: 12,
                  message: "Username must be at most 12 characters long",
                },
              })}
            />
          </Column>

          <Column className="w-16 gap-4 content-center items-center min-w-[80px]">
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
            <SaveButton type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </SaveButton>
          </Column>
        </>
      ) : (
        <>
          <Column className="w-full">
            <p className="text-gray-600 text-sm">{user?.name || "Not set"}</p>
          </Column>
          <Column className="w-full">
            <p className="text-gray-600 text-sm">
              {user?.surname || "Not set"}
            </p>
          </Column>
          <Column className="w-16 gap-4 content-center items-center min-w-[80px]">
            <SettingsChangeButton onClick={onStartEdit}>
              Change
            </SettingsChangeButton>
          </Column>
        </>
      )}
    </Row>
  );
}
