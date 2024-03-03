import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(res,req,next) => {
        try {
                const { username, firstName, lastName, password } = req.body;
                const existingUser = await User.findOne({ username: username });
                if (existingUser){
                        return res.status(411).json({
                                sucess: false,
                                message : "User already exists plz login",
                        })
                }
                const hashPassword = await bcrypt.hash(password ,10);
                const user = await User.create({
                        username: username,
                        password: hashPassword,
                        firstName: firstName,
                        lastName: lastName,
                });
                const userId = user._id;
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
export default register;