const admin = require('firebase-admin');
const { db } = require('../config/firebase'); // ajuste esse caminho se for diferente


async function seed() {
  try {
    // Cria o usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      uid: "test-user-22",
      email: "teste22@email.com",
      password: "123456", // coloque uma senha segura para testes
      displayName: "Usuárioo de Teste",
    });

    // Adiciona o mesmo usuário ao Firestore
    const userRef = db.collection("users").doc(userRecord.uid);
    await userRef.set({
      uid: userRecord.uid,
      displayName: userRecord.displayName,
      email: userRecord.email,
      role: "user",
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log("Usuário criado com sucesso.");
  } catch (error) {
    console.error("Erro ao criar usuário de teste:", error);
  }
}

seed()
  .then(() => console.log("Seed concluído com sucesso."))
  .catch((error) => console.error("Erro no seed:", error));
