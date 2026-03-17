# [FRONTEND] Booking Cancellation

## User Story
As a User I want to cancel my own bookings from the dashboard so that I can free up a meeting room I no longer need

## Assignment Order
Step 5 of 6 — assign after: [FRONTEND] Room Browsing and Booking is merged
Tier: FRONTEND — extension slice

## Context
Pre-built from copilot-instructions.md:
- Router + auth guard → src/frontend/src/App.tsx
BookingDashboard component is built in the [FRONTEND] Room Browsing and Booking issue.

API endpoint available:
- PATCH /api/bookings/:id/cancel

## What to Build
- Cancel button on each booking item in BookingDashboard — calls PATCH /api/bookings/:id/cancel for that booking; after a successful response the cancelled booking is removed from the dashboard list without a full page reload

## data-testid Values
Every interactive and key display element must have a data-testid.
Playwright tests will use these — list them explicitly:
- `cancel-booking-button` — on the cancel button for each booking item in BookingDashboard

## Acceptance Criteria
- [ ] Each booking item in BookingDashboard shows a cancel button with data-testid="cancel-booking-button"
- [ ] Clicking the cancel button calls PATCH /api/bookings/:id/cancel for that booking
- [ ] After successful cancellation the booking is removed from the dashboard list without a full page reload
- [ ] All data-testid values listed above are present on the correct elements
