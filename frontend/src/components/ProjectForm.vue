<script>
  import ManagementDataService from '../services/managementSystem'
    export default {
        name: 'projectForm',
        mounted(){
            this.getEmployeeOptions();
        },
        data(){
            return {
                required (v) {
                    return !!v || 'Field is required'
                },  
                dialog: false,
                title: '',
                description: '',
                employeeOptions: [],
                selectedEmployees: null,
            }
        },
        methods: {
            async addProjectData(title, description, selectedEmployees) {
                const data = await ManagementDataService.createProject(title, description, selectedEmployees);
                location.reload();
            },
            async getEmployeeOptions(){
                const data = await ManagementDataService.fetchEmployees();
                const condensedData = data.data.map((employee) => {
                    return {
                        title: `${employee.firstName} ${employee.lastName}`,
                        value: `${employee.id}`,
                        subtitle: `${employee.department.title}`
                    };
                });
                this.employeeOptions = condensedData;
            }
        }
    }
</script>

<template>
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
          <v-form @submit.prevent="addProjectData(title, description, selectedEmployees)" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Project Title" v-model="title" :rules="[required]" placeholder="Title" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-text-field v-model="description" :rules="[required]" label="Project Description" placeholder="Description" type="input"></v-text-field>
              </v-responsive>
              <v-select :items="employeeOptions" :item-props="true" label="Select" v-model="selectedEmployees" multiple hint="Add Employees to Project" persistent-hint></v-select>
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
              type="submit"
              >
              add project
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
</template>