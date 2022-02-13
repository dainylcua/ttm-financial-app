import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../../utils/connection"
import { ResponseFuncs } from "../../../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const username: string = req.query.username as string
  const phoneNumber: string = req.query.phoneNumber as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // GET requests (access user data)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()

      // String or Number as input will depend on search params
      try {
        const foundUsername = await User.findOne({ username: username })
        const foundNumber = await User.findOne({ phoneNumber: phoneNumber })
        console.log(foundUsername, foundNumber)
        if(foundUsername.username !== foundNumber.username) {
          res.status(201).json({ success: true, data: foundUsername })
        } else {
          res.status(400).json({ success: false, error: "Invalid login combination"})
        }
      } catch (error) {
        res.status(400).json({ success: false, error: "Error getting users" })
      }
    }
  }

  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))

}

export default handler