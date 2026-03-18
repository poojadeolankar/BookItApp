import { Router, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()

// GET /api/bookings/my — list the authenticated user's ACTIVE bookings
// NOTE: registered BEFORE /:id to prevent Express treating "my" as an id param
router.get('/my', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.userId, status: 'ACTIVE' },
      select: {
        id: true,
        date: true,
        startTime: true,
        endTime: true,
        status: true,
        room: { select: { id: true, name: true, capacity: true } },
      },
    })
    res.json(bookings)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/bookings — create a new booking
router.post('/', authenticate, async (req: AuthRequest, res: Response) => {
  const { roomId, date, startTime, endTime } = req.body

  if (!roomId || !date || !startTime || !endTime) {
    res.status(400).json({ error: 'roomId, date, startTime and endTime are required' })
    return
  }

  try {
    // Check for overlapping ACTIVE bookings on the same room and date
    const overlap = await prisma.booking.findFirst({
      where: {
        roomId,
        date,
        status: 'ACTIVE',
        startTime: { lt: endTime },
        endTime: { gt: startTime },
      },
    })

    if (overlap) {
      res.status(409).json({ error: 'This time slot overlaps with an existing booking for that room' })
      return
    }

    const booking = await prisma.booking.create({
      data: {
        userId: req.userId as number,
        roomId,
        date,
        startTime,
        endTime,
      },
      select: {
        id: true,
        roomId: true,
        date: true,
        startTime: true,
        endTime: true,
        status: true,
      },
    })

    res.status(201).json(booking)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
