'use client';
import {
  ContentItem,
  fetchFilteredEvents,
  fetchFilteredPosts,
} from "@/controllers/apiFilterController";
import { useState } from "react";

const FilterSection = () => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<ContentItem[]>([]);
  const [filterType, setFilterType] = useState<"Evento" | "post">("event");

  const handleSearch = async () => {
    try {
      const data =
        filterType === "Evento"
          ? await fetchFilteredEvents(location, date)
          : await fetchFilteredPosts(location, date);
      setResults(data);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
      setResults([]);
    }
  };

  return (
    <div className="p-4 rounded-md max-w-2xl mx-auto mt-6">
      <h2 className="text-xl text-green-950 font-semibold mb-4 text-center">
        Filtrar Eventos ou Posts
      </h2>

      <div className="flex flex-col text-green-950 md:flex-row gap-4 mb-4">
        <input
          type="text"
          placeholder="Localização"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full"
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="flex justify-center gap-4 mb-4">
        <button
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-[#02391e]"
          onClick={() => {
            setFilterType("event");
            handleSearch();
          }}
        >
          Buscar Eventos
        </button>

        <button
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-[#02391e]"
          onClick={() => {
            setFilterType("post");
            handleSearch();
          }}
        >
          Buscar Posts
        </button>
      </div>

      {results.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Resultados ({results.length}):
          </h3>
          <ul className="space-y-2">
            {results.map((item) => (
              <li key={item.id} className="p-3 border rounded bg-gray-50">
                <p className="font-bold">{item.title}</p>
                <p>{item.location}</p>
                <p className="text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
