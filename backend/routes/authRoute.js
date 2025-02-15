const express=require('express')
const{signup,loginUser,verify}=require('../controller/authController')


const router=express.Router()

router.post('/signup',signup)
router.post('/login', loginUser)
// router.post('/verify',verifyToken,verify)

module.exports=router