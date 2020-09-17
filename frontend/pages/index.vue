<template>
  <div>
      <div :class='{active: !isActive}' class='leftBox'>a</div>
      <div :class='{active: isActive}' class='rightBox'>b</div>
      <div class='bottomNavigation d-sm-none'>
          <div class='bottomAdmin'><v-btn text @click='admin'>ADMIN</v-btn> </div>
          <div class='bottomView'><v-btn text @click='view' > VIEW</v-btn></div>
      </div>
  </div>
</template>

<script>
export default {
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

@media only screen and (max-width: 600px) {
  body {
    background-color: lightblue;
  }
  .active{
  display: none;
  }
}


.leftBox{
  width: 50%;
  float: left;
}
.rightBox{
  width: 50%;
  float: left;
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


</style>