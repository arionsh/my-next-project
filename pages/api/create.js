import dbConnect from '../../lib/dbConnect'
import Info from '../../models/info'

export default async function handler(req, res) {
  try {
    await dbConnect()

    if (req.method === 'POST') {
      const { title, paragraph, comment } = req.body

      if (!title || !paragraph || !comment) {
        return res.status(400).json({ error: 'Incomplete data' })
      }

      const createdInfo = await Info.create({ title, paragraph, comment })

      res.status(201).json({ info: createdInfo })
    } else {
      res.status(405).json({ error: 'Method Not Allowed' })
    }
  } catch (error) {
    console.log('Error creating info:', error)
    res.status(500).json({ error: 'Error creating info' })
  }
}