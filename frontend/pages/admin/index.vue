<template>
<div style='position: relative; z-index: 1;'>
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
            <v-list-item  class='tile' active-class='list_active' v-for="(item, i) in items" :key="i" :to="item.to" router exact dense >
                <v-list-item-action>
                    <v-icon class='icon' style='font-size: 1.2rem;  font-weight: 100;'>{{ item.icon }}</v-icon>
                </v-list-item-action>

                <v-list-item-content style='margin-left: -20px;'>
                    <v-list-item-title  class='list_title' v-text="item.title" />
                </v-list-item-content>
            </v-list-item>  <br>
        </v-list>
    </v-navigation-drawer>

    

<!-- draggable -->
    <draggable v-model="component" @change='onChange'>
        <div v-for="(item, index) in component" :key="index">
            <!-- <div class="handle" style='cursor: all-scroll;positon: absolute; top: 10px;'><v-icon class='contentHeightChild' >mdi-format-align-justify</v-icon></div> -->
            <div class='handle' style='cursor: all-scroll'><component  v-bind:is='item'></component></div>
        </div>
    </draggable>
    <div>
        
    </div>


</div>
</template>

<script>
import draggable from 'vuedraggable'

import serviceView from './serviceView/serviceView'
import serviceView2 from './serviceView/serviceView2'
import serviceView3 from './serviceView/serviceView3'
import cardView from './cardView/cardView'
export default {
    components: {
        draggable,
        cardView,
        serviceView,
        serviceView2,
        serviceView3,
    },
    data(){
        return{
            component: ['cardView', 'serviceView', 'serviceView2', 'serviceView3'],
            drawer: false,
            group: null,

            items: [
                {
                icon: 'mdi-view-dashboard',
                title: 'DashBoard',
                to: '/setup/dashboard'
                },
            ]

        }
    },
    methods:{
        onChange(){
            this.$store.dispatch('phoneView/changeView', this.component)
        }
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