<script setup>
import dashboard from '../components/Dashboard.vue'
import navbar from '../components/Navigation.vue'
</script>

<template>
  <section>
    <navbar />
    <container class="mx-auto">
      <dashboard />
    </container>
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: row;
  min-width: 100vw;
  align-items: space-between;
}

</style>