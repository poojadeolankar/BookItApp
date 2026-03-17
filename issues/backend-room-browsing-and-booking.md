# [BACKEND] Room Browsing and Booking

## User Story
As a User I want to browse available rooms and create a booking so that I can reserve a meeting room for a specific time slot

## Assignment Order
Step 2 of 6 — assign after: [DATABASE] Room Browsing and Booking is merged
Tier: BACKEND — primary slice

## Context
Pre-built from copilot-instructions.md:
- JWT auth middleware → src/backend/middleware/auth.ts
- Auth routes → src/backend/routes/auth.ts
- Express app entry → src/backend/index.ts
This issue adds only the endpoints required for room browsing, booking creation, and viewing the authenticated user's own bookings.

Note: Register GET /api/bookings/my **before** any `/:id` route in the bookings router to prevent Express treating "my" as an id parameter.

## API Endpoints

- GET /api/rooms — list all rooms
  Request: none
  Response: `[{ id, name, capacity }]`
  Auth: required

- POST /api/bookings — create a new booking
  Request: `{ roomId, date, startTime, endTime }`
  Response: `{ id, roomId, date, startTime, endTime, status }`
  Auth: required
  Validation: reject with 409 if an ACTIVE booking for the same room overlaps the requested time slot on the same date (overlap = requested start is before existing end AND requested end is after existing start)

- GET /api/bookings/my — list the authenticated user's ACTIVE bookings
  Request: none
  Response: `[{ id, date, startTime, endTime, status, room: { id, name, capacity } }]`
  Auth: required

## Acceptance Criteria
- [ ] GET /api/rooms returns 200 with an array of all rooms including id, name, and capacity
- [ ] POST /api/bookings returns 201 with the new booking on success; returns 409 with `{ error: string }` when the requested slot overlaps an existing ACTIVE booking for that room on the same date
- [ ] GET /api/bookings/my returns 200 with only ACTIVE bookings belonging to the authenticated user, each including room details
- [ ] All three endpoints return 401 without a valid JWT
