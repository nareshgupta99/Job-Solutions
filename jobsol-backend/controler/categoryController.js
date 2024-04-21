const Category = require("../models/Category");
const ApiError = require("../utils/ApiError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createCategory = asyncErrorHandler(async (req, res, next) => {
    let category = req.body;
    Category.create(category);
    res.status(201).json(
        {
            message: "Category created ",
            success: true
        }
    )
})

const getCategoryById = asyncErrorHandler(async (req, res, next) => {
    let { categoryId } = req.params;
    Category.findOne({
        where: {
            categoryId: categoryId
        }
    })
    res.status(200).json(
        {
            message: "",
            success: true
        }
    )

})

const getAllCategory = async (req, res, next) => {
    const categories = await Category.findAll();
    res.status(200).json(
        {
            data: categories,
            message: "",
            success: true
        }
    )
}

const deleteCategoryById = async (req, res, next) => {
    let { categoryId } = req.params;
    Category.findOne({ categoryId });
    res.status(200).json(
        {
            message: "deleted ",
            success: true
        }
    )
}


module.exports = { createCategory, getAllCategory, getCategoryById, deleteCategoryById };