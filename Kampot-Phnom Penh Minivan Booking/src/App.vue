<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header class="navbar">
    <h1>Kampot – Phnom Penh Minivan</h1>
    <nav>
      <RouterLink to="/">Trips</RouterLink>
      <RouterLink to="/bookings">My Bookings</RouterLink>
      <RouterLink to="/operator">Operator Panel</RouterLink>
    </nav>
  </header>

  <main class="container">
    <RouterView />
  </main>
</template>

<style>
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  background: #f5f7fa;
  color: #1e293b;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #0f172a;
  color: white;
}
.navbar nav a {
  color: #cbd5e1;
  margin-left: 1.5rem;
  text-decoration: none;
  font-weight: 600;
}
.navbar nav a.router-link-active {
  color: #38bdf8;
}
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.filters, .trip-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.filters {
  grid-template-columns: 1fr 1fr auto auto;
}
.trip-grid {
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
}
.card {
  background: white;
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
.form {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  max-width: 450px;
}
.form label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  gap: 0.3rem;
}
input {
  padding: 0.55rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}
.btn, button {
  display: inline-block;
  padding: 0.6rem 1rem;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 6px;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
}
.btn-outline {
  background: #475569;
}
.btn-danger {
  background: #dc2626;
}
.state-box {
  padding: 2rem;
  text-align: center;
  background: white;
  border-radius: 8px;
}
.error, .error-list {
  color: #b91c1c;
  background: #fef2f2;
  padding: 0.75rem;
  border-radius: 6px;
}
.sold-out {
  color: #dc2626;
  font-weight: bold;
}
</style>