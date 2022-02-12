import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection"
import { ResponseFuncs } from "../../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  // Catch error function
  const catcher = (error: Error) => res.status(400).json({ error })

  const receiverId: String = req.query.receiverId as string
  const senderId: String = req.query.senderId as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // PUT request (withdraws money from one account then deposits it into another)
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { Transaction } = await connect()
      res.json(await Transaction.create(req.body).catch(catcher))
    }
  }
  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))
}

export default handler