import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "../../../../utils/connection"
import { ResponseFuncs } from "../../../../utils/types"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Capture request method: typed as key of ResponseFunc
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs

  const receiverId: String = req.query.receiverId as string
  const senderId: String = req.query.senderId as string

  // Response possibilities
  const handleCase: ResponseFuncs = {
    // PUT request (withdraws money from one account then deposits it into another)
    PUT: async (req: NextApiRequest, res: NextApiResponse) => {
      const { User } = await connect()
      const cashflow: number = req.body.cashflow
      try {
        const sender = await User.findById(senderId)
        if(cashflow > sender.cash) {
          res.status(201).json({ success: false, error: "Sender does not have enough money" })
        } else {
          const receiver = await User.findById(receiverId)
          if(!sender || !receiver) {
            res.status(400).json({ success: false, error: "Unable to find one or both users"})
          } else {
            const updatedSender = await User.findByIdAndUpdate(receiverId, {'$inc': {'cash': cashflow}}, { new: true })
            const updatedReceiver = await User.findByIdAndUpdate(senderId, {'$inc': {'cash': -cashflow}}, { new: true })
            res.status(201).json({ success: true, data: { updatedSender, updatedReceiver }})
          }
        }
      } catch (error) {
        res.status(400).json({ success: false, error: "Error with transaction"})
      }
    }
  }
  const response = handleCase[method]
  if (response) response(req,res)
  else res.status(400).json(({ error: "No response for this request"}))
}

export default handler