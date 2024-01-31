<script>
import ManagementDataService from '@/services/managementSystem'
  export default {
    name: 'Timecard',
    mounted(){
      // once component is mounted, fetchHistory to get all of user's timecards
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
      // method to submit new timecard entry to database
        async submitHours () {
          const newTimecardData = await ManagementDataService.addTimecard(this.dateVal, this.hours, this.$store.state.employeeId);
          if (newTimecardData) {
            // fetchHistory once data is added so that history is updated
            this.fetchHistory();
          } else {
            // if error occurs, set alert to true to indicate that timecard entry was invalid
            this.alert = true;
          }
        },
        // method to get all of user's timecards and use data as values for component properties
        async fetchHistory() {
          // clear out timecardHistory so that there aren't duplicates
          this.timecardHistory = [];
          this.formDisplay = false;
          this.historyDisplay = true;
          const pastTimecards = await ManagementDataService.getTimecards(this.$store.state.employeeId);
          // iterate over user timecards, format dates, and push each timecard to timecardHistory array as object
          pastTimecards.data.forEach((entry) => {
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
  <!-- conditionally renders new timecard form if this.formDisplay is true -->
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
    <!-- data-table to iterate through timecardHistory -->
    <v-data-table :items="this.timecardHistory">
    </v-data-table>
  </v-card>
  <section class="d-flex w-100 justify-space-evenly mb-12">
    <!-- conditionally render buttons to show form/history -->
    <v-btn class="bg-blue-darken-2" v-if="!this.formDisplay" @click="this.formDisplay = true; this.historyDisplay = false">New Timecard</v-btn>
    <v-btn class="bg-blue-darken-2" v-if="!this.historyDisplay" @click="this.formDisplay = false; this.historyDisplay = true">View Past Timecards</v-btn>
  </section>
</template>


<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}

</style>