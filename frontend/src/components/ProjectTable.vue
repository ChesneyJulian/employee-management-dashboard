<template>
  <section>
    <div>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              color="primary"
              v-bind="props"
            >
              Add Project
            </v-btn>
          </template>
          <v-form @submit.prevent >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Project Title" v-model="title" :rules="[required]" placeholder="Title" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-text-field v-model="description" :rules="[required]" label="Project Description" placeholder="Description" type="input"></v-text-field>
              </v-responsive>
              <v-select :items="employees" label="Select" multiple hint="Add Employees to Project" persistent-hint></v-select>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="red-darken-1"
                variant="text"
                @click="dialog = false"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
              >
              add project
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
    
    <v-data-table :items="projects">
      <template v-slot:item.exclusive="{ item }">
        <v-checkbox
        v-model="item.exclusive"
        readonly
        ></v-checkbox>
      </template>
    </v-data-table>
  </section>
</template>
  <script>
  import ManagementDataService from '../services/managementSystem'
    export default {
    name:'projectTable',
    async beforeCreate() {
        const employeeId = this.$store.state.employeeId;
            const projectData = await ManagementDataService.fetchProjects(employeeId); 
            projectData.data.projects.map((project) => {
                this.projects.push({title: project.title, description: project.description, 'Tasks Available': project.tasks.length})
            });
        },
    data: () => ({
      dialog: false,
      projects:[],
      // MAKE FETCH TO GET ALL EMPLOYEES AND MAYBE MOVE ADD PROJECT FORM TO SEPARATE COMPONENT
      employees: [],
      required (v) {
        return !!v || 'Field is required'
      },
    }),
    methods: {
    },
  }
  </script>

<style scoped>
section {
  width: 75vw;
}

</style>