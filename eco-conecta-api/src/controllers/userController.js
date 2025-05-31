const { db } = require("../config/firebase");

const createUser = async (req, res) => {
  const { uid, displayName, email, photoURL = "", bio = "", role = "user", password} = req.body;

  try {
    await db.collection("users").doc(uid).set({
      uid,
      displayName,
      email,
      photoURL,
      bio,
      role,
      password,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
};

const getUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const userDoc = await db.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário", details: error.message });
  }
};
const updateUser = async (req, res) => {
  const { uid } = req.params;
  const { displayName, email, photoURL, bio, role, password } = req.body;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await userRef.update({
      displayName,
      email,
      photoURL,
      bio,
      role,
      password,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { uid } = req.params;

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    await userRef.delete();
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar usuário", details: error.message });
  }
};
module.exports = { createUser, getUser, updateUser, deleteUser };
