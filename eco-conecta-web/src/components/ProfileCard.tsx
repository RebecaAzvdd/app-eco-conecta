"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { deleteUser, updateUser} from "@/controllers/apiContentController";

export default function ProfileCard() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleEdit = (field: string) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field as keyof typeof prev],
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

   useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: user.password || "", // cuidado, normalmente não exibimos senha
      });
    }
  }, [user]);

    const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof formData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSave = async (field: keyof typeof formData) => {
  try {
     if (!userId) {
    console.error("ID do usuário não encontrado.");
    return;
  }
  console.log(userId, formData[field]);
    const updatedUser = await updateUser(userId, { [field]: formData[field] });
    console.log(`Campo ${field} atualizado com sucesso`, updatedUser);
    toggleEdit(field);
  } catch (error) {
    console.error(`Erro ao atualizar o campo ${field}:`, error);
    // Aqui você pode exibir uma mensagem de erro para o usuário
  }
};

  const handleLogout = () => {
  // Limpar cache local, localStorage, cookies, etc.
  localStorage.clear();
  sessionStorage.clear();
  // Se tiver algo específico no contexto, limpe também aqui

  // Redirecionar para a home (ajuste conforme sua rota)
  window.location.href = "/";
};

const userId = user?.id; 
 const handleDeleteAccount = async () => {
  if (!userId) {
    console.error("ID do usuário não encontrado.");
    return;
  }
  try {
    await deleteUser(userId);
    console.log("Conta deletada com sucesso");
    setShowDeleteModal(false);
    handleLogout(); // Após deletar, desloga e limpa cache
  } catch (error) {
    console.error("Erro ao deletar conta:", error);
    // Exiba mensagem de erro se desejar
  }
};

  return (
     <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
        {/* Header do Card */}
        <div className="text-center p-6 border-b border-gray-200">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600 mt-2">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

        {/* Conteúdo do Card */}
        <div className="p-6 space-y-6">
          {/* Campo Nome */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nome Completo
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                <input
                  id="name"
                  type="text"
                  placeholder="Seu nome completo"
                  disabled={!isEditing.name}
                  value={formData.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              {!isEditing.name ? (
                <button
                  onClick={() => toggleEdit("name")}
                  className="px-3 py-2 border border-green-200 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                  aria-label="Editar nome"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => handleSave("name")}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  disabled={!isEditing.email}
                  value={formData.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              {!isEditing.email ? (
                <button
                  onClick={() => toggleEdit("email")}
                  className="px-3 py-2 border border-green-200 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                  aria-label="Editar email"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => handleSave("email")}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>

          {/* Campo Senha */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c.5 0 1-.5 1-1V7a1 1 0 00-2 0v3c0 .5.5 1 1 1zM7 11v2a5 5 0 0010 0v-2M6 11a6 6 0 1112 0v2a7 7 0 01-14 0v-2z"
                  />
                </svg>
                <input
                  id="password"
                  type={isEditing.password ? "text" : "password"}
                  placeholder="Sua senha"
                  disabled={!isEditing.password}
                  value={formData.password}
                  onChange={(e) => handleInputChange(e, "password")}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-500"
                  autoComplete="new-password"
                />
              </div>
              {!isEditing.password ? (
                <button
                  onClick={() => toggleEdit("password")}
                  className="px-3 py-2 border border-green-200 text-green-600 rounded-md hover:bg-green-50 transition-colors"
                  aria-label="Editar senha"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => handleSave("password")}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                >
                  Salvar
                </button>
              )}
            </div>
          </div>

          {/* Botões Ação */}
          <div className="flex gap-4 justify-end">
            <button
              onClick={handleLogout}
              className="px-4 py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors"
            >
              Sair
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Excluir Conta
            </button>
          </div>
        </div>

        {/* Modal de confirmação para excluir conta */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
              <h2 className="text-lg font-semibold mb-4 text-black">
                Confirmar exclusão
              </h2>
              <p className="mb-6 text-black">
                Tem certeza que deseja excluir sua conta? Essa ação não pode
                ser desfeita.
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 border text-black border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
