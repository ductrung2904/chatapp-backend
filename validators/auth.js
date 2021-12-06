const { check } = require('express-validator')

exports.userRegisterValidator = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Tên đăng nhập không được bỏ trống'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Mật khẩu không được bỏ trống'),
    check('firstName')
        .not()
        .isEmpty()
        .withMessage('Họ không được bỏ trống'),
    check('lastName')
        .not()
        .isEmpty()
        .withMessage('Tên không được bỏ trống'),
    check('email')
        .not()
        .isEmpty()
        .withMessage('Email không được bỏ trống'),
    check('email')
        .isEmail()
        .withMessage('Email không hợp lệ'),
    check('phone')
        .not()
        .isEmpty()
        .withMessage('Số điện thoại không được bỏ trống'),
    check('phone')
        .isLength({ min: 10, max: 10 })
        .withMessage('Số điện thoại phải có 10 số'),
    check('phone')
        .isNumeric()
        .withMessage('Số điện thoại phải là số'),
    check('address')
        .not()
        .isEmpty()
        .withMessage('Địa chỉ không được bỏ trống'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Mật khẩu phải có ít nhất 5 ký tự')
];

exports.userLoginValidator = [
    check('username')
        .not()
        .isEmpty()
        .withMessage('Tên đăng nhập không được bỏ trống'),
    check('password')
        .not()
        .isEmpty()
        .withMessage('Mật khẩu không được bỏ trống'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('Mật khẩu phải có ít nhất 5 ký tự')
];