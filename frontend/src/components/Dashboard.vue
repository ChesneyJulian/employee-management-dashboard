<script>
  export default {
    name: 'dashboard',
    data: () => ({
      cards: [
        {
          title: 'Your info',
          description: 'View personal info',
          flex: 12,
          backgroundColor: 'rgba(246, 194, 82, 0.8)',
        },
        {
          title: 'Your Projects',
          description: 'View your current projects',
          flex: 6,
          backgroundColor: 'rgba(39, 135, 245, 0.62)',
        },
        {
          title: 'Department Info',
          description: 'View info about your department',
          flex: 6,
          backgroundColor: 'rgba(2, 187, 64, 0.48)',
        },
        {
          title: 'Timecards',
          description: 'View and edit your timecards',
          flex: 12,
          backgroundColor: 'rgba(234, 0, 46, 0.52)',
        }
      ],
    }),
  }
</script>
<template>
  <!-- <v-card class="mx-auto"> -->
    <v-container class="mx-auto">
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-card class="align-end mr-4 mb-4" :style="{ backgroundColor: card.backgroundColor}"  height="200px" cover>
              <v-card-title class="text-white font-weight-medium text-h4 my-2" v-text="card.title"></v-card-title>
              <v-card-text class="text-white text-subtitle-1 font-weight-normal" v-text="card.description"></v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  <!-- </v-card> -->
</template>

<style scoped>



</style>