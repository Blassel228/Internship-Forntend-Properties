import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Column from "../../../Components/Ui/Column.tsx";
import Row from "../../../Components/Ui/Row.tsx";
import CancelButton from "./CancelButton.tsx";
import SaveButton from "./SaveButton.tsx";
import SettingsChangeButton from "./SettingsChangeButton.tsx";
import { User } from "../../../Types/User.tsx";
import EditInput from "./EditInput.tsx";
import { CheckCircle, AlertCircle, Mail, Clock } from "lucide-react";
import EmailChangeConfirmModal from "../Components/EmailChangeConfirmModal.tsx";
import useChangeEmail from "../Hooks/useChangeEmail";

interface EmailFieldProps {
  user: User | null;
  isEditing: boolean;
  onStartEdit: () => void;
  onCancel: () => void;
  isPendingVerification?: boolean;
}

export default function EmailField({
  user,
  isEditing,
  onStartEdit,
  onCancel,
  isPendingVerification = false,
}: EmailFieldProps) {
  const { register, getValues, formState: { errors } } = useFormContext();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { changeEmail, isEmailChanging } = useChangeEmail();

  const handleSaveClick = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmail = getValues("email");

    if (newEmail === user?.email) {
      onCancel();
      return;
    }

    setShowConfirmModal(true);
  };

    const handleConfirmChange = (password: string) => {
      const newEmail = getValues("email");
      changeEmail(
        { new_email: newEmail, password },
        {
          onSuccess: () => {
            setShowConfirmModal(false);
            onCancel();
          },
        }
      );
    };

  return (
    <>
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
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message as string}
                </p>
              )}
              <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-800">
                    After changing your email, you'll need to verify it. A verification link will be sent to your new email address.
                  </p>
                </div>
              </div>
            </Column>

            <Column className="w-16 gap-4 content-center items-center ml-auto min-w-[80px]">
              <CancelButton onClick={onCancel}>Cancel</CancelButton>
              <SaveButton
                type="button"
                onClick={handleSaveClick}
                disabled={isEmailChanging}
              >
                {isEmailChanging ? "Saving..." : "Save"}
              </SaveButton>
            </Column>
          </>
        ) : (
          <>
            <Column className="flex-1">
              <div className="flex items-center text-sm gap-2 mb-1">
                <p className="text-gray-800">{user?.email || "Not set"}</p>
                {!isPendingVerification ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-500" />
                )}
              </div>

              {!isPendingVerification ? (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Email verified
                </p>
              ) : (
                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                    <Column className="gap-1">
                      <p className="text-xs font-semibold text-amber-800">
                        Verification required
                      </p>
                      <p className="text-xs text-amber-700">
                        Please check your email and click the verification link to confirm your new email address.
                      </p>
                      <button
                        className="text-xs text-amber-600 hover:text-amber-800 font-medium mt-1 underline"
                        onClick={() => {
                          const email = getValues("email");
                          changeEmail(email);
                        }}
                      >
                        Resend verification email
                      </button>
                    </Column>
                  </div>
                </div>
              )}
            </Column>

            <Row className="gap-4 mr-2">
              <SettingsChangeButton onClick={onStartEdit} disabled={isPendingVerification}>
                Change
              </SettingsChangeButton>
            </Row>
          </>
        )}
      </Row>

      <EmailChangeConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmChange}
        newEmail={getValues("email")}
        isLoading={isEmailChanging}
      />
    </>
  );
}