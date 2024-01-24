<script>
import router from '../router/index'
  export default {
    name: 'dashboard',
    data: () => ({
      cards: [
        {
          title: 'Your info',
          description: 'View personal info',
          flex: 12,
          backgroundColor: 'rgba(246, 194, 82, 0.8)',
          path: {name: 'info'}
        },
        {
          title: 'Your Projects',
          description: 'View your current projects',
          flex: 6,
          backgroundColor: 'rgba(39, 135, 245, 0.62)',
          path: { name: 'projects'}
        },
        {
          title: 'Department Info',
          description: 'View info about your department',
          flex: 6,
          backgroundColor: 'rgba(2, 187, 64, 0.48)',
          path: {name: 'department'}
        },
        {
          title: 'Timecards',
          description: 'View and edit your timecards',
          flex: 12,
          backgroundColor: 'rgba(234, 0, 46, 0.52)',
          path: {name: 'timecard'}
        }
      ],
    }),
    methods: {
      followPath(path) {
        router.push(path)
      }
    }
  }
</script>
<template>
  <v-container class="mx-auto">
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
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