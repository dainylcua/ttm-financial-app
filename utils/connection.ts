import mongoose, { Model } from "mongoose"

const { DATABSE_URL } = process.env

export const connect = async () => {
  const connection = await mongoose
    .connect(DATABSE_URL as string)
    .catch((err) => console.log(err))

  console.log("Mongoose Connection Established")

  const TransactionSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    cashflow: Number
  })
  
  const UserSchema = new mongoose.Schema({
    name: String,
    cash: Number,
    card: Number,
    transaction: [TransactionSchema],
  })

  const Transaction = mongoose.models.TransactionSchema || mongoose.model("Transaction", TransactionSchema)
  const User = mongoose.models.UserSchema || mongoose.model("User", UserSchema)

  return { connection, Transaction, User }
}

  