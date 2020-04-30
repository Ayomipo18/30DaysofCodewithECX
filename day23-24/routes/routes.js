const express = require('express');
const path = require('path');
const { signup, login } = require('../controllers/auth');
const { userById, auth, getUser, updateUser, deleteUser, getAllUsers, transferFunds, userTransactions } = require('../controllers/user');

const { userSignupValidator, userLoginValidator } = require('../validator');

const router = express.Router();

router.post('/signup', userSignupValidator, signup);
router.post('/login', userLoginValidator, login);
router.get('/getUser/:userId', auth, getUser);
router.put('/updateUser/:userId', auth, updateUser);
router.delete('/deleteUser/:userId', auth, deleteUser);
router.get('/getAllUsers', getAllUsers);
router.get('/transferFunds/:userId', auth, transferFunds);
router.get('/getUserTransactions/:userId', auth, userTransactions);
router.get("/logs", (req, res) => {
	res.sendFile(path.join(__dirname, '../access.log'));
});


router.param('userId', userById);

module.exports = router;