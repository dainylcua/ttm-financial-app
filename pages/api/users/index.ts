import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Catch error function

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // GET request (gets all userse)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()

      try {
        const users = await User.find({})
        res.status(201).json({ success: true, data: users })
      } catch (e) {
        res.status(400).json({ success: false, error: "Error finding users"+e })
      }
    },
    
    // POST request (create user)
    POST: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()

      try {
        const createdUser: object | null = await User.create(req.body)
        res.status(201).json({ success: true, data: createdUser })
      } catch (e) {
        res.status(400).json({ success: false, error: "Error creating user, potentially due to username or phone number in database"+e })
      }
    },
    
  }

  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))

}

export default handler