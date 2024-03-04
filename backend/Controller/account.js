import mongoose from "mongoose";
import Account from "../Models/transactions";

export const AddBalance = async (req, res, next) => {
        try {
                const response = await Account.findOne({
                        userId: req.userId,
                });
                return res.status(200).json({
                        balance: response.balance,
                });
        } catch (err) {
                return res.status(404).json({
                        success: false,
                        message: err.message
                });
        }
}

export const CreateTrans = async (req, res, next) => {
        try {
                const session = await mongoose.startSession();
                session.startTransaction();

                const { amount, to } = req.body;
                const userId = req.userId;

                const account = await Account.findOne({ userId }).session(session);

                if (!account || account.balance < amount) {
                        await session.abortTransaction();
                        return res.status(400).json({
                                success: false,
                                message: 'Account balance not sufficient',
                        });
                }

                const toAccount = await Account.findOne({ userId: to }).session(session);

                if (!toAccount) {
                        await session.abortTransaction();
                        return res.status(400).json({
                                success: false,
                                message: 'To account does not exist',
                        });
                }

                await Account.updateOne({ userId }, { $inc: { balance: -amount } }).session(session);
                await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

                await session.commitTransaction();
                session.endSession();

                return res.status(200).json({
                        success: true,
                        message: 'Success Transaction',
                });
        } catch (error) {
                return res.status(500).json({
                        success: false,
                        message: error.message,
                });
        }
};
