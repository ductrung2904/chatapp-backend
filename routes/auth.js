const router = require("express").Router()
const { userRegisterValidator, userLoginValidator } = require("../validators/auth")
const { runValidation } = require('../validators')
const { register, login, logout, requireLogin } = require("../controllers/auth")

// register
router.post("/register", userRegisterValidator, runValidation, register);

router.post("/login", userLoginValidator, runValidation, login);

router.get("/logout", logout);

// router.get("/secret", requireLogin, (req, res) => {
//     res.json({ message: "You have access" })
// })

module.exports = router;