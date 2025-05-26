const express = require("express");
const router = express.Router();
const { createUser, getUser, deleteUser, updateUser } = require("../controllers/userController");

router.post("/", createUser);
router.get("/:uid", getUser);
router.put("/:uid", updateUser);
router.delete("/:uid", deleteUser);

module.exports = router;
