<template>
<div>
  
    <v-toolbar dense>
        <v-btn class='body-2' text> Layout </v-btn>
      <v-btn-toggle v-model="select" dense group>
          <v-btn>
            <v-icon>mdi-dock-bottom</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-fit-to-page</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-dock-right</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-dock-bottom</v-icon>
          </v-btn>
    </v-btn-toggle>

    <v-btn-toggle class='body-2' dense group v-model='textAlign'>
      <v-btn>
        <v-icon style='font-size: 1.4rem;'>mdi-format-align-left</v-icon>
      </v-btn>
      <v-btn>
        <v-icon style='font-size: 1.4rem;'>mdi-format-align-center</v-icon>
      </v-btn>
    </v-btn-toggle>
    </v-toolbar>
    <br>
    
      
    <div :class='selectUi' :style="{textAlign: textAlignUi}" style='padding: 5%; background: #ffebee'>
        <div class='ui-image' ><v-img src='/pexels-andrea-piacquadio-3807386.jpg'></v-img></div>
        <div class='ui-title'>TITLE NAME</div>
        <div class='ui-subtitle'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, aliquam harum consectetur dolor debitis eos porro vero minus pariatur molestias dolorem beatae iure nesciunt commodi sit. Voluptate quos officia molestias.</div>
    </div>


  


</div>
</template>

<script>
export default {
  data(){
    return{
      select: '',
      textAlign: ''
    }
  },
  computed:{
    selectUi(){
      const items = ['ui-bottom','ui-left','ui-right', 'ui-top']
      let select = items[this.select]
      return select
    },
    textAlignUi(){
      const items = ['left', 'center']
      let select = items[this.textAlign]
      return select
    }
  }
}
</script>


<style lang="scss" scoped>
.textCenter{text-align: center;}
.textLeft{text-align: left;}
.ui-bottom{
  .ui-image{
    color: red;
  }
  .ui-title{
      margin-top: 20px;
      padding-left: 3%;
      font-size: 1.2rem;
      font-weight: 600;
  }
  .ui-subtitle{
      margin-top: 20px;
      padding-left: 3%;
      font-size: 1rem;
      font-weight: 300;
      margin-bottom: 20px;
  }
}

.ui-left{ 
  .ui-image{float: left;width: 50%;}
  .ui-title{float: left; width: 49%;padding-left: 5px;}
  .ui-subtitle{ padding-left: 5px; clear: both;}
}

.ui-right{
  .ui-image{color: green;}
  .ui-title{color: green;}
  .ui-subtitle{color: green;}
}

.ui-top{
  .ui-image{color: black;}
  .ui-title{color: black;}
  .ui-subtitle{color: black;}
}


</style>
