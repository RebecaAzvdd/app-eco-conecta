export type Post = {
  title: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
  authorId: string;
  authorName: string;
};

export type Event = {
    title: string;
    description: string;
    date?: string;
    location?: string;
    imageUrl?: string;
    category?: string;
    authorId: string;
    authorName: string;
}