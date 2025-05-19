const { db } = require("../config/firebase");

const createUser = async (req, res) => {
  const { uid, displayName, email, photoURL = "", bio = "", role = "user" } = req.body;

  try {
    await db.collection("users").doc(uid).set({
      uid,
      displayName,
      email,
      photoURL,
      bio,
      role,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
};

module.exports = { createUser };
