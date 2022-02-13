import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection"
import { ResponseFuncs } from "../../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const id: String = req.query.receiverId as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // PUT request (withdraws money)
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      const deposit: number = req.body.deposit
      try {
        const foundUser: object | null = await User.findById(id)
        if(foundUser) {
          const updatedUser = await User.findByIdAndUpdate(id, {'$inc': {'cash': deposit}}, { new: true })
          res.status(201).json({ success: true, data: updatedUser })
        } else {
          res.status(400).json({ success: false, error: "Error finding user with that id"})
        }
      } catch (e) {
        res.status(400).json({ success: false, error: "Error withdrawing from account"+e})
      }
    }
  }
  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))
}

export default handler