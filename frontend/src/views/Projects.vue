<script setup>
import ProjectTable from '@/components/ProjectTable.vue'
import ProjectForm from '@/components/ProjectForm.vue'
</script>

<template>
  <section>
    <ProjectTable/>
    <ProjectForm /> 
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