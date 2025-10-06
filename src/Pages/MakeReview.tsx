import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FullHeader from "../Components/Header/FullHeader.tsx";
import Footer from "../Components/Footer/Footer.tsx";
import { Booking } from "../Types/Booking.tsx";

interface ReviewFormInputs {
  rating: number;
  staffRating: number;
  cleanlinessRating: number;
  title: string;
  comment: string;
  recommend: boolean;
  returnAgain: boolean;
}

const MakeReview = () => {
  const [roomData, setRoomData] = useState<{
    image: string;
    type: string;
  } | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("reviewBooking");
    if (saved) {
      try {
        const booking: Booking = JSON.parse(saved);
        setRoomData({
          image: booking.room.image,
          type: booking.room.type,
        });
        sessionStorage.removeItem("reviewBooking");
      } catch (e) {
        console.error("Failed to load review data from sessionStorage", e);
      }
    }
  }, []);

  const image = roomData?.image
    ? `image/jpeg;base64,${roomData.image}`
    : undefined;
  const type = roomData?.type || "this property";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ReviewFormInputs>({
    defaultValues: {
      rating: 0,
      staffRating: 0,
      cleanlinessRating: 0,
      title: "",
      comment: "",
      recommend: false,
      returnAgain: false,
    },
  });

  const handleRate = (value: number) => {
    setValue("rating", value, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = (data) => {
    console.log("Submitted review:", data);
  };

  const currentCleanliness = watch("cleanlinessRating");
  const currentStaff = watch("staffRating");

  if (!roomData) {
    return (
      <>
        <FullHeader />
        <div className="pt-40 pb-20 min-h-screen flex justify-center">
          <div className="text-center">
            <p className="text-gray-600">Loading your stay details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <FullHeader />

      <div className="pt-40 pb-20 min-h-screen flex justify-center">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
          <div className="h-64 w-full">
            <img
              alt="Room"
              className="w-full h-full object-cover"
              src={image}
            />
          </div>

          <div className="p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Review your stay
            </h2>
            <p className="text-gray-600 mb-6">
              How was your stay at <span className="font-medium">{type}</span>?
            </p>

            {/* Заголовок відгуку */}
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Give your review a title
              </label>
              <input
                id="title"
                type="text"
                {...register("title")}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., 'Perfect weekend escape!'"
              />
            </div>

            {/* Загальний рейтинг (1–10) */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall rating
              </label>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Not good</span>
                <span>Outstanding</span>
              </div>
              <div className="flex border rounded-lg overflow-hidden">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleRate(num)}
                    className={`flex-1 py-3 text-center border-r last:border-r-0 text-sm transition-colors ${
                      watch("rating") === num
                        ? "bg-orange-500 text-white font-medium"
                        : "text-gray-700 hover:bg-orange-50"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">
                  Please select an overall rating.
                </p>
              )}
            </div>

            {/* Рейтинг персоналу — у стилі чистоти ✨ */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-3">
                How would you rate our staff?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    value: 5,
                    label: "Outstanding!",
                    emoji: "😊",
                    desc: "Friendly, helpful, and professional",
                  },
                  {
                    value: 4,
                    label: "Good service",
                    emoji: "🙂",
                    desc: "Polite and responsive",
                  },
                  {
                    value: 2,
                    label: "Just okay",
                    emoji: "😐",
                    desc: "Did the job, but nothing special",
                  },
                  {
                    value: 1,
                    label: "Poor experience",
                    emoji: "😞",
                    desc: "Unfriendly or unhelpful",
                  },
                ].map((opt) => (
                  <button
                    key={`staff-${opt.value}`}
                    type="button"
                    onClick={() =>
                      setValue("staffRating", opt.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={`p-4 text-left rounded-lg border transition-all ${
                      currentStaff === opt.value
                        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{opt.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">
                          {opt.label}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {/* Опціонально: помилка */}
              {/* {errors.staffRating && (
                <p className="mt-2 text-sm text-red-600">Please rate our staff.</p>
              )} */}
            </div>

            {/* Чистота */}
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-3">
                How would you describe the cleanliness?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    value: 5,
                    label: "Spotless!",
                    emoji: "🧼",
                    desc: "Everything sparkles!",
                  },
                  {
                    value: 4,
                    label: "Clean & tidy",
                    emoji: "👍",
                    desc: "Fresh and well-maintained.",
                  },
                  {
                    value: 2,
                    label: "Could be cleaner",
                    emoji: "😕",
                    desc: "Noticeable dust or stains.",
                  },
                  {
                    value: 1,
                    label: "Unacceptable",
                    emoji: "🚫",
                    desc: "Serious hygiene issues.",
                  },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setValue("cleanlinessRating", opt.value, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={`p-4 text-left rounded-lg border transition-all ${
                      currentCleanliness === opt.value
                        ? "border-orange-500 bg-orange-50 ring-2 ring-orange-100"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start">
                      <span className="text-2xl mr-3">{opt.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">
                          {opt.label}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              {errors.cleanlinessRating && (
                <p className="mt-2 text-sm text-red-600">
                  Please select a cleanliness level.
                </p>
              )}
            </div>

            {/* Так/Ні питання */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <input
                  id="recommend"
                  type="checkbox"
                  {...register("recommend")}
                  className="mt-1 h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <label
                  htmlFor="recommend"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Would you recommend this property to a friend?
                </label>
              </div>

              <div className="flex items-start">
                <input
                  id="returnAgain"
                  type="checkbox"
                  {...register("returnAgain")}
                  className="mt-1 h-4 w-4 text-orange-600 rounded focus:ring-orange-500"
                />
                <label
                  htmlFor="returnAgain"
                  className="ml-3 block text-sm text-gray-700"
                >
                  Would you stay here again?
                </label>
              </div>
            </div>

            {/* Коментар */}
            <div className="mt-6">
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Share your experience (optional)
              </label>
              <textarea
                id="comment"
                {...register("comment")}
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                placeholder="What did you like? What could be improved?"
              />
            </div>

            {/* Кнопка */}
            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting || watch("rating") === 0}
              className={`mt-8 w-full py-3.5 rounded-lg font-medium transition ${
                isSubmitting || watch("rating") === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-orange-500 text-white hover:bg-orange-600"
              }`}
            >
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MakeReview;
