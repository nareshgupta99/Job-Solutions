const express=require("express");
const { getAllUser, createUser } = require("../controler/userControler");

const router=express.Router();

//get all user

router.get("/",getAllUser);

router.post('/create',createUser);



module.exports=router;