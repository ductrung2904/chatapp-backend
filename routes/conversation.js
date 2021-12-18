const router = require("express").Router()
const { addConversation, getConversation, getConversationMoreUsers } = require("../controllers/conversation");

router.post("/conversation", addConversation);

router.get("/conversation/:userId", getConversation);

router.get("/conversation/find/:fisrtUserId/:secondUserId", getConversationMoreUsers);

module.exports = router;