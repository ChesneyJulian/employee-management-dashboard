<script>
import NewEmployee from './NewEmployee.vue'
import NewDepartment from './NewDepartment.vue';
import NewLocation from './NewLocation.vue';
import ManagementDataService from '../services/managementSystem'
export default {
    name: 'adminPortal',
    async mounted(){

        const locations = await ManagementDataService.getLocations();
        locations.data.map((location) => {
            this.locationOptions.push({
                title: location.address,
                id: location.id
            })
        })
    },
    components: {
    NewEmployee,
    NewDepartment,
    NewLocation
},
    data(){
        return {
            departmentOptions: [],
            locationOptions: []
        }
    },
}
</script>

<template>
    <NewEmployee />
    <NewDepartment />
    <NewLocation />
</template>

<style scoped>


</style>