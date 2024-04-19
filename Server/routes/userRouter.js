const express = require("express")
const router = express.Router();

const userController = require("../controller/userController")

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/forgotPassword", userController.forgotPassword)
router.get("/get-all-user", userController.getAllUsers)
router.get("/get-user/:id", userController.getUserByID)
// router.put("/update-user/:id", userController.updateUser)
router.delete("/delete-user/:id", userController.deleteUser)

module.exports = router;