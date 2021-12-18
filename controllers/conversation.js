const Conversation = require('../models/Conversation')

// add new conversation
exports.addConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err);
    }
}

// get conversation of a user
exports.getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] }
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
}

// get conversation includes two userId
exports.getConversationMoreUsers = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.fisrtUserId, req.params.secondUserId] }
        });
        res.status(200).json(conversation)
    } catch (err) {
        res.status(500).json(err);
    }
}