import Image from "next/image"
export default function Footer() {
  return (
    <footer className="bg-green-600 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center">
          <div className="text-center">
            {/* Logo usando texto - você pode substituir por uma imagem */}
            <div className="text-white text-2xl font-bold mb-2">EcoConecta</div>
            {/* Ou use uma imagem assim: */}
            <Image
              src="/conecta.png" 
              width={120}
              height={40}
              alt="Logo"
              className="mx-auto"
            /> 
            <p className="text-green-100 text-sm">© 2024 RebecaAzvdd. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
