# [FRONTEND] Room Browsing and Booking

## User Story
As a User I want to browse available rooms and create a booking so that I can reserve a meeting room for a specific time slot

## Assignment Order
Step 4 of 6 — assign after: [BACKEND] Booking Cancellation is merged
Tier: FRONTEND — primary slice

## Context
Pre-built from copilot-instructions.md:
- React app entry → src/frontend/src/main.tsx
- Router + auth guard → src/frontend/src/App.tsx
- Navbar shell → src/frontend/src/components/Navbar.tsx
- Login and Register pages — do not modify
HomePage.tsx currently shows a placeholder — this Issue replaces its content with the BookingDashboard component below.

API endpoints available:
- GET /api/rooms
- POST /api/bookings
- GET /api/bookings/my

## What to Build
- RoomList — fetches GET /api/rooms and displays all rooms; each room shows its name and capacity
- BookingForm — form with a room dropdown, date input, start time input, and end time input; on submit calls POST /api/bookings; on success triggers a refresh of BookingDashboard; on 409 response displays an inline error message
- BookingDashboard — fetches GET /api/bookings/my and lists the authenticated user's ACTIVE bookings; each booking item shows room name, date, start time, and end time

## HomePage Update
Replace the placeholder content in HomePage.tsx to render BookingDashboard as the primary view, with RoomList and BookingForm accessible on the same page (e.g. stacked or side-by-side layout).
The user must see their booking dashboard and available rooms immediately after login.

## data-testid Values
Every interactive and key display element must have a data-testid.
Playwright tests will use these — list them explicitly:
- `room-list` — on the RoomList container element
- `room-item` — on each individual room card/row within RoomList
- `booking-form` — on the BookingForm element
- `booking-room-select` — on the room dropdown/select input
- `booking-date-input` — on the date input
- `booking-start-time-input` — on the start time input
- `booking-end-time-input` — on the end time input
- `booking-submit-button` — on the form submit button
- `booking-error-message` — on the inline error message shown when the API returns a 409 overlap conflict
- `booking-dashboard` — on the BookingDashboard container element
- `booking-item` — on each individual booking row within BookingDashboard

## Acceptance Criteria
- [ ] RoomList displays all rooms from GET /api/rooms, each showing name and capacity with data-testid="room-item"
- [ ] BookingForm submits to POST /api/bookings; on success the new booking appears in BookingDashboard without a full page reload
- [ ] BookingForm displays an error message with data-testid="booking-error-message" when the API returns 409
- [ ] BookingDashboard displays only ACTIVE bookings from GET /api/bookings/my, each showing room name, date, start time, and end time
- [ ] All data-testid values listed above are present on the correct elements
