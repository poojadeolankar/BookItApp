import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const testUser = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User',
    },
  })

  console.log('Seed complete — test user ready')

  // Rooms
  const boardroom = await prisma.room.upsert({
    where: { id: 1 },
    update: {},
    create: { name: 'Boardroom', capacity: 12 },
  })

  const conferenceA = await prisma.room.upsert({
    where: { id: 2 },
    update: {},
    create: { name: 'Conference Room A', capacity: 8 },
  })

  await prisma.room.upsert({
    where: { id: 3 },
    update: {},
    create: { name: 'Conference Room B', capacity: 6 },
  })

  const huddleSpace = await prisma.room.upsert({
    where: { id: 4 },
    update: {},
    create: { name: 'Huddle Space', capacity: 4 },
  })

  console.log('Seed complete — rooms ready')

  // Bookings for test user
  const today = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  await prisma.booking.upsert({
    where: { id: 1 },
    update: {},
    create: {
      userId: testUser.id,
      roomId: boardroom.id,
      date: today,
      startTime: '09:00',
      endTime: '10:00',
      status: 'ACTIVE',
    },
  })

  await prisma.booking.upsert({
    where: { id: 2 },
    update: {},
    create: {
      userId: testUser.id,
      roomId: conferenceA.id,
      date: today,
      startTime: '14:00',
      endTime: '15:30',
      status: 'ACTIVE',
    },
  })

  await prisma.booking.upsert({
    where: { id: 3 },
    update: {},
    create: {
      userId: testUser.id,
      roomId: huddleSpace.id,
      date: tomorrow,
      startTime: '11:00',
      endTime: '12:00',
      status: 'ACTIVE',
    },
  })

  console.log('Seed complete — bookings ready')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
