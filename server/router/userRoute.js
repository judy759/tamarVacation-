const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const verifyJWT = require("../middleware/verifyJWT")
router.use(verifyJWT)
router.get("/", userController.getAllUser)
router.get("/:id", userController.getUserById)
router.put("/allRegisters", userController.allRegisters)
router.delete("/", userController.deleteUser)
router.put("/", userController.updateUser)
router.put("/addToShoppingCart", userController.addToShoppingCart)
router.put("/addTovacationPackage", userController.addTovacationPackage)
router.put("/deleteFromShoppingCart", userController.deleteFromShoppingCart)
router.put("/deleteFromvacationPackaget", userController.deleteFromvacationPackaget)
router.put("/keepMeUpdate", userController.keepMeUpdate)
router.post("/sendEmailTamar", userController.sendEmailTamar)

module.exports = router