const { db } = require("../config/firebase");

const createPost = async (req, res) => {
  const {
    title,
    content,
    imageUrl = "",
    tags = [],
    authorId,
    authorName,
  } = req.body;

  try {
    const postRef = db.collection("posts").doc();
    await postRef.set({
      id: postRef.id,
      title,
      content,
      imageUrl,
      tags,
      authorId,
      authorName,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Post criado", id: postRef.id });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao criar post", details: error.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const snapshot = await db
      .collection("posts")
      .orderBy("createdAt", "desc")
      .get();
    const posts = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar posts", details: error.message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const postRef = db.collection("posts").doc(id);
    const doc = await postRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar post", details: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, imageUrl, tags } = req.body;

  try {
    const postRef = db.collection("posts").doc(id);
    const doc = await postRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    await postRef.update({
      title,
      content,
      imageUrl,
      tags,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Post atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar post", details: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const postRef = db.collection("posts").doc(id);
    const doc = await postRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Post não encontrado" });
    }

    await postRef.delete();
    res.status(200).json({ message: "Post deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar post", details: error.message });
  }
};

const getPostsByAuthor = async (req, res) => {
  const { authorId } = req.params;

  try {
    const snapshot = await db
      .collection("posts")
      .where("authorId", "==", authorId)
      .orderBy("createdAt", "desc")
      .get();
    const posts = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(posts);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar posts do autor", details: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsByAuthor,
};
