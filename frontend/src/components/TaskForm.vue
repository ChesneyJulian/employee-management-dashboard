<script>
//   import ManagementDataService from '../services/managementSystem'
    export default {
        name: 'TaskForm',
        data(){
            return {
                dialog: false,
                description: '',
                completed: null,
                inProgress: null,

            }
        },
        methods: {}
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
        <template >
            <v-btn icon="mdi-pencil"
                    size="small"
                    class="me-2"
                    @click="editTask(item.edit)"
                >
            </v-btn>
          </template>
          <v-form @submit.prevent="" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Task Description" v-model="description" placeholder="Description" type="input"></v-text-field>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-checkbox
                    v-model="inProgress"
                    label="Task in progress?"
                ></v-checkbox>
              </v-responsive>
              <v-responsive class="mx-auto" min-width="344">
                <v-checkbox
                    v-model="completed"
                    label="Task completed?"
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
              add project
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
    </div>
</template>