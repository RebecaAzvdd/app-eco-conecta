const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
  toggleInterest,
  updateEvent,
} = require("../controllers/eventsController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/toggle-interest", toggleInterest);

module.exports = router;
