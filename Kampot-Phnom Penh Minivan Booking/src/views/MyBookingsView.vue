<script setup lang="ts">
import { useTripStore } from '../stores/tripStore';

const store = useTripStore();

function getRouteLabel(tripId: string): string {
  const trip = store.getTripById(tripId);
  return trip ? `${trip.origin} → ${trip.destination}` : 'Unknown Route';
}
</script>

<template>
  <section class="page">
    <h2>My Bookings</h2>

    <div v-if="store.bookings.length === 0" class="state-box">
      You have no bookings yet. <RouterLink to="/">Browse trips</RouterLink>
    </div>

    <div v-else class="trip-grid">
      <article v-for="booking in store.bookings" :key="booking.id" class="card">
        <h3>{{ getRouteLabel(booking.tripId) }}</h3>
        <p><strong>Passenger:</strong> {{ booking.passengerName }} ({{ booking.passengerPhone }})</p>
        <p><strong>Seats:</strong> {{ booking.seatsBooked }} | <strong>Total:</strong> ${{ booking.totalAmount }}</p>
        <p><strong>Status:</strong> {{ booking.status }}</p>
        <button
          v-if="booking.status === 'CONFIRMED'"
          @click="store.cancelBooking(booking.id)"
          class="btn-danger"
        >
          Cancel Reservation
        </button>
      </article>
    </div>
  </section>
</template>