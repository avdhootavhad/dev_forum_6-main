const express=require('express')
const router=express.Router()

const AuthController=require('../controllers/AuthController')
const authenticateJWT = require('../middlewares/authJWT')

router.post('/user',AuthController.register)
router.post('/login',AuthController.login)
router.delete('/logout',authenticateJWT,AuthController.logout)
router.get('/user/:id',AuthController.returnUser)


module.exports=router