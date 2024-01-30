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
  align-items: center;
  min-height: 100vh;
  margin-top: 52px;
}
</style>