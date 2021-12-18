const Message = require('../models/Message')

// add message
exports.addMessage = async (req, res) => {
    const newMessge = new Message(req.body);

    try {
        const savedMessage = await newMessge.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get message
exports.getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}