const express = require('express');
const { getUser } = require("../controllers/user");
const { requireSignin } = require("../controllers/auth");

const router = express.Router();

router.get("/getUser", requireSignin, getUser);
module.exports = router;