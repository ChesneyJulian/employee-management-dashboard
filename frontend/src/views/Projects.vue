<script setup>
import navbar from '../components/Navigation.vue'
import projectTable from '../components/ProjectTable.vue'
import projectForm from '../components/ProjectForm.vue'
</script>

<template>
  <section>
    <navbar />
    <projectTable />
    <projectForm /> 
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  height: 100vh;
 justify-content: space-evenly;
}
</style>