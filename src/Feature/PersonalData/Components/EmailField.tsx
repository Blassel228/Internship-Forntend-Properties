import { useFormContext } from "react-hook-form";
import Column from "../../../Components/Ui/Column.tsx";
import Row from "../../../Components/Ui/Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import { User } from "../../../Types/User.tsx";
import EditInput from "./EditInput.tsx";
import { useSendVerificationEmail } from "../../../Hooks/useEmail.tsx";
import { CheckCircle, AlertCircle } from "lucide-react";

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
  } = useFormContext();

  const { mutate: sendVerification, isPending: isSendingPending } = useSendVerificationEmail();

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
            <div className="flex items-center gap-2 mb-1">
              <p className="text-gray-800">{user?.email || "Not set"}</p>
              {user?.is_verified ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-orange-500" />
              )}
            </div>

            {user?.is_verified ? (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Email verified
              </p>
            ) : (
              <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                You won't receive booking confirmation emails until verified
              </p>
            )}
          </Column>

          <Row className="gap-4 mr-2">
            {!user?.is_verified && (
              <SettingsChangeButton
                onClick={() => sendVerification()}
                disabled={isSendingPending}
              >
                Verify
              </SettingsChangeButton>
            )}
            <SettingsChangeButton onClick={onStartEdit}>
              Change
            </SettingsChangeButton>
          </Row>
        </>
      )}
    </Row>
  );
}