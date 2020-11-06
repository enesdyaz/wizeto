<template>
<div>
    <div style='padding: 5%;'>
        <form @submit.prevent='onSubmit'>     
            <table  style='width: 100%;'>
                <tr>
                    <th><v-icon class='vIcon'>mdi-chevron-down</v-icon>Title</th> 
                    <td ><input  v-model='title'  type="text" /></td>
                </tr>
                <tr>
                    <th><v-icon class='vIcon'>mdi-chevron-down</v-icon>Subtitle</th> 
                    <td ><input  v-model='subtitle' type="text"  /></td>
                </tr>
            </table>
        </form>
    </div>

<!-- add menu form -->
    <br><br>
    <div style='border: 1px solid grey'>
            <v-btn-toggle dense group>
    <!-- font size -->
                <v-menu :close-on-content-click="true" :nudge-width="250" offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn  v-bind="attrs" v-on="on">
                            <v-icon>mdi-format-size</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>
                            <div>
                                <span style='float: left;margin-top: 5px;' v-text='sliderFont + "px"'></span>
                                <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderFont"  min='14' max='30' step="2" ></v-slider>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>
    <!-- padding -->
                <v-menu :close-on-content-click="true" :nudge-width="250" offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn  v-bind="attrs" v-on="on">
                            <v-icon>mdi-fit-to-page</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>
                            <div>
                                <span style='float: left;margin-top: 5px;' v-text='sliderPadding + "%"'></span>
                                <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderPadding" min='0' max='20' step="2" ></v-slider>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-btn-toggle>
<!-- Text Align -->  
            <v-btn-toggle class='body-2' dense group v-model='textAlign'>
                <v-btn>
                    <v-icon style='font-size: 1.2rem;'>mdi-format-align-left</v-icon>
                </v-btn>
                <v-btn>
                    <v-icon style='font-size: 1.2rem;'>mdi-format-align-center</v-icon>
                </v-btn>
                <v-btn>
                    <v-icon style='font-size: 1.2rem;'>mdi-format-align-right</v-icon>
                </v-btn>
            </v-btn-toggle>

    <!-- background color -->        
            <v-btn-toggle class='body-2' dense group>
                <v-menu v-model="menuBackground" :close-on-content-click="true" :nudge-width="200" offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn  v-bind="attrs" v-on="on" >
                            <v-icon>mdi-alpha-a-box</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>
                            <v-chip-group v-model='bgArray' column dense>
                                <v-chip  :style="{width: '25px', height: '25px', backgroundColor:tag} "   v-for="tag in tags" :key="tag"></v-chip>
                            </v-chip-group>
                        </v-card-text>
                    </v-card>
                </v-menu>

<!-- font color -->   
                <v-menu v-model="menuFont" :close-on-content-click="true" :nudge-width="200" offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn  v-bind="attrs" v-on="on">
                            <v-icon>mdi-alpha-a</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>
                            <v-chip-group v-model='fontArray' column dense>
                                <v-chip  :style="{width: '25px', height: '25px', backgroundColor:tag} "   v-for="tag in tags" :key="tag"></v-chip>
                            </v-chip-group>
                        </v-card-text>
                    </v-card>
                </v-menu>

            </v-btn-toggle>
    </div>
    <br>


<!-- card view UI exxample-->
    <div>
        <div class='ui-basic' :style="{padding: paddingTitle, textAlign: textAlignUi, 
        backgroundColor: colorNumber(bgArray), color: colorNumber(fontArray)}" >
            <!-- <div class='ui-image' ><v-img :src='data.backgroundImage'></v-img></div> -->
            <div class='ui-title' :style="{fontSize: fontTitle}" >{{title.toUpperCase()}}</div>
            <div class='ui-subtitle' :style="{fontSize: fontSubtitle}" >{{subtitle}}</div>
        </div>
    </div>

