<script>
import ManagementDataService from '@/services/managementSystem'
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
      // method to submit location form data to database
       async submitForm(){
       const locationData = await ManagementDataService.createLocation(this.address, this.employeeParking);
       if (locationData) {
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
  <v-btn
  @click="dialog = true"
  class="bg-blue-darken-2"
  >
  Add Office Location
  </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      width="auto"
    >
      <v-form @submit.prevent="submitForm()" >
        <v-card>
          <v-responsive class="mx-auto mb-4" min-width="344">
            <v-text-field hide-details="auto" label="Address" :rules="[required]" placeholder="Address" v-model="address" type="input"></v-text-field>
          </v-responsive>
          <v-checkbox v-model="employeeParking" label="Employee Parking Available"></v-checkbox>
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
          type="submit"
          >
          Save Office Location
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