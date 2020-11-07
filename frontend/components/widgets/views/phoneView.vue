<template>
<div>
    <draggable v-model="component" @change='onChange'>
        <div v-for="(item, index) in component" :key="index">
            <!-- <div class="handle" style='cursor: all-scroll;positon: absolute; top: 10px;'><v-icon class='contentHeightChild' >mdi-format-align-justify</v-icon></div> -->
            <div class='handle' style='cursor: all-scroll'><component  v-bind:is='item'></component></div>
        </div>
    </draggable>



</div>
</template>

<script>
import draggable from 'vuedraggable'
import mainView from '../../widgets/views/mainView'
import display1 from '../../../pages/display/service1'
import cardView from '../../widgets/views/cardView'
import cardView2 from '../../widgets/views/cardView2'
import cardView3 from '../../widgets/views/cardView3'
export default {
    data(){
        return{
            component: ['mainView', 'cardView', 'cardView2', 'cardView3', 'display1'],

        }
    },
    methods:{
        onChange(){
            this.$store.dispatch('phoneView/changeView', this.component)
        }
    },
    components: {
        mainView,
        cardView,
        cardView2,
        cardView3,
        display1,
        draggable,
    },
    created(){
        const data = this.$store.state.phoneView.view
        console.log(data)
        if(data.length !== 0){
            this.component =  data
            }else{
                console.log('no data length')
            }
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

<style lang="scss" scoped>

</style>