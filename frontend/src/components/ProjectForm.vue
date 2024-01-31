<script>
  import ManagementDataService from '@/services/managementSystem'
    export default {
        name: 'ProjectForm',
        async mounted(){
          // once component is mounted, get all employees to set data as value for this.employeeOptions
          const employeeData = await ManagementDataService.fetchEmployees();
                employeeData.data.forEach((employee) => {
                    this.employeeOptions.push({
                        title: `${employee.firstName} ${employee.lastName}`,
                        value: `${employee.id}`,
                        subtitle: `${employee.department.title}`
                    });
                });
        },
        data(){
            return {
                required (v) {
                    return !!v || 'Field is required'
                },  
                alert: false,
                dialog: false,
                title: null,
                description: null,
                employeeOptions: [],
                selectedEmployees: null,
            }
        },
        methods: {
          // method to submit project form data to add project to database
            async addProjectData(title, description, selectedEmployees) {
                const data = await ManagementDataService.createProject(title, description, selectedEmployees);
                if (data) {
                  this.dialog = false;
                  this.alert = false;
                  location.reload();
                } else {
                  this.alert = true;
                }
            }
        }
    }
</script>

<template>
    <div>
      <v-btn
            class="bg-blue-darken-2"
              @click="dialog = true"
            >
              Add Project
        </v-btn>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <v-form @submit.prevent="addProjectData(title, description, selectedEmployees)" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Project Title" v-model="title" :rules="[required]" placeholder="Title" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-text-field v-model="description" :rules="[required]" label="Project Description" placeholder="Description" type="input"></v-text-field>
              </v-responsive>
              <!-- v-select input uses employeeOptions array to create select options -->
              <v-select :items="employeeOptions" :item-props="true" label="Select" v-model="selectedEmployees" multiple hint="Add Employees to Project" persistent-hint></v-select>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="red-darken-2"
                variant="text"
                @click="dialog = false; alert = false"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-2"
              variant="text"
              type="submit"
              >
              Save project
              </v-btn>
            </v-card-actions>
            <v-card>
              <v-alert
              v-model="alert"
              variant="tonal"
              closable
              close-label="Close Alert"
              color="red-lighten-1"
              title="Uh oh!"
              >
              Please enter all fields.
              </v-alert>
            </v-card>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
</template>