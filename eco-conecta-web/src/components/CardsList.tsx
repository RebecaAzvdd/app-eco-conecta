import React, { useEffect, useState } from "react";
import Card, { ContentCardProps } from "./Card";
import { fetchContent } from "@/controllers/apiContentController";

interface Props {
  type: "Evento" | "Post";
  filterParams?: {
    location?: string;
    date?: string;
  };
}

const CardsList: React.FC<Props> = ({ type, filterParams }) => {
  const [items, setItems] = useState<ContentCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Se filterParams for undefined ou vazio, carrega tudo
    fetchContent(type, filterParams)
      .then(setItems)
      .catch(() => setError("Erro ao carregar os dados"))
      .finally(() => setLoading(false));
  }, [type, filterParams]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  if (items.length === 0) return <p>Nenhum {type} encontrado.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card key={item.id} {...item} type={type} />
      ))}
    </div>
  );
};

export default CardsList;
