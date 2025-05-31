import axios from "axios";
import { ContentCardProps } from "@/components/Card";
import { Post, Event} from "@/types/content";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";


export const fetchContent = async (
  type: "Evento" | "Post",
  filterParams?: { location?: string; date?: string }
): Promise<ContentCardProps[]> => {
  const apiUrl = {
    Evento: `${API_URL}api/events`,
    Post: `${API_URL}api/posts`,
  }[type];
  const response = await axios.get<ContentCardProps[]>(apiUrl, {
    params: filterParams,
  });
  return response.data;
};

export const createPost = async (post: Post): Promise<Post> => {
  const response = await axios.post<Post>(`${API_URL}api/posts`, post);
  return response.data;
}

export const createEvent = async (event: Event): Promise<Event> => {
  const response = await axios.post<Event>(`${API_URL}api/events`, event);
  return response.data;
};