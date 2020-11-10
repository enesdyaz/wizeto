<template>
<div>
    <div>
        <ul v-for='(item, index) in inbox' :key='index'>
            <li>
                Service: {{item.service}} <br>
                Date: {{item.date}} <br>
                Time: {{item.time}} <br>
                Customer Name: {{item.name}} <br>
                Customer Phone: {{item.mobile}} <br>
                Customer email: {{item.email}}
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
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