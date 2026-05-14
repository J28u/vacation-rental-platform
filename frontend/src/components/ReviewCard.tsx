import type { Review } from "../types/api";

export const ReviewCard = ({ message, author, created_at }: Review) => {
  const date = new Date(created_at).toLocaleDateString("fr-FR");
  return (
    <div className="gap-4 mb-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-gray-600 font-semibold, text-xl ">
          {author}, {date}
        </p>
        <p className="mt-4 text-gray-600 font-light leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  );
};
