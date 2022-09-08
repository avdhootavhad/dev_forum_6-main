const express=require('express')
const router=express.Router()
const authenticateJWT = require('../middlewares/authJWT')
const CategoryController = require('../controllers/CategoryController')

router.post('/category',CategoryController.createCategory)
router.get('/category',CategoryController.returnAllCategory)
router.get('/category/:id',CategoryController.returnCategoryById)
router.delete('/category/:id',authenticateJWT,CategoryController.deleteCategory)
router.put('/category/:id',authenticateJWT,CategoryController.updateCategory)

module.exports= router