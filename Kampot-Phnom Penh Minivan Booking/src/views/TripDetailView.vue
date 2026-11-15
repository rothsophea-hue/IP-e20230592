<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTripStore } from '../stores/tripStore';

const route = useRoute();
const router = useRouter();
const store = useTripStore();

const passengerName = ref('');
const passengerPhone = ref('');
const seatsBooked = ref(1);
const formErrors = ref<string[]>([]);
const isSubmitting = ref(false);

onMounted(async () => {
  if (store.trips.length === 0) {
    await store.loadTrips();
  }
});

const trip = computed(() => store.getTripById(String(route.params.id)));

function validateForm(): boolean {
  formErrors.value = [];
  if (passengerName.value.trim().length < 2) {
    formErrors.value.push('Full name must be at least 2 characters.');
  }
  if (!/^[0-9]{8,12}$/.test(passengerPhone.value.trim())) {
    formErrors.value.push('Phone number must be 8 to 12 digits (e.g. 012345678).');
  }
  if (!trip.value || seatsBooked.value < 1 || seatsBooked.value > Math.min(4, trip.value.availableSeats)) {
    formErrors.value.push('Please select a valid number of seats (1 to 4, within availability).');
  }
  return formErrors.value.length === 0;
}

async function handleBooking() {
  if (!trip.value || !validateForm()) return;

  isSubmitting.value = true;
  try {
    await store.bookSeats({
      tripId: trip.value.id,
      passengerName: passengerName.value.trim(),
      passengerPhone: passengerPhone.value.trim(),
      seatsBooked: seatsBooked.value,
      totalAmount: seatsBooked.value * trip.value.price,
    });
    router.push('/bookings');
  } catch (err) {
    formErrors.value.push(err instanceof Error ? err.message : 'Booking failed.');
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <section class="page">
    <RouterLink to="/">← Back to Trips</RouterLink>

    <div v-if="store.isLoading" class="state-box">Loading trip details...</div>
    <div v-else-if="!trip" class="state-box error">Trip not found (404).</div>

    <div v-else class="card">
      <h2>{{ trip.origin }} → {{ trip.destination }}</h2>
      <p><strong>Departure:</strong> {{ new Date(trip.departureTime).toLocaleString() }}</p>
      <p><strong>Price per seat:</strong> ${{ trip.price }}</p>
      <p><strong>Available Seats:</strong> {{ trip.availableSeats }} / {{ trip.totalSeats }}</p>

      <hr />

      <div v-if="trip.availableSeats === 0" class="state-box error">
        This trip is completely sold out.
      </div>

      <form v-else @submit.prevent="handleBooking" class="form">
        <h3>Reserve Your Seat</h3>

        <ul v-if="formErrors.length > 0" class="error-list">
          <li v-for="err in formErrors" :key="err">{{ err }}</li>
        </ul>

        <label>
          Full Name
          <input v-model="passengerName" type="text" placeholder="Chin Rothsophea" />
        </label>

        <label>
          Phone Number
          <input v-model="passengerPhone" type="text" placeholder="012345678" />
        </label>

        <label>
          Number of Seats (Max 4)
          <input v-model.number="seatsBooked" type="number" min="1" :max="Math.min(4, trip.availableSeats)" />
        </label>

        <p><strong>Total:</strong> ${{ seatsBooked * trip.price }}</p>

        <button type="submit" class="btn" :disabled="isSubmitting">
          {{ isSubmitting ? 'Confirming...' : 'Confirm Booking' }}
        </button>
      </form>
    </div>
  </section>
</template>