const express=require("express")
const router=express.Router();
const { isAuthenticated } = require("../utils/Auth");


router.post("/category/create",isAuthenticated);

router.get("/categories");

router.get("/category/id");

router.delete("/category/id",isAuthenticated);

module.exports=router;