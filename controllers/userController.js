const auth_Model = require("../models/userModel")

class userController {
    static userRegistration = async (req, res) => {
        const { name, age, email, university_roll, student_no, is_hosteler, branch, section } = req.body
        if (name, age, email, university_roll, student_no, is_hosteler, branch, section) {
            const isemail = await auth_Model.findOne({ email: email })
            if (!isemail) {
                const new_user = auth_Model({
                    name: name,
                    age: age,
                    email: email,
                    university_roll: university_roll,
                    student_no: student_no,
                    is_hosteler: is_hosteler,
                    branch: branch,
                    section: section
                })
                const save_user = await new_user.save()
                res.status(200).json({
                    "message": "New account created!"
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
}

module.exports = userController