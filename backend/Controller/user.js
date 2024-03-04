import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../Models/transactions.js";

export const register = async (res, req, next) => {
        try {
                const { username, firstName, lastName, password } = req.body;
                const existingUser = await User.findOne({ username: username });
                if (existingUser) {
                        return res.status(411).json({
                                sucess: false,
                                message: "User already exists plz login",
                        })
                }
                const hashPassword = await bcrypt.hash(password, 10);
                const user = await User.create({
                        username: username,
                        password: hashPassword,
                        firstName: firstName,
                        lastName: lastName,
                });
                const userId = user._id;

                await Account.create({
                        userId: userId,
                        balance: 1 + Math.random() * 1000,
                })
                const token = jwt.sign({
                        userId: userId,
                }, process.env.JWT_SECRET);
                return res.status(200).json({
                        sucess: true,
                        message: "User created successfully",
                        token: token
                })
        } catch (error) {
                next();
        }
}

export const UpdateDetails = async (req, res, next) => {
        try {
                await User.updateOne({
                        _id: req.userId
                }, req.body);
                res.status(200).json({
                        sucess: true,
                        message: 'Updated details'
                });
        } catch (error) {
                console.log(error);
                res.status(404).json({
                        sucess: false,
                        message: 'Error updating details'
                });
        }
}

export const FilterData = async (req, res, next) => {
        try {
                const { filter } = req.query || "";

                const users = await User.findById({
                        $or: [{
                                firstName: {
                                        "$regex": filter
                                }
                        }, {
                                lastName: {
                                        "$regex": filter
                                }
                        }
                        ]
                });
                res.status(200).json({
                        sucess: true,
                        user: users.map(user => ({
                                username: user.username,
                                firstName : user.firstName,
                                lastName: user.lastName,
                                _id: user._id
                        }))
                });
        } catch (error) {
                res.status(404).json({
                        sucess: true,
                        message : "User not found",
                })
        }
}
export default { register, UpdateDetails,FilterData };