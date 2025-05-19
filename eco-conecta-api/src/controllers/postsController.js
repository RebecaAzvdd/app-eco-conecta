const { db } = require("../config/firebase");

const createPost = async (req, res) => {
  const { title, content, imageUrl = "", tags = [], authorId, authorName } = req.body;

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
    res.status(500).json({ error: "Erro ao criar post", details: error.message });
  }
};

module.exports = { createPost };
