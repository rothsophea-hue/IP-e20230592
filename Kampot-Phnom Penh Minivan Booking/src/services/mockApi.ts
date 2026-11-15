import type { Trip, Booking } from '../types/booking';

const initialTrips: Trip[] = [
  {
    id: 'trip-101',
    origin: 'Phnom Penh',
    destination: 'Kampot',
    departureTime: '2026-11-20T07:30:00',
    price: 10,
    totalSeats: 15,
    availableSeats: 6,
  },
  {
    id: 'trip-102',
    origin: 'Phnom Penh',
    destination: 'Kampot',
    departureTime: '2026-11-20T13:30:00',
    price: 10,
    totalSeats: 15,
    availableSeats: 0, // Fully booked test case
  },
  {
    id: 'trip-103',
    origin: 'Kampot',
    destination: 'Phnom Penh',
    departureTime: '2026-11-21T08:00:00',
    price: 10,
    totalSeats: 15,
    availableSeats: 12,
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async fetchTrips(simulateError = false): Promise<Trip[]> {
    await delay(500);
    if (simulateError) {
      throw new Error('Failed to connect to minivan schedule service.');
    }
    return [...initialTrips];
  },

  async createBooking(booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> {
    await delay(400);
    return {
      ...booking,
      id: `bk-${Date.now()}`,
      status: 'CONFIRMED',
    };
  },

  async createTrip(trip: Omit<Trip, 'id' | 'availableSeats'>): Promise<Trip> {
    await delay(400);
    return {
      ...trip,
      id: `trip-${Date.now()}`,
      availableSeats: trip.totalSeats,
    };
  },
};