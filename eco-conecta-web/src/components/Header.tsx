"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  PlusIcon,
  ExclamationTriangleIcon,
  ArrowRightStartOnRectangleIcon,
  UserIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import CreatePostModal from "./CreatePostModal";
import CreateEventModal from "./EventsModal";

const Header: React.FC = () => {
  const [isModalPostOpen, setIsModalPostOpen] = useState(false);
  const [isModalEventOpen, setIsModalEventOpen] = useState(false);
  return (
    <>
      <header className="relative bg-[rgba(20,26,34,0.75)] rounded-xl mt-8 mx-6 px-4 py-2 shadow-md h-16 font-sans">
        {/* Seção Esquerda */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
          <button
            onClick={() => setIsModalPostOpen(true)}
            className="flex items-center gap-1 text-white text-sm hover:text-[#02391e]"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Criar Post</span>
          </button>

          <button
            onClick={() => setIsModalEventOpen(true)}
            className="flex items-center gap-1 text-white text-sm hover:text-[#02391e]"
          >
            <ExclamationTriangleIcon className="w-5 h-5" />
            <span>Criar Evento ou Denúncia</span>
          </button>
        </div>

        {/* Logo Central Absoluta */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Link href="/">
            <Image
              src="/conecta.png"
              alt="Eco Conecta Logo"
              width={120}
              height={40}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Seção Direita */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 gap-3">
          <Link href="/profile">
            <button className="text-white hover:text-[#02391e]" title="Login">
              <UserIcon className="w-6 h-6" />
            </button>
          </Link>
          <Link href="/login">
            <button className="text-white hover:text-[#02391e]" title="Login">
              <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
            </button>
          </Link>
        </div>
      </header>

      {/* Coloque o modal aqui, fora do header */}
      <CreatePostModal
        isOpen={isModalPostOpen}
        onClose={() => setIsModalPostOpen(false)}
      />
      <CreateEventModal
        isOpen={isModalEventOpen}
        onClose={() => setIsModalEventOpen(false)}
      />
    </>
  );
};
export default Header;
