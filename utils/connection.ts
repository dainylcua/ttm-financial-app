import mongoose from "mongoose"

const { DATABASE_URL } = process.env

interface User {
  firstName: string
  lastName?: string
  username: string
  phoneNumber: string
  cash: number
  history: [{
    senderId: mongoose.Types.ObjectId,
    senderUsername: string,
    senderFirstName: string,
    senderLastName: string,
    receiverId: mongoose.Types.ObjectId,
    receiverUsername: string,
    receiverFirstName: string,
    receiverLastName: string,
    cashflow: number
  }]
}

export const connect = async () => {
  const connection = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err))

  
  const UserSchema: mongoose.Schema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: String,
    username: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    cash: Number,
    history: [{
      senderId: { type: mongoose.Types.ObjectId, required: true },
      senderUsername: { type: String, required: true },
      senderFirstName: { type: String, required: true },
      senderLastName: String,
      receiverId: { type: mongoose.Types.ObjectId, required: true },
      receiverUsername: { type: String, required: true },
      receiverFirstName: { type: String, required: true },
      receiverLastName: String,
      cashflow: { type: Number, required: true }
    }, {timestamps: true}],
  }, {timestamps: true})

  const User = mongoose.models?.UserSchema || mongoose.model<User>("User", UserSchema)

  return { connection, User }
}

  