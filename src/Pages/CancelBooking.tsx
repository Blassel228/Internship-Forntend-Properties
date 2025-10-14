import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Booking } from "../Types/Booking.tsx";
import { Room } from "../Types/Room.tsx";
import useRefund from "../Hooks/useRefund.tsx";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import { formatStringDate } from "../Utils/helpers.tsx";

const CancelBooking = () => {
  const location = useLocation();
  const { goBack, goTo } = useNavigation();
  const { createRefund, isPending, isError } = useRefund();

  const { room, booking } = location.state as { room: Room; booking: Booking };

  const room_image = `data:image/png;base64,${room?.image}`;
  const [reason, setReason] = useState<string>("");

  const calculateRefundAmount = () => {
    const now = new Date();
    const startDate = new Date(booking.start_date);
    const timeDiff = startDate.getTime() - now.getTime();
    const daysUntilCheckin = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    let refundPercent = 1;
    if (daysUntilCheckin >= 10 && daysUntilCheckin <= 12) {
      refundPercent = 0.7;
    } else if (daysUntilCheckin >= 7 && daysUntilCheckin < 10) {
      refundPercent = 0.5;
    } else if (daysUntilCheckin < 7) {
      refundPercent = 0.35;
    }

    return booking.price * refundPercent;
  };

  const refundAmount = calculateRefundAmount();
  const cancellationFee = booking.price - refundAmount;
  const currency = "USD";

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const reasons = [
    "Personal reasons/trip was called off",
    "Made bookings for the same dates, want to cancel the ones I don't need",
    "Change in the number or needs of travellers",
    "Property asked to cancel",
    "Change of dates or destination",
    "Unable to travel due to restrictions related to Coronavirus (COVID-19)",
    "I found an alternative accommodation option",
    "None of the above",
  ];

  const handleContinue = async () => {
    if (!reason) return;

    try {
      const request = {
        booking_id: booking.id,
        refund_reason: reason,
        refund_amount: refundAmount,
      };

      await createRefund(request);
      goTo(routers.myBookings);
    } catch (err) {
      console.error("Refund failed:", err);
    }
  };

  const handleKeepBooking = () => {
    goBack();
  };

  if (!room || !booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">Booking or room data not found.</p>
          <Link to="/my-bookings" className="text-blue-600 hover:underline font-medium">
            Go back to my bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-800">Cancel your booking</h1>
          <p className="text-gray-600 mt-2">
            We’re sorry to see you go. Please select a reason below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Why are you cancelling?
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                required
              >
                <option value="">Select a reason (required)</option>
                {reasons.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              {isError && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200">
                  Failed to process refund. Please try again.
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                  onClick={handleContinue}
                  disabled={!reason || isPending}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    "Confirm cancellation"
                  )}
                </button>
                <button
                  onClick={handleKeepBooking}
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition"
                >
                  Keep my booking
                </button>
              </div>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="space-y-6">
            {/* Booking Preview */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex gap-4">
                <img
                  src={room_image || "https://via.placeholder.com/100"}
                  alt="Room"
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{room.type}</h3>
                  <p className="text-sm text-gray-600">
                    {formatStringDate(booking.start_date)} – {formatStringDate(booking.end_date)}
                  </p>
                </div>
              </div>
            </div>

            {/* Refund Summary */}
            <div className="bg-white rounded-xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">Refund summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total paid</span>
                  <span>{formatCurrency(booking.price)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Refundable amount</span>
                  <span className="text-green-600 font-medium">{formatCurrency(refundAmount)}</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-800">Cancellation fee</span>
                    <span className="text-red-600 font-bold">{formatCurrency(cancellationFee)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Policy */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <h3 className="font-semibold text-amber-800 mb-3">Cancellation policy</h3>
              <ul className="text-amber-700 text-sm space-y-2">
                <li>• <strong>12+ days</strong> before check-in → 100% refund</li>
                <li>• <strong>10–12 days</strong> → 70% refund</li>
                <li>• <strong>7–9 days</strong> → 50% refund</li>
                <li>• <strong>Under 7 days</strong> → 35% refund</li>
              </ul>
              <p className="text-xs text-amber-600 mt-3">
                Refunds are processed instantly and may take 5–10 business days to appear in your account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBooking;