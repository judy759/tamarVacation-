const express=require("express")
const router=express.Router()
const verifyJWT= require("../middleware/verifyJWT")
const verifyManager=require("../middleware/verifyManager")
const vacationController=require("../controllers/vacationController")
const multer=require('multer')
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/uploads')

    },
    filename:function(req,file,cb){
        const uniqeSuffix=Date.now()+'-'+Math.round(Math.random()*100)
        cb(null,uniqeSuffix+"-"+file.originalname)
    }
})
const upload=multer({storage:storage})
 router.use(verifyJWT)
// router.use(verifyManager)
    router.get("/",vacationController.getAllVacation)
    router.get("/:id",vacationController.getVacationById)
    // router.get("/",vacationController.getImage)
    //router.post("/",vacationController.createNewVacation)
    router.post("/",upload.array('images'),vacationController.createNewVacation)
    router.delete("/",vacationController.deleteVacation)
    router.put("/",upload.array('images'),vacationController.updateVacation)
    router.put("/1",vacationController.one)
    router.delete("/deleteImageFromImages",vacationController.deleteImageFromImages)
    //router.get("/getFourNewVacations",vacationController.getFourNewVacations)
    //router.put("/addVacation",vacationController.addVacation)
 
module.exports=router
