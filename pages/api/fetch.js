import dbConnect from '../../lib/dbConnect'
import Info from '../../models/info'

export default async function handler(req, res) {
  await dbConnect()

  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const info = await Info.find()
        res.status(200).json({ success: true, data: info })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
      break

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
