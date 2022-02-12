import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Catch error function

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // GET request (gets all users; used for search)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      const query: string = req.body.query
      const queryRegex = new RegExp(query)

      // String or Number as input will depend on search params
      try {
        if(isNaN(parseInt(query))) {
          const userList: Array<object | null> = await User.find({ username: {"$regex": queryRegex} })
          if(userList) {
            res.status(201).json({ success: true, data: userList })
          } else {
            res.status(400).json({ success: false, error: "No user with that username found"})
          }
        } else {
          const userList: Array<object | null> = await User.find({ phoneNumber: {"$regex": queryRegex} })
          if(userList) {
            res.status(201).json({ success: true, data: userList })
          } else {
            res.status(400).json({ success: false, error: "No user with that phone number found"})
          }
        }
      } catch (error) {
        res.status(400).json({ success: false, error: "No user with that information found" })
      }
    },

    // POST request (create user)
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()

      try {
        const createdUser: object | null = await User.create(req.body)
        res.status(201).json({ success: true, data: createdUser })
      } catch (error) {
        res.status(400).json({ success: false, error: "Error creating user" })
      }
    },
    
  }

  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))

}

export default handler