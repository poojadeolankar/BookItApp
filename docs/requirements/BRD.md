# Business Requirements Document
**Project:** BookItApp — Room Booking
**Date:** 2026-03-17
**Source:** GitHub Issue #1 — [REQUIREMENT] Room Booking

## 1. Summary
BookItApp enables authenticated users to reserve meeting rooms in advance, eliminating
double-booking conflicts. Users can browse available rooms, create a booking for a
specific time slot, view their upcoming bookings on a personal dashboard, and cancel
any booking they own.

## 2. User Roles
| Role | Description |
|------|-------------|
| User | An authenticated member of the organisation who can browse rooms, create bookings, view their own bookings on a dashboard, and cancel their own bookings. |

## 3. In Scope
- Browse available rooms
- Create a booking for a specific time slot
- View own bookings on a personal dashboard
- Cancel own bookings

## 4. Out of Scope
- Room creation or admin management (rooms are pre-loaded via seed data)
- Email notifications
- Payment processing
- Admin role or elevated permissions

## 5. Functional Requirements
| ID | Requirement | Acceptance Criteria |
|----|-------------|---------------------|
| FR-001 | A User can browse all available rooms | 1. A list of rooms is displayed after login. 2. Each room shows its name and capacity. |
| FR-002 | An authenticated User can create a booking for a room and time slot | 1. The booking form requires a room, date, start time, and end time. 2. On successful submission the booking appears in the User's dashboard. |
| FR-003 | The system prevents double-booking of a room | 1. If a time slot for a room is already booked, a new booking for an overlapping slot is rejected. 2. An appropriate error message is shown to the User. |
| FR-004 | An authenticated User can view their own bookings on a dashboard | 1. The dashboard lists all bookings belonging to the logged-in User. 2. Each booking shows the room name, date, start time, and end time. |
| FR-005 | An authenticated User can cancel their own booking | 1. A cancel action is available for each of the User's bookings. 2. After cancellation the booking no longer appears on the dashboard. |
| FR-006 | Only the owner of a booking can cancel it | 1. Attempting to cancel another User's booking returns a 403 Forbidden error. 2. The cancel action is not exposed in the UI for bookings the User does not own. |

## 6. Non-Functional Requirements
| ID | Category | Requirement |
|----|----------|-------------|
| NFR-001 | Security | JWT authentication is required on all booking-related API routes. |
| NFR-002 | Performance | Page load and API responses complete in under 3 seconds under normal load. |
| NFR-003 | Usability | UI is responsive and works on both desktop and mobile viewports. |
| NFR-004 | Data Integrity | Booking overlap validation is enforced at the API layer, not only in the UI. |

## 7. Domain Model

### Entities

**Room**
- `id` — unique identifier
- `name` — human-readable room name
- `capacity` — maximum number of occupants

**Booking**
- `id` — unique identifier
- `userId` — references the User who created the booking
- `roomId` — references the booked Room
- `date` — the calendar date of the booking
- `startTime` — booking start time
- `endTime` — booking end time
- `status` — `ACTIVE | CANCELLED`

### Booking Lifecycle
```
Created → ACTIVE → CANCELLED (by owner)
```

## 8. Assumptions
- Rooms are pre-loaded through database seed data; no Room CRUD UI is needed.
- A User may have multiple bookings for different rooms or different time slots.
- Overlap detection applies per room: two bookings for the same room overlap if their
  time ranges intersect on the same date.
- Bookings that are cancelled remain in the database (soft delete via status field) but
  are hidden from the User's active dashboard view.
- Authentication is handled by the existing JWT middleware; no new auth work is required.
- The application has a single user role (authenticated User); no admin role is in scope.
