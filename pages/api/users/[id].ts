import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const id: String = req.query.id as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // GET requests (access user data)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      try {
        const foundUser: object | null = await User.findById(id)
        if(foundUser) {
          res.status(201).json({ success: true, data: foundUser })
        } else {
          res.status(400).json({ success: false, error: "No user found with that id"})
        }
      } catch (e) {
        res.status(400).json({ success: false, error: "Error getting user"+e})
      }
    },

    // DELETE requests (removes user data)
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      try {
        const deletedUser: object | null = await User.findByIdAndRemove(id)
        if(deletedUser) {
          res.status(201).json({ success: true, data: deletedUser })
        } else {
          res.status(400).json({ success: false, error: "No user found with that id"})
        }
      } catch (e) {
        res.status(400).json({ success: false, error: "Error deleting user"+e})
      }
    }
  }

  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))

}

export default handler