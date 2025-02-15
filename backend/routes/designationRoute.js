const express=require('express')
const {Designation,setData}=require('../controller/designationController');
const verifyToken = require('../middelware/authMiddleware');

const router=express.Router()

router.get('/designation',verifyToken,Designation)
router.get('/set/:designationId',verifyToken, setData); 

module.exports=router