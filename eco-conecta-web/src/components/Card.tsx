import React from "react";

export interface ContentCardProps {
  id: string;
  title: string;
  description?: string;
  content?: string;
  date: string;
  location?: string;
  imageUrl?: string;
  category?: string;
  authorName?: string;
  tags?: string[];
  type?: "Evento" | "Post";
}

const Card: React.FC<ContentCardProps> = ({
  title,
  description,
  content,
  date,
  location,
  tags,
  category,
  authorName,
  type,
}) => {
  const formattedDate = new Date(date).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const badgeIcon = type === "Evento" ? "📅" : type === "Post" ? "📝" : "❗";

  const infoText = type === "Post" ? content : description;

  return (
    <div className="bg-[#1E293B] text-white rounded-2xl shadow-lg p-5 max-w-md w-full mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-[#334155] p-2 rounded-full text-xl">{badgeIcon}</div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <hr className="border-[#334155] mb-4" />

      {/* Extra Info */}
      {infoText && (
        <div className="flex items-center gap-2 text-sm bg-[#334155] px-3 py-2 rounded-xl text-[#d1d5db]">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="truncate">
            {category ? `${category} · ` : ""}
            {infoText}
          </span>
        </div>
      )}

      {/*tags */}
      <div className="">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-[#334155] text-xs px-2 py-1 "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <hr className="border-[#334155] mb-4" />

      {/* Author */}
      {authorName && (
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-sm font-bold">
            {authorName.charAt(0)}
          </div>
          <span className="text-sm bg-[#334155] px-2 py-1 rounded-lg">
            {authorName}
          </span>
          <h2 className="text-md font-semibold bg-gre">{type}</h2>
        </div>
      )}

      {/* Date Row */}
      <div className="flex items-center gap-2 text-sm mb-3">
        {/* Location (only for events) */}
        {type === "Evento" && location && (
          <p className=" text-sm text-gray-400">📍 {location}</p>
        )}

        <span className="text-[#8b5cf6] text-xl">📆</span>
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export default Card;
