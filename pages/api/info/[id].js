import Info from '../../../models/info'
import dbConnect from '../../../lib/dbConnect'

dbConnect()

export default async function handler(req, res) {
  const { method } = req
  const { id } = req.query
  switch (method) {
    case 'PUT':
      try {
        const { title, paragraph, comment } = req.body
        if (!title && paragraph && !comment) return 'inavalid data'
        await Info.updateOne({ _id: id }, { title, paragraph, comment })
        res.status(200).json({ success: true })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
      break

    case 'DELETE':
      try {
        await Info.deleteOne({ _id: id })
        res.status(200).json({ success: true })
      } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error })
      }
      break
  }
}