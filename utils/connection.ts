import mongoose, { Model } from "mongoose"

const { DATABASE_URL } = process.env

interface User {
  firstName: String
  lastName?: String
  username: String,
  phoneNumber: Number,
  cash: Number,
  history: [{
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    cashflow: Number
  }]
}

export const connect = async () => {
  const connection = await mongoose
    .connect(DATABASE_URL as string)
    .catch((err) => console.log(err))

  console.log("Mongoose Connection Established")
  
  const UserSchema = new mongoose.Schema<User>({
    firstName: { type: String, required: true },
    lastName: String,
    username: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    cash: Number,
    history: [{
      senderId: { type: mongoose.Types.ObjectId, required: true },
      receiverId: { type: mongoose.Types.ObjectId, required: true },
      cashflow: { type: Number, required: true }
    }, {timestamps: true}],
  }, {timestamps: true})

  const User = mongoose.models.UserSchema || mongoose.model<User>("User", UserSchema)

  return { connection, User }
}

  