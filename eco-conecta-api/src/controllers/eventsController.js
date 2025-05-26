const { db } = require("../config/firebase");

const createEvent = async (req, res) => {
  const {
    title,
    description,
    date,
    location,
    category,
    imageUrl = "",
    authorId,
    authorName,
    interestedUserIds = [],
  } = req.body;

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
    res
      .status(500)
      .json({ error: "Erro ao criar evento", details: error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const snapshot = await db
      .collection("events")
      .orderBy("createdAt", "desc")
      .get();
    const events = snapshot.docs.map((doc) => doc.data());
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar eventos", details: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
    const eventRef = db.collection("events").doc(id);
    const doc = await eventRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    res.status(200).json(doc.data());
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao buscar evento", details: error.message });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    date,
    location,
    category,
    imageUrl,
    authorId,
    authorName,
    interestedUserIds,
  } = req.body;

  try {
    const eventRef = db.collection("events").doc(id);
    const doc = await eventRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    await eventRef.update({
      title,
      description,
      date: new Date(date),
      location,
      category,
      imageUrl,
      authorId,
      authorName,
      interestedUserIds,
      updatedAt: new Date(),
    });

    res.status(200).json({ message: "Evento atualizado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar evento", details: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const eventRef = db.collection("events").doc(id);
    const doc = await eventRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    await eventRef.delete();
    res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao deletar evento", details: error.message });
  }
};

const toggleInterest = async (req, res) => {
  const { id } = req.params; // id do evento
  const { userId } = req.body;

  try {
    const eventRef = db.collection("events").doc(id);
    const eventDoc = await eventRef.get();

    if (!eventDoc.exists) {
      return res.status(404).json({ error: "Evento não encontrado" });
    }

    const eventData = eventDoc.data();
    const updatedUserIds = eventData.interestedUserIds || [];

    const index = updatedUserIds.indexOf(userId);
    if (index > -1) {
      // já existe → remover
      updatedUserIds.splice(index, 1);
    } else {
      // não existe → adicionar
      updatedUserIds.push(userId);
    }

    await eventRef.update({ interestedUserIds: updatedUserIds });

    res
      .status(200)
      .json({
        message: "Interesse atualizado",
        interestedUserIds: updatedUserIds,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao atualizar interesse", details: error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  toggleInterest,
};
