import dbConnect from '../../lib/dbConnect'
import Title from '../../models/info'

export default async function handler(req, res) {
  await dbConnect()

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query
      if (!id) {
        return res.status(400).json({ error: 'Invalid ID.' })
      }

      const deletedTitle = await Title.findByIdAndDelete(id)

      if (!deletedTitle) {
        return res.status(404).json({ error: 'Title not found.' })
      }

      res.status(200).json({ message: 'Title deleted successfully.' })
    } catch (error) {
      res.status(500).json({ error: 'Error deleting title.' })
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' })
  }
}