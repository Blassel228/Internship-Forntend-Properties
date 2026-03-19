import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface ReviewData {
  id?: string;
  image?: string;
  propertyName: string;
  propertyUrl?: string;
  published?: string;
  rating: number;
  pros?: string[];
  cons?: string[];
}

export default function CompletedReviewCard({
  review,
}: {
  review: ReviewData;
}) {
  const formattedDate = review.published
    ? new Date(review.published).toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="flex gap-4 w-full max-w-3xl bg-white shadow-md rounded-lg border border-gray-200 p-4 sm:p-6">
      <img
        src={review.image || "https://via.placeholder.com/100"}
        alt={review.propertyName}
        className="w-28 h-28 object-cover rounded-md flex-shrink-0"
      />

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-green-600 text-sm font-medium block mb-1">
              Відгук опубліковано
            </span>
            <a
              href={review.propertyUrl || "#"}
              className="text-blue-600 font-semibold hover:underline"
            >
              {review.propertyName}
            </a>
            <p className="text-sm text-gray-500 mt-0.5">{formattedDate}</p>
          </div>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="p-1 rounded hover:bg-gray-100">
                <svg
                  className="w-5 h-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="5" cy="12" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="19" cy="12" r="1.5" />
                </svg>
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              align="end"
              className="bg-white border rounded-md shadow-md text-sm text-gray-700"
            >
              <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Редагувати
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-3 py-2 hover:bg-gray-100 cursor-pointer">
                Видалити
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="bg-blue-600 text-white text-lg font-semibold px-3 py-0.5 rounded-md">
            {review.rating}
          </div>
          <span className="font-semibold text-gray-800">Відмінно</span>
        </div>

        {review.pros && review.pros.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center text-green-700 font-medium mb-1">
              <SmileIcon /> <span>:</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.pros.join(", ")}
            </p>
          </div>
        )}

        {review.cons && review.cons.length > 0 && (
          <div>
            <div className="flex items-center text-red-600 font-medium mb-1">
              <FrownIcon /> <span>:</span>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {review.cons.join(", ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const SmileIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 17c2.5 0 4.5-1.5 5.2-3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8.5 10.5h.01M15.5 10.5h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);

const FrownIcon = () => (
  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 17c-2.5 0-4.5-1.5-5.2-3.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M8.5 10.5h.01M15.5 10.5h.01"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.2"
      fill="none"
    />
  </svg>
);
