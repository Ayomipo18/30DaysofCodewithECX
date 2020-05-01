const express = require('express');
const path = require('path');
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
router.get("/logs", (req, res) => {
	res.sendFile(path.join(__dirname, '../access.log'));
});

router.param("userId", userById);

module.exports = router;