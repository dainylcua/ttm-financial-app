export interface ResponseFuncs {
  GET?: Function
  POST?: Function
  PUT?: Function
  DELETE?: Function
}

export interface User {
  _id?: number,
  firstName: string,
  lastName?: string,
  username: string,
  phoneNumber: string,
  cash: number,
  history: Array<Object>
}