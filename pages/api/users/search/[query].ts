import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection"
import { ResponseFuncs } from "../../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const query: string = req.query.query as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // GET requests (access user data)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
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
      } catch (e) {
        res.status(400).json({ success: false, error: "No user with that information found"+e })
      }
    }
  }

  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))

}

export default handler