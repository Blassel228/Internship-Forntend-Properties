import { useFormContext } from "react-hook-form";
import Column from "./Column.tsx";
import Row from "./Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import { User } from "../Types/User.tsx";
import EditInput from "./EditInput.tsx";
import FieldError from "./FieldError.tsx";

interface EmailFieldProps {
  user: User | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export default function EmailField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPending,
}: EmailFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Row className="gap-4 w-full border-gray-200 border-t pt-4 pb-4 pr-2 pl-2">
      <div className="w-30 flex-shrink-0 grow-0 flex">
        <label className="font-medium">Email</label>
      </div>

      {isEditing ? (
        <>
          <Column className="w-full">
            <label className="block font-bold mb-1">
              Email<span className="text-red-600">*</span>
            </label>
            <EditInput
              type="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors?.email && (
              <FieldError message={errors.email.message as string}/>
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
            <p className="text-gray-600 text-sm">{user?.email || "Not set"}</p>
            <p className="text-xs text-gray-500 mt-1">
              We will send a confirmation link to your new email address.
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
