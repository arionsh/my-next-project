import dbConnect from '../../lib/dbConnect'
import Comment from '../../models/info'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { comment } = req.body

    try {
      await dbConnect()

      const createdComment = await Comment.create({ comment })

      res.status(201).json({ comment: createdComment })
    } catch (error) {
      console.log('Error creating comment:', error)
      res.status(500).json({ error: 'Error creating comment' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}