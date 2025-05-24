import Image from "next/image";
import {
  PlusIcon,
  ExclamationTriangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

export default function Header() {
  return (
    <header className="bg-[rgba(20,26,34,0.75)] rounded-xl mt-8 mx-6 px-4 py-2 flex items-center justify-between shadow-md h-16">
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1 text-white text-sm hover:text-green-400">
          <PlusIcon className="w-5 h-5" />
          <span>Criar Post</span>
        </button>
        <button className="flex items-center gap-1 text-white text-sm hover:text-yellow-400">
          <ExclamationTriangleIcon className="w-5 h-5" />
          <span>Criar Evento</span>
        </button>
      </div>
      <div className="flex-grow flex justify-center">
        <Image
          src="/conecta.png"
          alt="Eco Conecta Logo"
          width={120}
          height={40}
          className="mx-auto"
        />
      </div>
      <div className="flex items-center">
        <button className="text-white hover:text-blue-400" title="Login">
          <ArrowRightStartOnRectangleIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
