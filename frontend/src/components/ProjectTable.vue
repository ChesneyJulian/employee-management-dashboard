<script>
import router from '../router/index';
import ManagementDataService from '../services/managementSystem'
  export default {
  name:'projectTable',
  async beforeCreate() {
      const employeeId = this.$store.state.employeeId;
          const projectData = await ManagementDataService.fetchProjects(employeeId); 
          projectData.data.projects.map((project) => {
              this.projects.push({title: project.title, description: project.description, 'Tasks Available': project.tasks.length, details: project.id})
            });
      },
  data: () => ({
    projects:[],
  }),
  methods: {
    async toDetails(projectId) {
      router.push({ path: `/project-details/${projectId}`})
    }
  },
}
</script>
<template>
  <v-card elevation="8">
    <template v-slot:title class="text-h4 font-weight-bold">
            Your Projects
        </template >
        <v-divider :thickness="8" ></v-divider>
    <v-data-table :items="projects">
      <template v-slot:item.details="{ item }">
        <v-btn class="bg-blue-darken-2" density="compact" @click="toDetails(item.details)">View</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<style scoped>
.v-card{
  margin-bottom: 44px;
  width: 80vw;
}

</style>