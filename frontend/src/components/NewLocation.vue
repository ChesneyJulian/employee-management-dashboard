<script>
import ManagementDataService from '../services/managementSystem'
export default {
    name: 'NewLocation',
    data(){
        return {
            dialog: false,
            address: null,
            alert: false,
            employeeParking: false,
            required (v) {
                    return !!v || 'Field is required'
                },  
        }
    },
    methods: {
       async submitForm(){
       const locationData = await ManagementDataService.createLocation(this.address, this.employeeParking);
       if (locationData) {
        alert('Location added to database.')
        this.dialog = false;
        location.reload();
       } else {
        this.alert = true;
       }
      }
    }
}
</script>

<template>
        <v-dialog
          v-model="dialog"
          persistent
          width="auto"
        >
          <template v-slot:activator="{ props }">
            <v-btn
            @click="active = goal"
            class="bg-blue-darken-2"
              v-bind="props"
            >
              Add Office Location
            </v-btn>
          </template>
          <v-form @submit.prevent="submitForm()" >
            <v-card>
              <v-responsive class="mx-auto mb-4" min-width="344">
                <v-text-field hide-details="auto" label="Address" :rules="[required]" placeholder="Address" v-model="address" type="input"></v-text-field>
              </v-responsive>
              <v-checkbox v-model="employeeParking" label="Employee Parking Available"></v-checkbox>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                color="red-darken-1"
                variant="text"
                @click="dialog = false; goal = null"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-1"
              variant="text"
              @click=""
              type="submit"
              >
              Add Office Location
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
        <v-card>
          <v-alert
            v-model="alert"
            variant="tonal"
            closable
            close-label="Close Alert"
            color="red-lighten-1"
            title="Uh oh!"
          >
          The location info you entered is not valid.
          </v-alert>
        </v-card>
        </v-dialog>
</template>