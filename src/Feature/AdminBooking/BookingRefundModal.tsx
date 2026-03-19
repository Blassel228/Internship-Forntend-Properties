import { Booking } from "../../Types/Booking.tsx";
import React, { Fragment, useEffect, useState } from "react";
import useRefundByAdmin from "./useRefundByAdmin.tsx";
import { CreateRefundRequestByAdmin } from "../../Types/Payment.tsx";
import { Dialog, Transition } from "@headlessui/react";
import { AlertCircle, Loader2 } from "lucide-react";

interface BookingRefundModalProps {
  booking: Booking | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingRefundModal: React.FC<BookingRefundModalProps> = ({
  booking,
  isOpen,
  onClose,
}) => {
  const { createRefundByAdmin, isPending, isError, error, reset } =
    useRefundByAdmin();

  const [refundAmount, setRefundAmount] = useState<string>(
    booking?.price ? booking.price.toString() : "",
  );
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleRefund = async () => {
    if (!booking || !refundAmount) {
      setValidationError("Please enter a refund amount.");
      return;
    }

    const amountNum = parseFloat(refundAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setValidationError("Refund amount must be greater than zero.");
      return;
    }

    if (amountNum > booking.price) {
      setValidationError(
        `Refund amount cannot exceed the booking price of $${booking.price.toFixed(2)}.`,
      );
      return;
    }

    setValidationError(null);

    const refundRequest: CreateRefundRequestByAdmin = {
      booking_id: booking.id,
      amount: amountNum,
      refund_reason: "Admin initiated refund",
    };

    await createRefundByAdmin(refundRequest, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
      setValidationError(null);
      if (booking?.price) {
        setRefundAmount(booking.price.toString());
      }
    }
  }, [isOpen, reset, booking?.price]);

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
          <div className="fixed inset-0" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border-2 border-gray-300 relative z-[60]">
                <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                  Refund Booking
                </Dialog.Title>

                {booking && (
                  <div className="py-2 space-y-4">
                    <p className="text-sm text-gray-700">
                      Refund amount for booking{" "}
                      <span className="font-mono text-xs">{booking.id}</span>:
                    </p>

                    <div>
                      <label htmlFor="refundAmount" className="sr-only">
                        Refund amount
                      </label>
                      <div className="relative mt-1 rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <input
                          type="number"
                          id="refundAmount"
                          min="0"
                          max={booking.price}
                          step="0.01"
                          value={refundAmount}
                          onChange={(e) => {
                            setRefundAmount(e.target.value);
                            setValidationError(null);
                          }}
                          className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                          placeholder="0.00"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">USD</span>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">
                        Maximum refundable: ${booking.price.toFixed(2)}
                      </p>
                    </div>

                    {validationError && (
                      <div className="flex items-start gap-2 p-3 text-sm text-red-600 bg-red-50 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{validationError}</span>
                      </div>
                    )}

                    {isError && !validationError && (
                      <div className="flex items-start gap-2 p-3 text-sm text-red-600 bg-red-50 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>
                          {error?.response?.data?.error?.detail ||
                            "Failed to process refund. Please try again."}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleRefund}
                    disabled={isPending || !booking}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-60 flex items-center gap-2"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Refund"
                    )}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
