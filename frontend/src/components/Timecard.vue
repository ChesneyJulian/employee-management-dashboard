<script>
  export default {
    name: 'Timecard',
    data () {
      return {
        dateVal: null,
        hours: 0.00
      }
    },
    methods: {
        submitHours (dateVal, hours) {
            console.log(dateVal, hours);
            console.log(dateVal.getMonth() + 1)
        }
    },

  }
</script>
<template>
    <v-card
    title="Time Card">
    <v-divider :thickness="8" ></v-divider>
        <v-container >
            <v-form @submit.prevent="submitHours(hours, dateVal)" class="d-flex flex-row">
            <v-row justify="space-around">
                <v-date-picker v-model="dateVal"></v-date-picker>
            </v-row>
            <v-sheet width="300" class="mx-auto">
                    <v-text-field
                    v-model="hours"
                    label="Hours worked"
                    ></v-text-field>
                    <v-btn type="submit" block class="mt-2">Submit</v-btn>
                </v-sheet>
            </v-form>
        </v-container>
    </v-card>

</template>


<style scoped>
.v-card{
    width: 80vw;
    margin-bottom: 44px;
}

</style>