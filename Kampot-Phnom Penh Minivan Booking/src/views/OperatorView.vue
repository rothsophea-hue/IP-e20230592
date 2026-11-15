<script setup lang="ts">
import { ref } from 'vue';
import { useTripStore } from '../stores/tripStore';

const store = useTripStore();
const origin = ref('Phnom Penh');
const destination = ref('Kampot');
const departureTime = ref('');
const price = ref(10);
const totalSeats = ref(15);
const errorMsg = ref('');

async function handleCreateTrip() {
  errorMsg.value = '';
  if (!origin.value.trim() || !destination.value.trim() || !departureTime.value) {
    errorMsg.value = 'All fields including departure date/time are required.';
    return;
  }
  if (price.value <= 0 || totalSeats.value < 1) {
    errorMsg.value = 'Price must be positive and seats must be at least 1.';
    return;
  }

  await store.addTrip({
    origin: origin.value.trim(),
    destination: destination.value.trim(),
    departureTime: departureTime.value,
    price: price.value,
    totalSeats: totalSeats.value,
  });

  departureTime.value = '';
}
</script>

<template>
  <section class="page">
    <h2>Operator Dashboard — Add Minivan Schedule</h2>

    <form @submit.prevent="handleCreateTrip" class="card form">
      <p v-if="errorMsg" class="error-list">{{ errorMsg }}</p>

      <label>
        Origin
        <input v-model="origin" type="text" />
      </label>

      <label>
        Destination
        <input v-model="destination" type="text" />
      </label>

      <label>
        Departure Date & Time
        <input v-model="departureTime" type="datetime-local" />
      </label>

      <label>
        Ticket Price ($ USD)
        <input v-model.number="price" type="number" min="1" />
      </label>

      <label>
        Total Seats
        <input v-model.number="totalSeats" type="number" min="1" max="30" />
      </label>

      <button type="submit" class="btn">Publish Schedule</button>
    </form>
  </section>
</template>