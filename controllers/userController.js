const auth_Model = require("../models/userModel")
const otp_model = require("../models/otpmodel")
const bcrypt = require("bcryptjs")
const nodemailer = require('nodemailer')
class userController {
    static sendotp = async (email,res) => {
        const otp = Math.floor(((Math.random()*9000)+1000)) 
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "tusharc20001@gmail.com",
                pass: "udfmjqntdpovoaoi",
            },
        });
        const mailoptions = {
            from: "tusharc20001@gmail.com",
            to: email,
            subject: "Verify your email",
            html : `Your otp for verification is <b>${otp}</b>. This code will expire in an <b>1 hour</b>`
        }
        const newOtpVerfication = await new otp_model({
            email: email,
            otp: otp,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000 
        })
        await newOtpVerfication.save()
        await transporter.sendMail(mailoptions)
    }
    
    static verifyotp = async (req, res) => {
        const { email, user_otp } = req.body
        if (email && user_otp) {
            const otprecords = await otp_model.find({
                email:email
            })
            
            if (otprecords.length == 0) {
                res.status(403).json({
                    message:"Account does not exist or is already verified!"
                })
            }
            else {
                const expiresAt = otprecords[otprecords.length-1].expiresAt
                const otp = otprecords[otprecords.length-1].otp
                console.log(user_otp);
                console.log(otp);
                if (expiresAt < Date.now()) {
                    res.status(403).json({
                        message:"Otp has expired!"
                    })
                }
                else {
                    if (user_otp == otp) {
                        res.status(200).json({
                            message:"Your account has been verified!"
                        })
                    }
                    else {
                        res.status(403).json({
                            message:"Wrong otp!"
                        })
                    }
                }
            }
        }
        else {
            res.status(404).json({
                message:"Please provide email and otp"
            })
        }
    }

    static userRegistration = async (req, res) => {
        const { name, dob, email, university_roll, student_no, is_hosteler, branch, section,contact_no,password } = req.body
        if (name, dob, email, university_roll, student_no, is_hosteler, branch, section, password) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                const newpass = await bcrypt.hash(password, 10)
                const new_user = auth_Model({
                    name: name,
                    dob: new Date(dob),
                    email: email,
                    university_roll: university_roll,
                    student_no: student_no,
                    is_hosteler: is_hosteler,
                    branch: branch,
                    section: section,
                    contact_no: contact_no,
                    password:newpass
                })
                userController.sendotp(email,res)
                const save_user = await new_user.save()
                res.status(200).json({
                    message:"Otp has been sent successfully to your email!"
                })
            }
            else {
                res.status(403).json({
                    "message": "User already exist!"
                })
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
            console.log('Field empty');
        }
    }
    static userLogin = async (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            const isuser = await auth_Model.findOne({ email: email })
            if (!isuser) {
                res.status(403).json({
                    "message": "Email not found"
                })
            }
            else {
                const ispasscorrect = await bcrypt.compare(password, isuser.password)
                if (!ispasscorrect) {
                    res.status(403).json({
                        "message": "Incorrect password"
                    })
                }
                else {   
                    res.status(200).json({
                        message:"Login successfull"
                    })
                }
            }
        }
        else {
            res.status(403).json({
                "message": "Please enter all the fields"
            })
        }
    }
}

module.exports = userController