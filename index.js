const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Kết nối database thành công');
    }).catch((err) => {
        console.log('Lỗi server', err)
    })

const port = process.env.PORT || 5001;

app.use(require("./routes/conversation"));
app.use(require("./routes/users"));
app.use(require("./routes/message"));
app.use(require("./routes/auth"));

app.listen(port, () => {
    console.log(`Backend running on port ${port}`)
})