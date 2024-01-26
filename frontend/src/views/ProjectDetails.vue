<script setup>
import projectDetails from '../components/ProjectDetails.vue'
</script>

<template>
  <section>
    <projectDetails />
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