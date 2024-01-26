<script setup>
import projectTable from '../components/ProjectTable.vue'
import projectForm from '../components/ProjectForm.vue'
</script>

<template>
  <section>
    <projectTable/>
    <projectForm /> 
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