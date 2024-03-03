import jwt from 'jsonwebtoken';
import User from '../Models/user';

export const isAuth = async(res,req,next) =>{
        try{
                const  authHeader  = req.headers['authorization'];
                if(!authHeader || !authHeader.startsWith('Bearer ')){
                        return res.status(400).json({
                                success : false,
                                message : "Unauthorized Please login again",
                        });
                }
                const token = authHeader.split(' ')[1];
                if(!token){
                        return res.status(401).json({
                                success : false,
                                message : "Invalid token",
                        });
                }
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                const user = await User.findOne({
                        _id : decoded._id,
                });
                if (!user) {
                        return res.status(401).json({
                                success : false,
                                message : "User does not exist",
                        });
                }
                req.user = user;
                next();
        }catch(e){
                return res.status(401).json({
                        success: false,
                        message: "Unauthorized. Invalid or expired token",
                });
        }
}