const mongoose = require('mongoose')
const userDetails=require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secretKey = "?!@#@#@WWWDWDXC"



const signup = async (req, res) => {
    debugger
    try {
       
        const { FirstName, LastName, MobileNumber, Email, Password } = req.body;
        const hashPassword = await bcrypt.hash(Password, 10)
        const newData = new userDetails({
            FirstName: FirstName,
            LastName: LastName,
            MobileNumber: MobileNumber,
            Email: Email,
            Password: hashPassword
        })

        const response = await newData.save()
        if (response) {
            res.send({
                result: 1,
                message: "Signup successfull..",
            });
        }

    }
    catch (error) {
        if (error.errorResponse.code == 11000) {
            res.send({
                result: 0,
                message: "Email is already Existed.."
            });
        }
        else {
            res.send({
                result: 0,
                message: error
            });
        }


    }
}

const loginUser = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await userDetails.findOne({ Email: Email });
        if (!user) {
            return res.status(400).json({ result: 0, Email_error: "Email does not exist." });

        }
        const isPasswordValid = await bcrypt.compare(Password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ result: 0, Password_error: "Incorrect password." });
        }
        const user_token = jwt.sign({ Email }, secretKey, { expiresIn: '48h' });
        return res.status(200).json({
            result: 1,
            result_value: { token: user_token,user:user}
        });
        
    } catch (error) {
        return res.status(500).json({ result: 0, error_message: "Internal Server Error" });
    }
};


const verify = async (req, res) => {
    try {
        const userData = req.user;
        res.send(userData)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports={signup,loginUser,verify}

