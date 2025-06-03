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
import { useAuth } from "@/context/AuthContext";
const Header: React.FC = () => {
  const { user, loading } = useAuth(); 
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
           {user ? (
            <Link href="/profile" passHref>
              <button
                className="text-white hover:text-[#02391e]"
                title="Perfil"
              >
                <UserIcon className="w-6 h-6" />
              </button>
            </Link>
          ) : (
            <button
              className="text-gray-400 cursor-not-allowed relative group"
              title="Faça login para acessar o perfil"
              onClick={(e) => e.preventDefault()}
            >
              <UserIcon className="w-6 h-6" />
              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                Faça login para acessar o perfil
              </span>
            </button>
          )}
          <Link href="/login" passHref>
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
