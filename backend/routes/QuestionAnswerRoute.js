const { insertQuestionAnswers,
    insertQuestionAndAnswerId,
    getQuestionAnswer,
    editData,
    updateData,
    deleteData,
    deleteAnswer}= require('../controller/QuestioAnswerController')

    
const express=require('express');
const verifyToken = require('../middelware/authMiddleware');

const router=express.Router();

router.post('/questionAnswer',verifyToken,insertQuestionAnswers)
router.get('/getquestionAnswer',verifyToken,getQuestionAnswer)
router.get('/edit/:questionanswerId',verifyToken,editData)
router.put('/update/:questionanswerId',verifyToken,updateData)
router.delete('/delete/:questionanswerId',verifyToken,deleteData)

module.exports=router