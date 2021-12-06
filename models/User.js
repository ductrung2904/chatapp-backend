const mongoose = require("mongoose")
const crypto = require('crypto')

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            min: 5,
            max: 20,
            unique: true
        },
        hashed_password: {
            type: String,
            required: true,
            min: 5
        },
        salt: String,
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        profilePicture: {
            type: String,
            default: ""
        },
        phone: {
            type: String,
            required: true,
            max: 10,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true
        },
        address: {
            type: String,
            max: 50
        }
    },
    { timestamps: true }
);

UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function (password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function () {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
}

module.exports = mongoose.model("User", UserSchema);