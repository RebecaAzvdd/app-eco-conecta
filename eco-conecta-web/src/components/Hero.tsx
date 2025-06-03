"use client";

export default function Hero() {
  const words = [
    { text: "Inovação", color: "text-blue-600" },
    { text: "Criatividade", color: "text-red-600" },
    { text: "Excelência", color: "text-purple-600" },
    { text: "Qualidade", color: "text-orange-600" },
  ];

  return (
    <div className="w-full  mx-auto hero-background" style={{ backgroundImage: `url('/banner.jpg')` }}>
      {/* Hero Principal */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Seção de Palavras */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl lg:text-7xl font-bold text-white leading-tight">
                EcoConecta
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-800 to-purple-600">
                  Ajuda você a se conectar com o mundo
                </span>
              </h1>

              <p className="text-xl text-white leading-relaxed max-w-lg">
                Descubra como nossa plataforma inovadora pode transformar a
                maneira como você se conecta com o meio ambiente e a comunidade.
                Junte-se a nós na construção de um futuro mais sustentável e
                conectado.
              </p>
            </div>

            {/* Palavras Animadas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700">
                Nossos valores:
              </h3>
              <div className="flex flex-wrap gap-4">
                {words.map((word, index) => (
                  <div
                    key={index}
                    className={`px-6 py-3 rounded-full border-2 border-current ${word.color} 
                      `}
                  >
                    <span className="font-semibold">{word.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
