const express=require('express')
const { JsonWebTokenError } = require('jsonwebtoken')
const router=express.Router()

const QuestionController=require('../controllers/QuestionController')
const authenticateJWT = require('../middlewares/authJWT')

router.post('/question',authenticateJWT,QuestionController.postQuestion)
router.delete('/question/:id',authenticateJWT,QuestionController.deleteQuestion)
router.get('/question/search/category/:id',QuestionController.returnQuestionsByCategory)
router.get('/question',authenticateJWT,QuestionController.returnQuestionByUser)
router.put('/question/:id',authenticateJWT,QuestionController.updateQuestion)
router.post('/question/:id/answer',authenticateJWT,QuestionController.replyToAQuestion)
router.get('/question/search/:id',QuestionController.findQuestionByText)
module.exports= router