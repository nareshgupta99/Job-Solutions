const express=require("express")
const router=express.Router();
const { isAuthenticated, hasRole } = require("../utils/Auth");
const { createCategory, getAllCategory } = require("../controler/categoryController");


router.post("/employeer/category/create",isAuthenticated,hasRole("ROLE_EMPLOYEER"),createCategory);

router.get("/categories",getAllCategory);

router.delete("/category/id",isAuthenticated);

module.exports=router;