<template>
<div>
<!-- mainView -->
    <div v-if='mainData.backgroundImage' class='mainDiv-1' :style="{background: 'url(' + mainData.backgroundImage + ')'} ">
        <div style='background: rgba(0,0,0,0.6);'>
            <div class='logoDiv' >
                <span><v-icon :style="{color: fontColor ? fontColor : 'white' }" style='font-size: 1rem; margin: 5px; '>mdi-cube-outline</v-icon></span>
                {{mainData.logoName}}
            </div>
            <div class='titleDiv text-center' >
                {{mainData.title}}
            </div>
            <div class='subtitleDiv pt-3' >
                {{mainData.subtitle}}
            </div>
            <div v-if='mainData.buttonName' class='buttonDiv text-center'>
                <v-btn  color='indigo darken-1' dark ><span :style='{color: bgColor}'>{{mainData.buttonName}}</span></v-btn>
            </div>
            <div class='descriptionDiv'>
                {{mainData.description}}
            </div>
        </div>
    </div>

    <div v-else class='mainDiv-1' >
        <div class='logoDiv' >
            <span><v-icon :style="{color: fontColor ? fontColor : 'white' }" style='font-size: 1rem; margin: 5px; '>mdi-cube-outline</v-icon></span>
            {{mainData.logoName}}
        </div>
        <div class='titleDiv  text-center' >
            {{mainData.title}}
        </div>
        <div class='subtitleDiv pt-3' >
            {{mainData.subtitle}}
        </div>
        <div v-if='mainData.buttonName' class='buttonDiv text-center'>
            <v-btn color='black' dark ><span>{{mainData.buttonName}}</span></v-btn>
        </div>
        <div class='descriptionDiv'>
            {{mainData.description}}
        </div>
    </div>

</div>

</template>


<style lang="scss" scoped>

.mainDiv-1{
    width: 100%;
    background-color: #6E7881; 
    color: white;
    background-position: center;  
    background-size: cover !important;

    .logoDiv{
    display: inline-block;
    margin-bottom: 4vh;
    }
    .titleDiv{
        font-weight: 900;
        width: 93%;
        margin: 0 auto;
        font-size: 2rem;
        margin-bottom: 2vh;
    }
    .subtitleDiv{
        font-size: 1.2rem;
        text-align: center;
        width: 80%;
        font-weight: 300; 
        margin: 0 auto;
        line-height: 20px;
        margin-bottom: 5vh;
    }
    .buttonDiv{
        margin-top: 5vh;
    }
    .descriptionDiv{
        margin: 0 auto;
        width: 80%;
        text-align: center;
        font-weight: 400;
        font-size: 0.7rem;
        margin-top: 3vh;
        padding-bottom: 4vh;
    }
}

</style>

<script>
export default {
    data(){
        return{
            dialog: false,
            fontDialog: false,
            bgColor: '',
            fontColor: '',
        }
    },

    computed:{
        mainData(){
            return this.$store.state.widget.main
        }
    },

    watch:{
        fontColor(newVal, oldVal){
            oldVal ? this.fontDialog = false : oldVal;
        },
        bgColor(newVal, oldVal){
            oldVal ? this.dialog = false : oldVal;
        }
    }
}
</script>



