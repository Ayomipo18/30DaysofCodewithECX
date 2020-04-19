const express = require('express');
const { userById,
 		verifyUser,
 		getUser,
 		getAllUsers,
 		updateUser,
 		deleteUser} = require("../controllers/user");

const router = express.Router();

router.get("/getUser/:userId",verifyUser, getUser);
router.get("/getAllUsers", getAllUsers);
router.put("/updateUser/:userId", verifyUser, updateUser);
router.delete("/deleteUser/:userId", verifyUser, deleteUser);

router.param("userId", userById);

module.exports = router;