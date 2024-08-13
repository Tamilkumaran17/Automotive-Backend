const usercontroller = require("../Controllers/userController");

const express = require("express");
const router = express.Router();

router.post("/login",usercontroller.login);
router.post("/signup", usercontroller.createUser);
router.delete("/delete", usercontroller.deleteUser);
router.put("/update",usercontroller.updateUser);

module.exports = router;