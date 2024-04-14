const express=require("express");
const {createApply, getApplyById, getAllApply} = require("../controler/applyControler");
const router=express.Router();


router.post("/job/apply/:jobid",createApply);
router.get("/job/apply/:applyid",getApplyById);
router.get("/job/apply",);
router.patch("/job/apply/:applyid",);



module.exports=router;