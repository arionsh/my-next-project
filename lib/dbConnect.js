import mongoose from 'mongoose'

const connection = {}

async function dbConnection() {
  if (connection.isConnected) {
    return
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    connection.isConnected = db.connections[0].readyState
    console.log('MongoDB connected successfully!')
  } catch (error) {
    console.log('Error connecting to MongoDB:', error.message)
  }
}

export default dbConnection
