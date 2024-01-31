<script>
import router from '@/router/index'
  export default {
    name: 'Dashboard',
    // when component is mounted, set this.admin to the admin property in vuex store
    mounted(){
      this.admin = this.$store.state.admin
    },
    data: () => ({
      admin: null,
      isHovering: null,
      cards: [
        {
          title: 'Your info',
          description: 'View personal info',
          backgroundColor: '#FFAB40',
          path: {name: 'info'}
        },
        {
          title: 'Your Projects',
          description: 'View your projects',
          backgroundColor: '#9575CD',
          path: { name: 'projects'}
        },
        {
          title: 'Department Info',
          description: 'View departments',
          backgroundColor: '#E57373',
          path: {name: 'department'}
        },
        {
          title: 'Timecards',
          description: 'View and edit your timecards',
          backgroundColor: '#4DB6AC',
          path: {name: 'timecard'}
        },
      ],
    }),
    methods: {
      // method to route to card's path when clicked
      followPath(path) {
        router.push(path)
      }
    }
  }
</script>

<template>
  <v-container class="mx-auto">
    <v-row dense>
      <!-- conditional rendering of admin card -->
      <v-col cols="12"  v-if="this.admin === true">
        <v-hover v-slot="{ isHovering, props }">
          <v-card
          :elevation="isHovering ? 12 : 2" 
          v-bind="props"
          :class="{ 'on-hover': isHovering}" class="align-end mr-4 mb-4 bg-green-lighten-1"  
          height="200px"
          @click="followPath('/admin')">
            <v-card-title class="text-white font-weight-medium text-h4 my-2" v-text="'Admin'"></v-card-title>
            <v-card-text class="text-white text-subtitle-1 font-weight-normal" v-text="'Administrative Portal'"></v-card-text>
          </v-card>
        </v-hover>
      </v-col>
      <!-- iterative rendering of cards using cards array in data -->
      <v-col v-for="card in cards" :key="card.title" cols="6">
        <v-hover v-slot="{ isHovering, props }">
          <v-card 
          :elevation="isHovering ? 12 : 2" 
          :class="{ 'on-hover': isHovering }" class="align-end mr-4 mb-4" 
          :style="{ backgroundColor: card.backgroundColor}" 
          v-bind="props"
          height="200px"
          @click="followPath(card.path)">
            <v-card-title class="text-white font-weight-medium text-h4 my-2" v-text="card.title"></v-card-title>
            <v-card-text class="text-white text-subtitle-1 font-weight-normal" v-text="card.description"></v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .v-card:on-hover {
    background-color: rgba(#FFF, 0.8);
  }
</style>