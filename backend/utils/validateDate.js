import { z } from "zod";

const conatinsAlpha = (value) => /[a-zA-Z]/.test(value);

const validateData = z.object({
        username : z.string(),
        password: z.string(),
        firstName : z.string(),
        lastName  : z.string().optional(),
        password : z.string().min(3, { message : "Your password should be atleast 3 characters"}).max(6).refine(conatinsAlpha,{
                message : "Your password should conatin atleast one alphabets"
        }),
});

export const validateDataOnRegister = (req,res,next) => {
        try {
                const userData = req.body;
                validateData.parse(userData);
                next();
        } catch (error) {
                const err = [];
                if(error.errors){
                        for(const validationError of error.errors){
                                const obj = {
                                        path : validationError.path[0],
                                        message : validationError.message
                                };
                                err.push(obj);
                        }
                }
                return res.status(400).json({
                        sucess : false,
                        message : "Invalid data",
                        errors : err
                })
        }
}
