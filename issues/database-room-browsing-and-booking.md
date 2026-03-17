# [DATABASE] Room Browsing and Booking

## User Story
As a system I need Room and Booking models so that authenticated Users can browse available rooms and create bookings for specific time slots

## Assignment Order
Step 1 of 6 — assign after: nothing (assign this first)
Tier: DATABASE — primary slice

## Context
Pre-built models from copilot-instructions.md:
- User model (src/backend/prisma/schema.prisma) — do not modify
This issue adds only the Room and Booking models required for this slice.

## Models to Add

**BookingStatus enum**
- ACTIVE
- CANCELLED

**Room**
- id: Int @id @default(autoincrement()) — unique identifier
- name: String — human-readable room name
- capacity: Int — maximum number of occupants
- bookings: Booking[] — relation to Booking

**Booking**
- id: Int @id @default(autoincrement()) — unique identifier
- userId: Int — references the User who created the booking
- roomId: Int — references the booked Room
- date: String — calendar date of the booking (YYYY-MM-DD)
- startTime: String — booking start time (HH:MM)
- endTime: String — booking end time (HH:MM)
- status: BookingStatus @default(ACTIVE) — ACTIVE or CANCELLED
- createdAt: DateTime @default(now())
- user: User — relation to User
- room: Room — relation to Room

## Relationships
- Room has many Bookings
- User has many Bookings

## Seed Data
Add realistic sample data to src/backend/prisma/seed.ts so the app is
usable immediately after migration — never leave domain tables empty.

**Room** — add 4 realistic sample records covering:
- Boardroom — capacity: 12
- Conference Room A — capacity: 8
- Conference Room B — capacity: 6
- Huddle Space — capacity: 4

**Booking** — add 3 ACTIVE sample bookings for the test user (test@example.com).
Look up the test user by email in seed.ts and use their id as userId:
- Room: Boardroom, date: today (use `new Date().toISOString().split('T')[0]`), startTime: "09:00", endTime: "10:00", status: ACTIVE
- Room: Conference Room A, date: today, startTime: "14:00", endTime: "15:30", status: ACTIVE
- Room: Huddle Space, date: tomorrow, startTime: "11:00", endTime: "12:00", status: ACTIVE

Seed data is required for:
- Frontend to show real content after login (not a blank page)
- Playwright tests to find and interact with real records

## Acceptance Criteria
- [ ] Migration runs without errors
- [ ] Room and Booking models created with correct fields and relations
- [ ] BookingStatus enum defined with ACTIVE and CANCELLED values
- [ ] Seed data populates at least 4 Room records and 3 ACTIVE Booking records for test@example.com
- [ ] Pre-built User model and test user unchanged
