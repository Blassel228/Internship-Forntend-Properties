import {useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Booking} from "../Types/Booking.tsx";
import {Room} from "../Types/Room.tsx";
import useRefund from "../Hooks/useRefund.tsx";
import useNavigation from "../Utils/navigate.tsx";
import routers from "../Constants/routers.tsx";
import {formatDate} from "../Utils/helpers.tsx";

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
      <div className="p-8 text-center">
        <p className="text-red-500">Booking or room data not found.</p>
        <Link to="/my-bookings" className="text-blue-600 hover:underline">
          Go back to my bookings
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto px-6 py-8 max-w-6xl mt-36">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-2xl font-bold mb-4">Reason for cancelling</h1>
              <p className="text-gray-600 mb-6">
                We can help you find alternative solutions if you need to make
                changes to your booking.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Reason
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a reason (mandatory)</option>
                  {reasons.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {isError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">
                    {"Failed to process refund. Please try again."}
                  </p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handleContinue}
                  disabled={!reason || isPending}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Processing Refund...
                    </span>
                  ) : (
                    "Continue"
                  )}
                </button>
                <button
                  onClick={handleKeepBooking}
                  className="text-blue-600 hover:underline font-medium"
                >
                  I want to keep this booking
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">
                <div className="flex items-start gap-4">
                  <img
                    src={room_image || "https://via.placeholder.com/100"}
                    alt="Room image"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{room.type}</h3>
                    <p className="text-gray-500 mt-1">
                      {formatDate(booking.start_date)} –{" "}
                      {formatDate(booking.end_date)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border-gray-300 border">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Original amount
                    </span>
                    <span className="font-medium">
                      {formatCurrency(booking.price)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Refund amount</span>
                    <span className="text-green-600 font-medium">
                      {formatCurrency(refundAmount)}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">
                        Cancellation fee
                      </span>
                      <span className="text-red-600 text-lg font-bold">
                        {formatCurrency(cancellationFee)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-300">
                <h3 className="font-bold text-lg mb-3">Cancellation Policy</h3>
                <ul className="text-gray-600 text-sm space-y-2 list-disc list-inside leading-relaxed">
                  <li>
                    <strong>More than 12 days before check-in:</strong> Full
                    refund — cancel without any fees.
                  </li>
                  <li>
                    <strong>10 to 12 days before check-in:</strong> 70% refund —
                    we’ll return most of your payment.
                  </li>
                  <li>
                    <strong>7 to 9 days before check-in:</strong> 50% refund —
                    half of your payment will be returned.
                  </li>
                  <li>
                    <strong>Less than 7 days before check-in:</strong> 35%
                    refund — a partial refund to cover our costs.
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">
                  Refunds are processed immediately and may take 5–10 business
                  days to appear in your account.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default CancelBooking;
