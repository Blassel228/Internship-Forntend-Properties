import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertCircle, Mail, Lock } from "lucide-react";
import Row from "../../../Components/Ui/Row.tsx";

interface EmailChangeConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  newEmail: string;
  isLoading: boolean;
}

const EmailChangeConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  newEmail,
  isLoading,
}: EmailChangeConfirmModalProps) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("Password is required");
      return;
    }
    onConfirm(password);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0  bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Lock className="w-6 h-6 text-orange-600" />
                  </div>
                  <Dialog.Title className="text-lg font-bold text-gray-900">
                    Confirm Email Change
                  </Dialog.Title>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    You're changing your email to:
                  </p>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg mb-4">
                    <p className="font-semibold text-gray-900">{newEmail}</p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Enter your password to confirm
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 ${
                        error ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Your password"
                    />
                    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-amber-800">
                        <p className="font-semibold mb-1">Important:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>A verification link will be sent to your new email</li>
                          <li>You must verify within 15 minutes</li>
                          <li>Your current email will remain active until verification</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Row className="gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors border border-gray-300"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors font-medium disabled:opacity-50"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Confirm"}
                  </button>
                </Row>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EmailChangeConfirmModal;