<script setup>
defineProps(['days'])
</script>

<template>
  <span
    v-if="days === null"
    class="status-ampel status-unbekannt"
  >
    Kein Termin
  </span>
  <span
    v-else-if="days <= 0"
    class="status-ampel status-rot"
  >
    Überfällig
  </span>
  <span
    v-else-if="days < 30"
    class="status-ampel status-gelb"
  >
    Bald fällig ({{ days }} Tage)
  </span>
  <span
    v-else
    class="status-ampel status-gruen"
  >
    In Ordnung ({{ days }} Tage)
  </span>
</template>

<style scoped>
.status-ampel {
  padding: 0.25rem 0.6rem;
  border-radius: 0.5rem;
  font-weight: 600;
}
.status-rot { background: #DC143C; color: white; }
.status-gelb { background: #FFD700; color: #191970; }
.status-gruen { background: #32CD32; color: white; }
</style>