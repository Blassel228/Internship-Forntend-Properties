import { useFormContext } from "react-hook-form";
import Column from "../../../Components/Ui/Column.tsx";
import Row from "../../../Components/Ui/Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import { User } from "../../../Types/User.tsx";
import EditInput from "./EditInput.tsx";
import FieldError from "../../../Components/Ui/FieldError.tsx";

interface UsernameFieldProps {
  user: User | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function UsernameField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: UsernameFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Username</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
              Username<span className="text-red-600">*</span>
            </label>
            <EditInput
              type="text"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 4,
                  message: "Username must be at least 4 characters long",
                },
                maxLength: {
                  value: 20,
                  message: "Username must be at most 20 characters long",
                },
              })}
            />
              {errors.username && <FieldError message={errors.username.message as string} />}
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
              {user?.username || "Not set"}
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
