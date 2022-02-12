import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../utils/connection"
import { ResponseFuncs } from "../../../utils/types"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Catch error function
  const catcher = (error: Error) => res.status(400).json({ error })

  const id: String = req.query.id as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // GET requests (access user data)
    GET: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      res.json(await User.findById(id).catch(catcher))
    },
    // DELETE requests (removes user data)
    DELETE: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      res.json(await User.findByIdAndRemove(id).catch(catcher))
    },
  }
  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))
}

export default handler