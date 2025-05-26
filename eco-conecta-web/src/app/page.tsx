"use client";
import CardsList from "@/components/CardsList";
import FilterSection from "@/components/FilterEvents";
import Header from "@/components/Header";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<
    { location?: string; date?: string } | undefined
  >(undefined);

  return (
    <>
      <Header />
      <FilterSection />
      <CardsList type="event" filterParams={filter} />
      <CardsList type="post" filterParams={filter} />
    </>
  );
};

export default HomePage;
