import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes'
import roomRoutes from './routes/roomRoutes'
import bookingRoutes from './routes/bookingRoutes'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Pre-built routes
app.use('/api/auth', authRoutes)

// Feature routes
app.use('/api/rooms', roomRoutes)
app.use('/api/bookings', bookingRoutes)

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`)
})

export default app
