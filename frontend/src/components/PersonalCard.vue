<script>
import router from '@/router';
import AuthServices from '../services/auth'
import ManagementDataService from '../services/managementSystem';

export default {
    name: 'personalCard',
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
        const path = location.pathname.split('')
        this.employeeId = parseInt(path[path.length - 1])
        const employeeData = await ManagementDataService.singleEmployeeInfo(this.employeeId);
        this.name = (`${employeeData.data.firstName} ${employeeData.data.lastName}`)
        this.email = employeeData.data.email;
        this.department = employeeData.data.department.title;
        this.location = employeeData.data.department.location.address;
        this.phoneNumber = employeeData.data.phoneNumber;
    },
    methods: {
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
        async deleteInfo() {
          const deleteEmployee = await ManagementDataService.deleteEmployee(this.employeeId);
          router.replace({path: `/admin`})
        },
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
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            v-if="employeeId === this.$store.state.employeeId"
            class="bg-blue-darken-2 mr-4"
            v-bind="props"
          >
            Edit Contact Info
          </v-btn>
          <v-btn
            v-if="this.$store.state.admin === true && this.$store.state.employeeId !== employeeId"
            class="bg-blue-darken-2 "
            @click="deleteInfo()"
          >
            Delete Employee Account
          </v-btn>
        </template>
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
                color="red-darken-1"
                variant="text"
                @click="reload()"
                >
                Cancel
              </v-btn>
              <v-btn
              color="green-darken-1"
              variant="text"
              type="submit"
              >
              edit info
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
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