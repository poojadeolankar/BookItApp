# [PLAYWRIGHT] Room Booking

## User Story
As a QA engineer I want to verify the room booking journey end to end

## Assignment Order
Step 6 of 6 — assign after: [FRONTEND] Booking Cancellation is merged
Tier: PLAYWRIGHT — assign this last, after all FRONTEND Issues are merged

## Primary Journey — Room Browsing and Booking
One action per step with expected result:
1. Navigate to the app — expect the login form to be visible
2. Enter email "test@example.com" and password "password123", submit — expect redirect to the home page
3. Locate data-testid="room-list" — expect it to be visible
4. Locate all elements with data-testid="room-item" — expect at least one to be visible, each showing a room name and capacity
5. Locate data-testid="booking-form" — expect it to be visible
6. Select the first available room using data-testid="booking-room-select"
7. Fill data-testid="booking-date-input" with a future date (e.g. tomorrow's date)
8. Fill data-testid="booking-start-time-input" with "09:00"
9. Fill data-testid="booking-end-time-input" with "10:00"
10. Click data-testid="booking-submit-button" — expect the new booking to appear in data-testid="booking-dashboard"
11. Locate all elements with data-testid="booking-item" — expect the new booking to be visible showing room name, date, start time, and end time

## Double-booking Conflict Journey
12. With the same room and date still selected in the form, fill data-testid="booking-start-time-input" with "09:00" and data-testid="booking-end-time-input" with "10:00"
13. Click data-testid="booking-submit-button" — expect data-testid="booking-error-message" to be visible with an overlap error message

## Extension Journey — Booking Cancellation
> Only run if the [FRONTEND] Booking Cancellation issue is implemented and merged.

14. Locate the first data-testid="cancel-booking-button" in data-testid="booking-dashboard" — expect it to be visible
15. Click the first data-testid="cancel-booking-button" — expect the corresponding data-testid="booking-item" to be removed from the dashboard

## Test Credentials
- Email:    test@example.com
- Password: password123

## data-testid Reference
These must match the data-testid values in the FRONTEND issues exactly:
- `room-list` — used to verify the room list is rendered
- `room-item` — used to verify individual rooms are displayed with name and capacity
- `booking-form` — used to locate and interact with the booking creation form
- `booking-room-select` — used to select a room when creating a booking
- `booking-date-input` — used to fill the booking date
- `booking-start-time-input` — used to fill the booking start time
- `booking-end-time-input` — used to fill the booking end time
- `booking-submit-button` — used to submit the booking form
- `booking-error-message` — used to verify the overlap conflict error is shown
- `booking-dashboard` — used to verify the dashboard renders bookings
- `booking-item` — used to verify individual bookings appear after creation
- `cancel-booking-button` — used to cancel a booking and verify it is removed from the dashboard

## Acceptance Criteria
- [ ] Full primary journey passes without errors
- [ ] All selectors use data-testid only — no CSS classes or text content
- [ ] After booking creation the new booking appears in the dashboard with room name, date, start time, and end time
- [ ] Submitting a duplicate time slot for the same room on the same date shows data-testid="booking-error-message"
- [ ] After cancellation the booking is removed from the dashboard
