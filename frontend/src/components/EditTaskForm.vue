<script>
  import ManagementDataService from '@/services/managementSystem'
    export default {
        name: 'EditTaskForm',
        props: {
          taskId: Number,
          priorDescription: String,
          priorStarted: Boolean,
          priorCompleted: Boolean
        },
        data(){
            return {
                dialog: false,
                description: this.priorDescription,
                completed: this.priorCompleted,
                inProgress: this.priorStarted,

            }
        },
        methods: {
          // method to submit form data to edit task
          async editTask(id, description, inProgress, completed) {
            const updatedData = await ManagementDataService.updateTaskData(id, description, inProgress, completed);
            location.reload();
          }
        }
    }
</script>

<template class="d-flex align-center">
    <v-btn class="bg-blue-darken-2" density="compact" @click="dialog=true">Edit</v-btn>
    <div>
      <!-- dialog form that only renders if dialog = true -->
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <v-form @submit.prevent="editTask(taskId, description, inProgress, completed)" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Task Description" v-model="description" placeholder="Description" type="input"></v-text-field>
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
                color="red-darken-2"
                variant="text"
                @click="dialog = false"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-2"
              variant="text"
              @click="dialog = false"
              type="submit"
              >
              save changes
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
</template>