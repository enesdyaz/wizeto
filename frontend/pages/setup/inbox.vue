<template>
<div>

    <div>
        <calendar :inbox="inbox" />
    </div>
</div>
</template>

<script>
import calendar from '../../components/calendar/calendar'
export default {
    components: {
        calendar
    },
    computed:{
        inbox(){
            const inbox = this.$store.state.booking.book
            return inbox
        }
    }
}
</script>

<style>

</style>