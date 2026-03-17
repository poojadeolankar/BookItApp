import { Router, Response } from 'express'
import { authenticate, AuthRequest } from '../middleware/auth'
import prisma from '../lib/prisma'

const router = Router()

// GET /api/rooms — list all rooms
router.get('/', authenticate, async (_req: AuthRequest, res: Response) => {
  try {
    const rooms = await prisma.room.findMany({
      select: { id: true, name: true, capacity: true },
    })
    res.json(rooms)
  } catch {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
