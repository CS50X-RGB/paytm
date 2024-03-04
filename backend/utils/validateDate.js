import { z } from "zod";

const conatinsAlpha = (value) => /[a-zA-Z]/.test(value);

const validateData = z.object({
        username: z.string(),
        password: z.string(),
        firstName: z.string(),
        lastName: z.string().optional(),
        password: z.string().min(3, { message: "Your password should be atleast 3 characters" }).max(6).refine(conatinsAlpha, {
                message: "Your password should conatin atleast one alphabets"
        }),
});

export const validateDataOnRegister = (req, res, next) => {
        try {
                const userData = req.body;
                validateData.parse(userData);
                next();
        } catch (error) {
                const err = [];
                if (error.errors) {
                        for (const validationError of error.errors) {
                                const obj = {
                                        path: validationError.path[0],
                                        message: validationError.message
                                };
                                err.push(obj);
                        }
                }
                return res.status(400).json({
                        sucess: false,
                        message: "Invalid data",
                        errors: err
                })
        }
}

export const validateUserDataUpdate = (req, res, next) => {
        const userData = req.body;

        const updateSchemaField = {};

        if (userData.name !== undefined) {
                updateSchemaField.name = z.string().min(3, { message: "Name can't be less than 3 characters" });
        }

        if (userData.email !== undefined) {
                updateSchemaField.email = z.string().refine(isValidEmail, { message: "Email must contain @" });
        }

        const updateUserSchema = z.object(updateSchemaFields).nonstrict();
        try {
                updateUserSchema.parse(userData);
                console.log("Data is valid:", userData);
                next();
        } catch (error) {
                const err = [];
                console.log("Validation error:", error);
                if (error.errors) {
                        for (const validationError of error.errors) {
                                const obj = {
                                        path: validationError.path[0],
                                        message: validationError.message,
                                };
                                err.push(obj);
                        }
                } else {
                        err.push({ message: "Unknown validation error" });
                }
                console.error("Validation error:", err);
                return res.status(400).json({
                        success: false,
                        message: "Invalid user data",
                        errors: err,
                });
        }
}