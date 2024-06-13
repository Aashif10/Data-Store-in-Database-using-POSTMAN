const { Router } = require("express");
const { signUp, loginUser, logout } = require("../Controller/taskController");

const router = Router();
router.post("/signUp", signUp);
router.post("/login", loginUser);
router.post("/logout", logout);

module.exports = router;
