const User = require('../models/User')

// add user
exports.addUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        profilePicture: req.body.profilePicture,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    });

    try {
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

// update user
exports.updateUser = async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json("Tài khoản đã được cập nhật")
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Lỗi cập nhật");
    }
}

// delete user
exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Xóa tài khoản thành công");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("Xóa tài khoản thất bại")
    }
}

// get a user
exports.getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
    } catch (err) {
        res.status(500).json(err);
    }
    // const users = await User.find({})
    // res.status(200).json(users)
}