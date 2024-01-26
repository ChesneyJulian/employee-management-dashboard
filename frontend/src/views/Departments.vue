<script setup>
import departments from '../components/Departments.vue'
</script>

<template>
  <section>
    <departments />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
</style>