<!-- save --> 
<br><br><br><br>
    <div class='text-center'>
        <v-dialog v-model="dialog" width="500" >
            <template v-slot:activator="{ on, attrs }">
                <v-btn color='blue-grey lighten-3' small dark v-bind="attrs" v-on="on" > remove </v-btn>
            </template>

            <v-card>
                <v-card-title class='body-2' style='font-weight: 300'>
                    Do you really want to remove this card?
                </v-card-title>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey" text small @click="dialog = false" > Cancel </v-btn>
                <v-btn color="blue-grey" text small @click="onRemove" > Confirm </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>

        <v-btn color='blue-grey' small dark @click='onSubmit'>SAVE it</v-btn>

        <v-snackbar color='blue-grey' top small v-model="snackbar" :timeout="timeout" >
            <div style='text-align: center;'>
                <v-icon>mdi-emoticon-happy-outline</v-icon> This card is saved safely.
            </div>
        </v-snackbar>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            title: '',
            subtitle: '',
            addOn: false,
            menuFont: false,
            menuBackground: false,

            // design
            textAlign: '',
            tags: [ 'whitesmoke', '#000000', '#455a64', '#e64a19', '#5d4037', '#616161', '#1b5e20', '#827717', '#01579b', '#004d40', '#1a237e', '#311b92', '#b71c1c', '#7b1fa2', '#c2185b'],        
            bgArray: '',
            fontArray: '',
            sliderFont: '18',
            sliderPadding: '4',
            storeFont: '',
            storeBg: '',

            //dialog
            dialog: false,
            snackbar: false,
            timeout: 3000,
        }
    },

    methods:{
        onSubmit(){
            this.$store.dispatch('widget/addCard2', {
                title: this.title,
                subtitle: this.subtitle,
                addOn: true,
                textAlign: this.textAlign,
                tags: this.tags,
                bgArray: this.bgArray,
                fontArray: this.fontArray,
                sliderFont: this.sliderFont,
                sliderPadding: this.sliderPadding
            }).then(()=>{this.snackbar = true})
        },
        onRemove(){
                this.$store.dispatch('widget/removeCard2', false)

                this.title=''
                this.subtitle=''
                this.addOn=false
                this.textAlign=''
                this.bgArray= ''
                this.fontArray= ''
                this.sliderFont= '18'
                this.sliderPadding= '4'
                this.dialog = false
        },
        colorNumber(array){
            const tags = this.tags
            const res = tags[array]
            return res
        }
    },

    computed:{
        electUi(){
        const items = ['ui-basic','ui-expand','ui-right', 'ui-top']
        let select = items[this.select]
        return select
        },
        textAlignUi(){
        const items = ['left', 'center', 'right']
        let select = items[this.textAlign]
        return select
        },


        backgroundColorSelect(){
        const items = this.tags
        let select = items[this.bgArray]
        return select
        },
        fontColorSelect(){
        const items = this.tags
        let select = items[this.fontArray]
        return select
        },

        fontTitle(){
            return this.sliderFont + "px"
        },
        fontSubtitle(){
            return (this.sliderFont - 7) + "px"
        },
        paddingTitle(){
            return this.sliderPadding + "%"
        }
    },

    created(){
    const data = this.$store.state.widget.card2
    console.log(data)
        if(data.length !== 0){
            this.title =  data.title
            this.subtitle =  data.subtitle
            this.addOn = data.addOn
            this.textAlign= data.textAlign
            this.bgArray = data.bgArray
            this.fontArray = data.fontArray
            this.sliderFont= data.sliderFont
            this.sliderPadding= data.sliderPadding
            }else{
                console.log('no data length')
            }
    },


}
</script>


<style lang="scss" scoped>
table{  
    tr{ 
        th{ font-size: 0.8rem; font-weight: 300;  width: 30%;}
        td{ padding: 1px; width: 60%;}
    }
}
.vIcon{
    font-size: 1rem;
    font-weight: 200;
}
input{ width: 100%; padding-left: 5px;  font-size: 0.8rem; font-weight: 300; border: 1px solid grey; border-radius: 5px;  }
textarea{ width: 100%; border: 1px solid grey; border-radius: 5px; font-size: 0.8rem; font-weight: 300; padding-left: 5px;}


// UI - BAISC
.ui-basic{
    border: 1px solid rgb(211, 211, 211);
    .ui-title{
        margin-top: 15px;
        font-weight: 700;
        margin-bottom: 10px;
    }
    .ui-subtitle{
        font-weight: 300;
        margin-bottom: 15px;
    }
}
</style>