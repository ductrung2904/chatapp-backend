const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require("path");
const multer = require("multer")
require('dotenv').config()
const app = express()
const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
        credential: true
    }
})

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    //when connect
    // console.log("a user connected.");

    //take userId and socketId from user
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    //send and get message
    socket.on("sendMessage", ({ senderId, receiverId, text, type }) => {
        const user = getUser(receiverId);
        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
            type
        });
    });

    //when disconnect
    socket.on("disconnect", () => {
        // console.log("a user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "public/upload");
    },
    filename: (req, res, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploaded successfully");
    } catch (error) {
        console.error(error);
    }
});

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('K???t n???i database th??nh c??ng');
    }).catch((err) => {
        console.log('L???i server', err)
    })

const port = process.env.PORT || 5001;

app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(require("./routes/conversation"));
app.use(require("./routes/users"));
app.use(require("./routes/message"));
app.use(require("./routes/auth"));

httpServer.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})