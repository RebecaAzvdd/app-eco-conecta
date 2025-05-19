const { db } = require("../config/firebase");

const createEvent = async (req, res) => {
  const { title, description, date, location, category, imageUrl = "", authorId, authorName, interestedUserIds = [] } = req.body;

  try {
    const eventRef = db.collection("events").doc();
    await eventRef.set({
      id: eventRef.id,
      title,
      description,
      date: new Date(date),
      location,
      category,
      imageUrl,
      authorId,
      authorName,
      interestedUserIds,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Evento criado", id: eventRef.id });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar evento", details: error.message });
  }
};

module.exports = { createEvent };
