"use client";
import CardsList from "@/components/CardsList";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useState } from "react";

const HomePage: React.FC = () => {
  const [filter, setFilter] = useState<
    { location?: string; date?: string } | undefined
  >(undefined);

  return (
    <>
      <Header />
      {/* Hero Section */}
      <div className="py-10">
        <Hero />
      </div>
      <div className="px-4 sm:px-10 md:px-20 py-10 space-y-14">
        {/* Seção de Eventos */}
        <section>
          <h2 className="text-4xl font-bold text-black text-center mb-8">
            Eventos
          </h2>
          <div className="">
            <CardsList type="Evento" filterParams={filter} />
          </div>
        </section>

        {/* Seção de Posts */}
        <section>
          <h2 className="text-4xl font-bold text-black text-center mb-8">
            Posts
          </h2>
          <div className="">
            <CardsList type="Post" filterParams={filter} />
          </div>
        </section>
      </div>
      {/* Footer Section */}
      <Footer />
    </>
  );
};

export default HomePage;
