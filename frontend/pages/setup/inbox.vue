<template>
<div>

    <div>
        <calendar/>
    </div>
</div>
</template>

<script>
import calendar from '../../components/calendar/calendar'
export default {
    components: {
        calendar
    },
    created(){
        console.log('inbox created 실행됨')

        this.$store.dispatch('booking/fetchAppointment')
        

    }
    
}
</script>

<style>

</style>