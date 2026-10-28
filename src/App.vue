
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import EventList from "./components/EventList.vue";
import { initialEvents } from "./data/events";
import type { CampusEvent } from "./types";

// A reactive copy of the hard-coded events
const events = ref<CampusEvent[]>(
  initialEvents.map((e) => ({ ...e }))
);

// TODO 1: Store booked event IDs (one entry per seat)
const myBookings = ref<number[]>([]);

// TODO 2: Calculate the total number of booked seats
const bookingCount = computed(() => myBookings.value.length);

// TODO 3: Book a seat
function onBook(id: number) {
  const event = events.value.find((e) => e.id === id);

  // Stop if the event doesn't exist or is already full
  if (!event || event.booked >= event.capacity) {
    return;
  }

  // Update the event and record the booking
  event.booked++;
  myBookings.value.push(id);
}

// TODO 4: Restore saved bookings when the app starts
try {
  const saved = localStorage.getItem("myBookings");

  if (saved !== null) {
    const ids: unknown = JSON.parse(saved);

    if (
      Array.isArray(ids) &&
      ids.every((id) => Number.isInteger(id))
    ) {
      for (const id of ids as number[]) {
        const event = events.value.find((e) => e.id === id);

        if (event && event.booked < event.capacity) {
          event.booked++;
          myBookings.value.push(id);
        }
      }
    }
  }
} catch {
  // Ignore invalid or unreadable saved data
  myBookings.value = [];
}

// Save bookings whenever the list changes
watch(
  myBookings,
  (ids) => {
    localStorage.setItem("myBookings", JSON.stringify(ids));
  },
  { deep: true }
);
</script>

<template>
  <main>
    <header>
      <h1>Campus Events</h1>

      <!-- TODO 5: Show the real booking count -->
      <p class="mine">
        You have booked {{ bookingCount }}
        {{ bookingCount === 1 ? "seat" : "seats" }}.
      </p>
    </header>

    <EventList
      :events="events"
      @book="onBook"
    />
  </main>
</template>

<style scoped>
header {
  margin-bottom: 16px;
}

.mine {
  color: #6b7280;
  margin: 0;
}
</style>
