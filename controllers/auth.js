const User = require('../models/User');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt');

exports.register = (req, res) => {
    User.findOne({ username: req.body.username }).exec((err, user) => {
        // kiểm tra tài khoản đã tồn tại hay chưa
        if (user) {
            return res.status(400).json({
                error: 'Tên đăng nhập đã tồn tại'
            });
        }

        const { username, password, firstName, lastName, gender, profilePicture, phone, email, address } = req.body;
        let newUser = new User({ username, password, firstName, lastName, gender, profilePicture, phone, email, address });
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({ message: 'Đăng ký tài khoản mới thành công!!', user: success })
        })
    })
}

exports.login = (req, res) => {
    const { username, password } = req.body;
    // kiểm tra tài khoản đã tồn tại hay chưa
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'Tài khoản này không tồn tại'
            })
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: 'Tên đăng nhập hoặc mật khẩu không đúng'
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.cookie('token', token, { expiresIn: '1d' });
        const { _id, username, firstName, lastName, gender, profilePicture, phone, email, address } = user;
        return res.json({
            token,
            user: { _id, username, firstName, lastName, gender, profilePicture, phone, email, address }
        })
    })
}

exports.logout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Đăng xuất thành công' })
}

exports.requireLogin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
});