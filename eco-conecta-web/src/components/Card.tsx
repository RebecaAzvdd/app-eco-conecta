export interface ContentCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
  category?: string;
  authorName?: string;
  type?: "event" | "post";
}

const Card: React.FC<ContentCardProps> = ({
  title,
  description,
  date,
  location,
  imageUrl,
  category,
  authorName,
  type,
}) => {
  const badgeColor =
    type === "event"
      ? "bg-green-600"
      : type === "post"
      ? "bg-blue-600"
      : "bg-red-600";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 w-full max-w-xl mx-auto">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      )}

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span
            className={`text-white text-xs px-2 py-1 rounded ${badgeColor}`}
          >
            {type?.toUpperCase()}
          </span>
          <span className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </span>
        </div>

        <h2 className="text-lg font-semibold mb-1">{title}</h2>

        {category && (
          <span className="inline-block text-xs text-gray-600 mb-1">
            Categoria: {category}
          </span>
        )}

        <p className="text-sm text-gray-700 line-clamp-3">{description}</p>

        <div className="mt-3 text-sm text-gray-500">
          <p>📍 {location}</p>
          {authorName && <p>✍️ {authorName}</p>}
        </div>
      </div>
    </div>
  );
};

export default Card;