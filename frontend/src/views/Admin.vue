<script setup>
import adminPortal from '../components/Admin.vue'
</script>

<template>
    <section class="mx-auto">
        <adminPortal />
    </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  min-width: 100vw;
  min-height: 70vh;
  justify-content: center;
  align-items: center;
}
</style>