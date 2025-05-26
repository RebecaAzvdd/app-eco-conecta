import axios from "axios";

export interface ContentItem {
  id: string;
  title: string;
  location?: string;
  date: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";

export const fetchFilteredEvents = async (
  location: string,
  date: string
): Promise<ContentItem[]> => {
  try {
    const { data } = await axios.get<ContentItem[]>(`${API_URL}api/events`);

    return data.filter((event) => {
      const itemDate = new Date(event.date).toISOString().split("T")[0];
      const matchesLocation =
        location === "" ||
        event.location?.toLowerCase().includes(location.toLowerCase());
      const matchesDate = date === "" || itemDate === date;

      return matchesLocation && matchesDate;
    });
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    throw error;
  }
};

export const fetchFilteredPosts = async (
    location: string,
    date: string
  ): Promise<ContentItem[]> => {
    try {
      const { data } = await axios.get<ContentItem[]>(`${API_URL}api/posts`);
  
      return data.filter((post) => {
        const itemDate = new Date(post.date).toISOString().split("T")[0];
        const matchesLocation =
          location === "" ||
          post.location?.toLowerCase().includes(location.toLowerCase());
        const matchesDate = date === "" || itemDate === date;
  
        return matchesLocation && matchesDate;
      });
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
      throw error;
    }
  };
