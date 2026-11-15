import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Trip, Booking } from '../types/booking';
import { mockApi } from '../services/mockApi';

export const useTripStore = defineStore('tripStore', () => {
  const trips = ref<Trip[]>([]);
  const bookings = ref<Booking[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);

  async function loadTrips(simulateError = false) {
    isLoading.value = true;
    errorMessage.value = null;
    try {
      trips.value = await mockApi.fetchTrips(simulateError);
    } catch (err) {
      errorMessage.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      isLoading.value = false;
    }
  }

  function getTripById(id: string): Trip | undefined {
    return trips.value.find((t) => t.id === id);
  }

  async function bookSeats(payload: Omit<Booking, 'id' | 'status'>) {
    const trip = getTripById(payload.tripId);
    if (!trip || trip.availableSeats < payload.seatsBooked) {
      throw new Error('Not enough seats available.');
    }
    const newBooking = await mockApi.createBooking(payload);
    bookings.value.unshift(newBooking);
    trip.availableSeats -= payload.seatsBooked;
  }

  function cancelBooking(bookingId: string) {
    const booking = bookings.value.find((b) => b.id === bookingId);
    if (booking && booking.status === 'CONFIRMED') {
      booking.status = 'CANCELLED';
      const trip = getTripById(booking.tripId);
      if (trip) {
        trip.availableSeats += booking.seatsBooked;
      }
    }
  }

  async function addTrip(payload: Omit<Trip, 'id' | 'availableSeats'>) {
    const newTrip = await mockApi.createTrip(payload);
    trips.value.push(newTrip);
  }

  return {
    trips,
    bookings,
    isLoading,
    errorMessage,
    loadTrips,
    getTripById,
    bookSeats,
    cancelBooking,
    addTrip,
  };
});