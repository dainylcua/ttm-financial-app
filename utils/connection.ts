import mongoose, { Model } from "mongoose"

const { DATABASE_URL } = process.env

interface User {
  firstName: String
  lastName?: String
  username: String,
  phoneNumber: String,
  cash: Number,
  history: [{
    senderId: mongoose.Types.ObjectId,
    senderUsername: String,
    senderFirstName: String,
    senderLastName: String,
    receiverId: mongoose.Types.ObjectId,
    receiverUsername: String,
    receiverFirstName: String,
    receiverLastName: String,
    cashflow: Number
  }]
}

export const connect = async () => {
  const connection = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err))

  console.log("Mongoose Connection Established")
  
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

  