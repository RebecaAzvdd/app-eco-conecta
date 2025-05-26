import axios from "axios";
import { ContentCardProps } from "@/components/Card";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/";


export const fetchContent = async (
  type: "event" | "post",
  filterParams?: { location?: string; date?: string }
): Promise<ContentCardProps[]> => {
  const apiUrl = {
    event: `${API_URL}api/events`,
    post: `${API_URL}api/posts`,
  }[type];
  const response = await axios.get<ContentCardProps[]>(apiUrl, {
    params: filterParams,
  });
  return response.data;
};
