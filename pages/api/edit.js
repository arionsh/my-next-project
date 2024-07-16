import Info from '../../../models/info'
import dbConnect from '../../../lib/dbConnect'

dbConnect()

export default async function handler(req, res) {
  const { method } = req
  const { InfoID } = req.query
  switch (method) {
    case 'PUT':
      try {
        const { title, paragraph, comment } = req.body
        if (!title && comment && paragraph) {
          return res.status(400).json({ success: false, error: 'Invalid data' })
        }
        await Info.updateOne({ _id: InfoID }, { title, comment, paragraph })
        res.status(200).json({ success: true })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
      break

    case 'DELETE':
      try {
        await Info.deleteOne({ _id: InfoID })
        res.status(200).json({ success: true })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
      break

    default:
      res.status(405).json({ success: false, error: 'Method Not Allowed' })
  }
}