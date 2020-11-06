<template>
<div>
    <div><main-view /></div>
    <div v-if='card.addOn'><card-view /></div>
    <div v-if='card2.addOn'><card-view2 /></div>
    <div v-if='card3.addOn'><card-view3 /></div>
    <div><display1 /></div>
    
    

</div>
</template>

<script>
import mainView from '../../widgets/views/mainView'
import display1 from '../../../pages/display/service1'
import cardView from '../../widgets/views/cardView'
import cardView2 from '../../widgets/views/cardView2'
import cardView3 from '../../widgets/views/cardView3'
export default {
    components: {
        mainView,
        cardView,
        cardView2,
        cardView3,
        display1,
    },
    computed:{
        card(){
            return this.$store.state.widget.card
        },
        card2(){
            return this.$store.state.widget.card2
        },
        card3(){
            return this.$store.state.widget.card3
        }
    }
}
</script>

<style>

</style>