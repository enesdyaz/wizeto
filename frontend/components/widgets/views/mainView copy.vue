<template>
<div style='padding: 5%;'>
<!-- test -->








<!-- test -->


    <v-row justify="center">
        <v-btn :color="bgColor ? bgColor : 'primary' " dark @click.stop="dialog = true" small >
        bg color
        </v-btn>

        <v-dialog v-model="dialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Color Picker</v-card-title>

                <v-card-text>
                    <div>
                        <v-color-picker v-model='bgColor'  mode="hexa" dot-size="25" hide-canvas show-swatches swatches-max-height="300" ></v-color-picker>
                    </div>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                    Disagree
                </v-btn>

                <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                >
                    Agree
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
<!-- font color -->
          <v-btn style='border: 1px solid grey' class='ml-2' :color="fontColor ? fontColor : 'primary'" outlined dark @click.stop="fontDialog = true" small >
        Font color
        </v-btn>

        <v-dialog v-model="fontDialog" max-width="290">
            <v-card>
                <v-card-title class="headline">Color Picker</v-card-title>

                <v-card-text>
                    <div>
                        <v-color-picker v-model='fontColor' mode="hexa" dot-size="25" hide-canvas show-swatches swatches-max-height="300" ></v-color-picker>
                    </div>
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="green darken-1" text @click="fontDialog = false"> Disagree </v-btn>
                <v-btn color="green darken-1" text @click="fontDialog = false" > Agree </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row><br>


 
<!-- mainView -->

    <div class='mainDiv-1' style='background-size: cover; background-position: center;' :style="{backgroundColor: bgColor, color: fontColor, background: 'url(' + mainData.backgroundImage + ')' } ">
        <div style='background: rgba(0,0,0,0.6);'>
            <div class='logoDiv' >
                <span><v-icon :style="{color: fontColor ? fontColor : 'white' }" style='font-size: 1rem; margin: 5px; '>mdi-cube-outline</v-icon></span>
                {{mainData.logoName}}
            </div>

            <div class='titleDiv title text-center' >
                {{mainData.title}}
            </div>
            <div class='subtitleDiv subtitle-2 pt-3' >
                {{mainData.subtitle}}
            </div>
            <div v-if='mainData.buttonName' class='buttonDiv text-center'>
                <v-btn  :color='fontColor' dark ><span :style='{color: bgColor}'>{{mainData.buttonName}}</span></v-btn>
            </div>
            <div class='descriptionDiv'>
                {{mainData.description}}
            </div>
        </div>
    </div>






</div>

</template>


<style lang="scss" scoped>

.mainDiv-1{
    width: 100%;
    background-color: #607D8bFF !important; 
    color: white;

    .logoDiv{
    display: inline-block;
    margin-bottom: 4vh;
    }
    .titleDiv{
        font-weight: 900;
        width: 90%;
        margin: 0 auto;
    }
    .subtitleDiv{
        text-align: center;
        width: 80%;
        font-weight: 500; 
        margin: 0 auto;
        line-height: 15px;
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
    methods:{
        onChangeBgColor(){
            console.log('onchange')
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



