<script>
import ManagementDataService from '../services/managementSystem'
export default {
    name: 'NewDepartment',
    async mounted(){
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
       async submitForm(){
       const departmentData = await ManagementDataService.createDepartment(this.title, this.selectedLocation);
       console.log(departmentData); 
       if (departmentData) {
        alert('Department added to database.')
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
        Add Department
      </v-btn>
    </template>
    <v-form @submit.prevent="submitForm()" >
      <v-card>
        <v-responsive class="mx-auto mb-4" min-width="344">
          <v-text-field hide-details="auto" label="Department Title" :rules="[required]" placeholder="Department Title" v-model="title" type="input"></v-text-field>
        </v-responsive>
        <v-select :items="locationOptions" :item-props="true" label="Location" v-model="this.selectedLocation" hint="New Department Location" persistent-hint></v-select>
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
          Add Department
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