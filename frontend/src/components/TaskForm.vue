<script>
  import ManagementDataService from '../services/managementSystem'
    export default {
        name: 'taskForm',
        props: {
            projectId: Number
        },  
        data(){
            return {
                required (v) {
                    return !!v || 'Field is required'
                },  
                dialog: false,
                title: '',
                description: '',
                inProgress: false,
                completed: false,
                parentProject: this.projectId
            }
        },
        methods: {
            async addTask(title, description, inProgress, completed, parentProject){
                const newTask = await ManagementDataService.createTask(title, description, inProgress, completed, parentProject);
                location.reload();
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
              class="bg-blue-darken-2"
              v-bind="props"
            >
              Add Task
            </v-btn>
          </template>
          <v-form @submit.prevent="addTask(title, description, inProgress, completed, projectId)" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Task Title" v-model="title" :rules="[required]" placeholder="Title" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-text-field v-model="description" label="Task Description" placeholder="Description" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-checkbox
                    v-model="inProgress"
                    label="Task in progress"
                ></v-checkbox>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-checkbox
                    v-model="completed"
                    label="Task completed"
                ></v-checkbox>
              </v-responsive>
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
              add task
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
</template>