<script>
import ManagementDataService from '@/services/managementSystem'
export default {
    name: 'NewDepartment',
    async mounted(){
      // once mounted, get all locations and push to locationOptions
       const locations = await ManagementDataService.getLocations();
       locations.data.map((location) => {
            this.locationOptions.push({
                title: location.address,
                value: location.id
            })
        })
      },
    data(){
        return {
            dialog: false,
            alert: false,
            locationOptions: [],
            selectedLocation: null,
            title: null,
            required (v) {
                    return !!v || 'Field is required'
                },  
        }
    },
    methods: {
      // method to submit new department form data to database
       async submitForm(){
       const departmentData = await ManagementDataService.createDepartment(this.title, this.selectedLocation);
       if (departmentData) {
        this.dialog = false;
        location.reload();
       } else {
        // alert if data is not valid
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
  Add Department
  </v-btn>
  <v-dialog
    v-model="dialog"
    persistent
    width="auto"
  >
    <v-form @submit.prevent="submitForm()" >
      <v-card>
        <v-responsive class="mx-auto mb-4" min-width="344">
          <v-text-field hide-details="auto" label="Department Title" :rules="[required]" placeholder="Department Title" v-model="title" type="input"></v-text-field>
        </v-responsive>
        <!-- select menu iterates over locationOptions -->
        <v-select :items="locationOptions" :item-props="true" label="Location" v-model="this.selectedLocation" hint="New Department Location" persistent-hint></v-select>
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
          Save Department
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
          The department info you entered is not valid.
          </v-alert>
      </v-card>
  </v-dialog>
</template>