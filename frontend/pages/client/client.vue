<template>
<div class='body'>
<!-- top_bar -->
  <v-card flat class="cardView"  >
        <v-app-bar style='absolute: fixed' :style="{color: companyInfo.fontColor, backgroundColor: companyInfo.backgroundColor}" flat tile height='30' dense dark >
              <v-icon :style="{color: companyInfo.fontColor}" style='font-size: 1rem;padding-right: 4px;'>mdi-drag</v-icon>
            <v-toolbar-title :style="{color: companyInfo.fontColor}" style='font-size: 0.8rem;'> {{companyInfo.companyName}} </v-toolbar-title>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon :style="{color: companyInfo.fontColor}">mdi-magnify</v-icon>
              </v-btn>

              <v-app-bar-nav-icon :style="{color: companyInfo.fontColor}" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" absolute right temporary>
            <v-list nav dense >
              <v-list-item-group v-model="group" active-class="deep-purple--text text--accent-4">
                <v-list-item>
                  <v-list-item-title><v-btn text small to='/product'> Product</v-btn></v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Bar</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Fizz</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>Buzz</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
      </v-navigation-drawer>


<!-- contents -->


            <draggable v-model="component"  :options="{animation:300, handle:'.handle'}">
                <div class='contentHeight' v-for="(item, index) in component" :key="index">
                  <span class="handle" style='cursor: all-scroll'><v-icon class='contentHeightChild' >mdi-format-align-justify</v-icon></span>
                  
                  <div><keep-alive><component  v-bind:is='item'></component></keep-alive></div>
                </div>
            </draggable>
        
  </v-card>


</div>        
</template>

<script>


import draggable from 'vuedraggable';

  export default {
    layout:'landing',
    components:{


      draggable
    },

    computed:{
      companyInfo(){
        return this.$store.state.company.companyInfo
      }
    },


    layout: 'Landing',

    data: () => ({
      drawer: false,
      group: null,
      component: ['CompanyContent', 'CategoryView', 'CarouselView', 'CompanyDetailView', 'ParallaxView', ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>


<style lang="scss" scoped>


.contentHeight{
  position: relative;

  .contentHeightChild{
    font-size: .9rem;
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 10;
    color: #4a148c;
  }
}

</style>
