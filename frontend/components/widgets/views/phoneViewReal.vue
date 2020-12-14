<template>
<div style='position: relative; z-index: 1'>
<!-- menu -->
    <div style='display: flex; z-index: 1; position: absolute; top: 0; height: 30px; line-height: 30px; width: 100%; background: whitesmoke;'>   
        <div>
                <v-btn text x-small  dark  @click='drawer = !drawer'>
                    <v-icon style='color: #263238'>mdi-equal</v-icon>
                </v-btn>
        </div>
        <v-spacer></v-spacer>
        <div>
            wizeto
        </div>
        <v-spacer></v-spacer>
        <div>
            <div style="width: 20px;"></div>
        </div>
    </div>
    
    <div style='height: 30px;'>

    </div>


    <v-navigation-drawer style='z-index: 1;' dark v-model="drawer" absolute temporary width='70%' height='100vh'>
        <v-list-item>

            <v-list-item-content>
            <v-list-item-title>Harry</v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>

            <v-list-item>
                <v-list-item-icon>
                    <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title> Service</v-list-item-title>
                </v-list-item-content>
   
            </v-list-item>
        </v-list>
    </v-navigation-drawer>


<!-- draggable -->
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
import mainView2 from '../../widgets/views/mainView2'
import mainView3 from '../../widgets/views/mainView3'
import mainView4 from '../../widgets/views/mainView4'
import mainView5 from '../../widgets/views/mainView5'

import display1 from '../../../pages/display/service1'
import cardView from '../../widgets/views/cardView'
import cardView2 from '../../widgets/views/cardView2'
import cardView3 from '../../widgets/views/cardView3'
export default {
    data(){
        return{
            component: ['mainView', 'mainView2', 'mainView3', 'mainView4', 'mainView5', 'cardView', 'cardView2', 'cardView3', 'display1'],
            drawer: false,
            group: null,

        }
    },
    methods:{
        onChange(){
            this.$store.dispatch('phoneView/changeView', this.component)
        }
    },
    components: {
        mainView,
        mainView2,
        mainView3,
        mainView4,
        mainView5,
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