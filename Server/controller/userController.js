const User = require("../model/user")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            password,
            gender,
            dateOfBirth,
            address,
            pincode,
            city,
            avatar,
            addharImage,
        } = req.body

        if (!fullName || !email || !phoneNumber || !password || !gender || !dateOfBirth || !address) {
            return res.status(403).json({
                success: false,
                message: 'Please provide all Information'
            });
        }



        const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        const phoneRegex = /^[0-9]{10}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number format. Phone number should have 10 digits' });
        }

        const existingUseremail = await User.findOne({
            $or: [
                { email: email },
            ]
        });
        if (existingUseremail) {
            return res.status(400).json({ message: 'User with given emailID already exists' });
        }

        const existingUserphonenumber = await User.findOne({
            $or: [
                { phoneNumber: phoneNumber }
            ]
        });
        if (existingUserphonenumber) {
            return res.status(400).json({ message: 'User with given phone number already exists' });
        }

        const user = new User({
            fullName,
            email,
            phoneNumber,
            password,
            gender,
            dateOfBirth,
            address,
            pincode,
            city,
            avatar,
            addharImage,
        });
        await user.save();
        return res.status(201).json({
            success: true,
            data: user,
            message: "User register successfully"
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "user can not register"
        })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: 'Please provide an email and  password'
            });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid creadentials"
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

        const userForResponse = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: user.password,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            pincode: user.pincode,
            city: user.city,
            avatar: user.avatar,
            addharImage: user.addharImage,
        }

        res.json({
            message: 'Logged in Successfully',
            user: userForResponse,
            token
        });
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Can not login , try again"
        });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        user.password = newPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password update successfully."
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: "Can not reset your password ! try again"
        })
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json({
            success: true,
            message: "Get all user",
            data: user
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Can not  get all user data'
        })
    }
};

exports.getUserByID = async (req, res) => {
    try {
        const id = req.params.id; // Extract the ID from req.params
        const employee = await Employee.findById(id); // Use findById instead of findOne
        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee data not found"
            });
        }
        return res.status(200).json({
            success: true,
            data: employee,
            message: "Employee data retrieved successfully"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to get employee data by this ID"
        });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete({ _id: id });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "user is not found!"
            })
        }

        res.json({
            success: true,
            message: "user all data is deleted successfully"
        })
    }
    catch (error) {
        console.log(error.message)
        return res.status(404).json({
            success: false,
            message: "user data not deleted"
        })
    }
};

// exports.updateUser = async (req, res) => {
//     const { id } = req.params;
//     const updates = req.body;
//     try {
//         const employee = await Employee.findOneAndUpdate({ employeeID: id }, updates, { new: true, runValidators: true });
//         if (!employee) {
//             return res.status(404).json({
//                 success: false,
//                 message: "employee not found"
//             });
//         }
//         res.json({
//             success: true,
//             data: employee,
//             message: "Employee updated successfully"
//         });
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "employee can not update! try again"
//         });
//     }
// }
