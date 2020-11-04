<template>
<div>
     <v-row justify="center">
        <v-btn :color="bgColor ? bgColor : 'primary' " dark @click.stop="dialog = true" small > bg color </v-btn>
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
                <v-btn color="green darken-1" text @click="dialog = false" >Disagree</v-btn>
                <v-btn color="green darken-1" text @click="dialog = false" > Agree </v-btn>
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
</div>
</template>

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

<style>

</style>