const router = require("express").Router()
const { addMessage, getMessage } = require("../controllers/message");

router.post("/message", addMessage);

router.get("/message/:conversationId", getMessage);

module.exports = router;