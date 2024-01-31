<script>
import router from '@/router';
import ManagementDataService from '@/services/managementSystem';

export default {
    name: 'PersonalCard',
    data() {
        return {
            dialog: false,
            employeeId: null, 
            name: '',
            email: '',
            department: '',
            location: '',
            phoneNumber: '',
            alert: false,
        }
    },
    async mounted(){
        // once component is mounted, extract employeeId from path name 
        const path = location.pathname.split('')
        this.employeeId = parseInt(path[path.length - 1])
        // fetch employee info using employeeId
        const employeeData = await ManagementDataService.singleEmployeeInfo(this.employeeId);
        // use employeeData to give value to properties in component data
        this.name = (`${employeeData.data.firstName} ${employeeData.data.lastName}`)
        this.email = employeeData.data.email;
        this.department = employeeData.data.department.title;
        this.location = employeeData.data.department.location.address;
        this.phoneNumber = employeeData.data.phoneNumber;
    },
    methods: {
      // method to submit form data to edit employee info 
        async editInfo() {
            const editInfo = await ManagementDataService.editEmployeeInfo(this.employeeId, this.phoneNumber, this.email);
            if (editInfo) {
              this.dialog = false;
              location.reload();
            } else {
              this.dialog = true;
              this.alert = true;
            }
        },
        // method to delete employee 
        async deleteInfo() {
          const deleteEmployee = await ManagementDataService.deleteEmployee(this.employeeId);
          router.replace({path: `/admin`})
        },
        // method to reload page (used if edit info is cancelled so that data on card reverts to original)
        reload() {
          this.dialog = false;
          location.reload();
        }
    }
}
</script>

<template>
  <v-card elevation="8" width="80vw">
    <template v-slot:title class="font-weight-bold">{{ name }}</template>
    <v-divider :thickness="8" ></v-divider>
    <v-list lines="one" class="ml-8">
        <v-list-item><strong class="mr-2">Email:</strong><a v-bind:href="'mailto:' + email">{{ email }}</a></v-list-item>
        <v-list-item><strong class="mr-2">Phone:</strong><a v-bind:href="'tel:' + phoneNumber">{{ phoneNumber }}</a></v-list-item>
        <v-list-item><strong class="mr-2">Department:</strong> {{ department }}</v-list-item>
        <v-list-item><strong class="mr-2">Office location:</strong> {{ location }}</v-list-item>
    </v-list>
  </v-card>
  <div>
    <!-- conditionally render button to open edit info form dialog if employeeId matches user's stored employeeId-->
    <v-btn
      v-if="employeeId === this.$store.state.employeeId"
      class="bg-blue-darken-2 mr-4"
      @click="dialog = true"
    >
      Edit Contact Info
    </v-btn>
    <!-- conditional render of delete button so only admin has option to delete an employee, but cannot delete their own account -->
    <v-btn
      v-if="this.$store.state.admin === true && this.$store.state.employeeId !== employeeId"
      class="bg-blue-darken-2 "
      @click="deleteInfo()"
    >
      Delete Employee Account
    </v-btn>
<!-- dialog form that only renders if dialog = true -->
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="auto"
      >
        <!-- edit employee info form -->
        <v-form @submit.prevent="editInfo()" >
          <v-card>
            <v-responsive class="mx-auto mb-4" min-width="344">
              <v-text-field hide-details="auto" label="Email" v-model="email" placeholder="Email" type="input"></v-text-field>
            </v-responsive>
            <v-responsive class="mx-auto" min-width="344">
              <v-text-field v-model="phoneNumber" label="Phone Number" placeholder="(000)000-000" type="input"></v-text-field>
            </v-responsive>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red-darken-2"
                variant="text"
                @click="reload()"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-2"
              variant="text"
              type="submit"
              >
              save changes
              </v-btn>
            </v-card-actions>
            <v-alert
            v-model="alert"
            variant="tonal"
            closable
            close-label="Close Alert"
            color="red-lighten-1"
            title="Uh oh!"
          >
            Changes to employee contact information are not in valid format.
            </v-alert>
          </v-card>
        </v-form>
        </v-dialog>
      </v-row>
  </div>
</template>

<style scoped>
.v-card{
    margin-bottom: 44px;
}
a{
  color: black;
}
</style>