const express = require('express');
const { verifyUser, getUser, getAllUsers, updateUser, deleteUser} = require("../controllers/user");

const router = express.Router();

router.get("/getUser",verifyUser, getUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser", verifyUser, updateUser);
router.delete("/deleteUser", verifyUser, deleteUser);

module.exports = router;