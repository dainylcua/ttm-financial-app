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
      const query: number | string = req.body
      try {
        if(typeof(query) === "string") {
          const userList: Array<object> = await User.find({ username: req.body })
          res.status(201).json({ success: true, data: userList })
        } else {
          const userList: Array<object> = await User.find({ phoneNumber: req.body })
          res.status(201).json({ success: true, data: userList })
        }
      } catch (error) {
        res.status(400).json({ success: false })
      }
      // String or Number as input will depend on search params
    },
    // POST request (create user)
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      try {
        const createdUser = await User.create(req.body)
        res.status(201).json({ success: true, data: createdUser })
      } catch (error) {
        res.status(400).json({ success: false })
      }
    },
    
  }
  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))
}

export default handler