<template>
  <div>
      <div :class='{active: !isActive}' class='leftBox' style='overflow:auto; height: 100vh;'>
          <div>
            lorem
          </div>
      </div>
      <div :class='{active: isActive}'  class='rightBox'>
        <v-row justify='center' class='d-none d-sm-flex v-row' >
          <v-col>
            <mobile-phone></mobile-phone>
          </v-col>
            
        </v-row>
        
      </div>
      <div class='bottomNavigation d-sm-none'>
          <div class='bottomAdmin'><v-btn text @click='admin'>ADMIN</v-btn> </div>
          <div class='bottomView'><v-btn text @click='view' > VIEW</v-btn></div>
      </div>
  </div>
</template>

<script>
import MobilePhone from '../../components/setup/MobileIphone'
export default {
  components: {
    MobilePhone,
  },
  layout: 'adminLayout',
  data() {
    return {
      isActive: true
    }
  },
  methods: {
    admin(){
      this.isActive = true;
    },
    view(){
      this.isActive = false
    }
  }
}
</script>

<style lang='scss' scoped>

.leftBox{
  width: 50%;
  float: left;
}

.rightBox{
  width: 50%;
  float: left;
  margin-top: 60px;
}



@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
  
  .active{
  display: none;
  }



  .bottomNavigation{
    position: fixed;
    bottom: 0;
    width: 100%;
    
    .bottomAdmin{
      float: left;
      width: 50%;
      border: 1px solid whitesmoke;
      text-align: center;
    }
    .bottomView{
    @extend .bottomAdmin
    }
  }
}


</style>