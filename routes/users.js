const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt");
const { addUser, updateUser, deleteUser, getUser } = require("../controllers/user");

router.post("/users", addUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

router.get("/users", getUser);

module.exports = router;