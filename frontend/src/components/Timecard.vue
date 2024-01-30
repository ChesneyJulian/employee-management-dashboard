<script>
import ManagementDataService from '../services/managementSystem'
const months = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]
  export default {
    name: 'Timecard',
    mounted(){
      this.fetchHistory()
    },
    data () {
      return {
        formDisplay: false,
        historyDisplay: true,
        dateVal: null,
        hours: null,
        timecardHistory: [],
        alert: false,
      }
    },
    methods: {
        async submitHours () {
          const newTimecardData = await ManagementDataService.addTimecard(this.dateVal, this.hours, this.$store.state.employeeId);
          if (newTimecardData) {
            this.fetchHistory();
          } else {
            this.alert = true;
          }
        },
        async fetchHistory() {
          this.timecardHistory = [];
          this.formDisplay = false;
          this.historyDisplay = true;
          const pastTimecards = await ManagementDataService.getTimecards(this.$store.state.employeeId);
          pastTimecards.data.map((entry) => {
            const dayJsDate = new Date(entry.date);
            const adjustedDate = new Date(dayJsDate.getFullYear(), dayJsDate.getMonth(), (dayJsDate.getDate() + 1)).toDateString();
            const formattedDate = `${adjustedDate.slice(0,3)}. ${adjustedDate.slice(4, 7)}. ${adjustedDate.slice(8, 10)}, ${adjustedDate.slice(11)}`
            this.timecardHistory.push({
              date: formattedDate,
              'hours worked': entry.hoursWorked
            })
          })
        }
    },
  }
</script>

<template>
  <v-card elevation="8" title="New Time Card" v-if="this.formDisplay">
    <v-divider :thickness="8" ></v-divider>
      <v-container >
          <v-form @submit.prevent="submitHours()" class="d-flex flex-row">
          <v-row justify="space-around">
              <v-date-picker v-model="dateVal"></v-date-picker>
          </v-row>
          <v-sheet width="300" class="mx-auto">
                  <v-text-field
                  v-model="hours"
                  placeholder="8.25"
                  label="Hours worked"
                  ></v-text-field>
                  <v-btn type="submit"  block class="mt-2 bg-blue-darken-2">Save Timecard</v-btn>
              </v-sheet>
          </v-form>
          <div>
          <v-alert
            v-model="alert"
            variant="tonal"
            closable
            close-label="Close Alert"
            color="red-lighten-1"
            title="Uh oh!"
          >
          Timecard already exists for the selected date.
          </v-alert>
        </div>
      </v-container>
  </v-card>
  <v-card v-if="this.historyDisplay" title="Past Timecards" elevation="8">
    <v-divider :thickness="8" ></v-divider>
    <v-data-table :items="this.timecardHistory">
    </v-data-table>
  </v-card>
  <section class="d-flex w-100 justify-space-evenly mb-12">
    <v-btn class="bg-blue-darken-2" v-if="!this.formDisplay" @click="this.formDisplay = true; this.historyDisplay = false">New Timecard</v-btn>
    <v-btn class="bg-blue-darken-2" v-if="!this.historyDisplay" @click="fetchHistory()">View Past Timecards</v-btn>
  </section>
</template>


<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}

</style>