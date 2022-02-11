export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export interface Transaction {
  _id?: Number
  senderId: Number,
  receiverId: Number,
  cashflow: Number
}

export interface User {
  _id?: Number,
  name: String,
  cash: Number,
  card: Number,
  transaction: Array<Object>
}