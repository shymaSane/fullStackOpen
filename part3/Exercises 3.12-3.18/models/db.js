import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'

mongoose.set('strictQuery', false)
const connectDB = async () => {
  const url = process.env.DB_URL
  try {
    await mongoose.connect(url)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message)
    process.exit(1) // Exit the process with an error code
  }
}

export default connectDB
