const express = require("express");
const router = express.Router();

const loginService = require("../Services/login.service");
router.post("/login", loginService.login);

module.exports = router;