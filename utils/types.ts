export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export interface User {
  _id?: Number,
  firstName: String,
  lastName?: String,
  username: String,
  phoneNumber: String,
  cash: Number,
  history: Array<Object>
}