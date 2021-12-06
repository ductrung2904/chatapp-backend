const router = require("express").Router()
const Message = require("../models/Message")

// add message
router.post("/message", async (req, res) => {
    const newMessge = new Message(req.body);

    try {
        const savedMessage = await newMessge.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
});

// get message
router.get("/message/:conversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;