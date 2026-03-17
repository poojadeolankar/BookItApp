# [BACKEND] Booking Cancellation

## User Story
As a User I want to cancel my own bookings so that I can free up a meeting room I no longer need

## Assignment Order
Step 3 of 6 — assign after: [BACKEND] Room Browsing and Booking is merged
Tier: BACKEND — extension slice

## Context
Pre-built from copilot-instructions.md:
- JWT auth middleware → src/backend/middleware/auth.ts
This issue adds only the cancel endpoint. The Booking model with BookingStatus enum is defined in the [DATABASE] Room Browsing and Booking issue. The bookings router is created in the [BACKEND] Room Browsing and Booking issue.

The cancel endpoint uses the path suffix `/cancel` (PATCH /api/bookings/:id/cancel) so it does not shadow the existing GET /api/bookings/my route.

## API Endpoints

- PATCH /api/bookings/:id/cancel — cancel a booking owned by the authenticated user
  Request: none
  Response: `{ id, status: "CANCELLED" }`
  Auth: required
  Validation: return 403 with `{ error: string }` if the authenticated user is not the owner of the booking; return 404 with `{ error: string }` if the booking does not exist

## Acceptance Criteria
- [ ] PATCH /api/bookings/:id/cancel returns 200 with `{ id, status: "CANCELLED" }` when the authenticated user owns the booking
- [ ] PATCH /api/bookings/:id/cancel returns 403 with `{ error: string }` when the authenticated user does not own the booking
- [ ] PATCH /api/bookings/:id/cancel returns 404 with `{ error: string }` when the booking does not exist
- [ ] Endpoint returns 401 without a valid JWT
