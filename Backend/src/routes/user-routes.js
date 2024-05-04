const express = require("express");
const { registerUser, login , getUser , updateUser , deleteUser} = require("../controller/user-controller");


const router = express.Router();

router.post( "/register", registerUser );
router.post( "/login", login );
router.get("/:id" , getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;