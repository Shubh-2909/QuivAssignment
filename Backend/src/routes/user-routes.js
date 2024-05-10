const express = require("express");
const { registerUser, login , getUser , updateUser , deleteUser, getUserByEmail} = require("../controller/user-controller");


const router = express.Router();

router.post( "/register", registerUser );
router.post( "/login", login );
router.get("/:id" , getUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/userDetails/userbyEmail" , getUserByEmail)

module.exports = router;