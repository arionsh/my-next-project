import mongoose from 'mongoose'

const infoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

export default mongoose.models.Info || mongoose.model('Info', infoSchema)