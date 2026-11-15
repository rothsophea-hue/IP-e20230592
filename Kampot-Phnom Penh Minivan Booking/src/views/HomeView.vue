<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useTripStore } from '../stores/tripStore';

const store = useTripStore();
const originFilter = ref('');
const destinationFilter = ref('');

onMounted(() => {
  if (store.trips.length === 0) {
    store.loadTrips();
  }
});

const filteredTrips = computed(() => {
  return store.trips.filter((trip) => {
    const matchOrigin = trip.origin.toLowerCase().includes(originFilter.value.toLowerCase());
    const matchDest = trip.destination.toLowerCase().includes(destinationFilter.value.toLowerCase());
    return matchOrigin && matchDest;
  });
});
</script>

<template>
  <section class="page">
    <h2>Available Minivan Trips</h2>

    <div class="filters">
      <input v-model="originFilter" placeholder="Filter by Origin (e.g. Phnom Penh)" />
      <input v-model="destinationFilter" placeholder="Filter by Destination (e.g. Kampot)" />
      <button type="button" @click="store.loadTrips(true)" class="btn-outline">
        Test Error State
      </button>
      <button type="button" @click="store.loadTrips(false)" class="btn-outline">
        Reload Trips
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="store.isLoading" class="state-box">Loading schedules...</div>

    <!-- Error State -->
    <div v-else-if="store.errorMessage" class="state-box error">
      <p>{{ store.errorMessage }}</p>
      <button @click="store.loadTrips(false)">Retry</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="filteredTrips.length === 0" class="state-box">
      No minivan trips match your search filter.
    </div>

    <!-- Data List -->
    <div v-else class="trip-grid">
      <article v-for="trip in filteredTrips" :key="trip.id" class="card">
        <h3>{{ trip.origin }} → {{ trip.destination }}</h3>
        <p><strong>Departure:</strong> {{ new Date(trip.departureTime).toLocaleString() }}</p>
        <p><strong>Price:</strong> ${{ trip.price }} / seat</p>
        <p>
          <strong>Seats:</strong>
          <span :class="{ 'sold-out': trip.availableSeats === 0 }">
            {{ trip.availableSeats > 0 ? `${trip.availableSeats} left` : 'Fully Booked' }}
          </span>
        </p>
        <RouterLink :to="`/trips/${trip.id}`" class="btn">
          {{ trip.availableSeats > 0 ? 'View & Book' : 'View Details' }}
        </RouterLink>
      </article>
    </div>
  </section>
</template>