import { useForm } from "react-hook-form";
import { useCreateRating } from "../Hooks/useRating.tsx";
import Column from "../../../Components/Ui/Column.tsx";
import ReviewImage from "./ReviewImage.tsx";
import ReviewHeader from "./ReviewHeader.tsx";
import ReviewRatingSection from "./ReviewRatingSection.tsx";
import ReviewCategory from "./ReviewCategory.tsx";
import ReviewCheckboxes from "./ReviewCheckboxes.tsx";
import ReviewCommentBox from "./ReviewCommentBox.tsx";
import { useLocation } from "react-router-dom";
import useRoom from "../../../Hooks/useRoom.tsx";
import routers from "../../../Constants/routers.tsx";
import useNavigation from "../../../Utils/navigate.tsx";

interface ReviewFormInputs {
  rating: number;
  staffRating: number;
  cleanlinessRating: number;
  title: string;
  comment: string;
  recommend: boolean;
  returnAgain: boolean;
}

const ReviewForm = () => {
  const { createRating, isRatingCreating } = useCreateRating();
  const { goTo } = useNavigation();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const bookingId = location.state?.bookingId;
  const { room } = useRoom(roomId || "");

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

  const onSubmit = async (data: ReviewFormInputs) => {
    const payload = {
      stars: data.rating,
      staff_rate: data.staffRating,
      cleanliness_rate: data.cleanlinessRating,
      recommended_for_friends: data.recommend,
      stay_again: data.returnAgain,
      title: data.title || undefined,
      experience_comment: data.comment || undefined,
      room_id: room?.id!,
      booking_id: bookingId
    };

    await createRating(payload);
    goTo(routers.reviews);
  };

  const currentCleanliness = watch("cleanlinessRating");
  const currentStaff = watch("staffRating");
  const image = room?.image
    ? `data:image/jpeg;base64,${room.image}`
    : undefined;

  return (
    <Column className="w-full max-w-3xl bg-white rounded-xl shadow-md overflow-hidden">
      <ReviewImage image={image} />
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
        <ReviewHeader roomType={room?.type} />
        <ReviewRatingSection
          watch={watch}
          handleRate={handleRate}
          errors={errors}
        />
        <ReviewCategory
          label="How would you rate our staff?"
          name="staffRating"
          options={[
            {
              value: 4,
              label: "Outstanding!",
              emoji: "😊",
              desc: "Friendly, helpful, and professional",
            },
            {
              value: 3,
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
          ]}
          currentValue={currentStaff}
          setValue={setValue}
        />
        <ReviewCategory
          label="How would you describe the cleanliness?"
          name="cleanlinessRating"
          options={[
            {
              value: 4,
              label: "Spotless!",
              emoji: "🧼",
              desc: "Everything sparkles!",
            },
            {
              value: 3,
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
          ]}
          currentValue={currentCleanliness}
          setValue={setValue}
          error={errors.cleanlinessRating}
        />
        <ReviewCheckboxes register={register} />
        <ReviewCommentBox register={register} />
        <button
          type="submit"
          disabled={isSubmitting || isRatingCreating || watch("rating") === 0}
          className={`mt-8 w-full py-3.5 rounded-lg font-medium transition ${
            isSubmitting || isRatingCreating || watch("rating") === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {isSubmitting || isRatingCreating ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </Column>
  );
};

export default ReviewForm;
