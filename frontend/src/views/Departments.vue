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
  align-items: center;
  min-height: 100vh;
  margin-top: 52px;
}
</style>