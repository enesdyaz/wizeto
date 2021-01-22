<template>
<div>
    <div style='padding: 5%;'>
        <form @submit.prevent='onSubmit'>
            <table  style='width: 100%;' >
                <tr>
                    <th class='caption blue-grey--text font-weight-bold'><v-icon class='vIcon'>mdi-chevron-right</v-icon>LOGO NAME</th> 
                    <td><input  v-model='logo'  type="text" ></td>
                </tr>
                <tr>
                    <th class='caption blue-grey--text font-weight-bold'><v-icon class='vIcon'>mdi-chevron-right</v-icon>TITLE</th> 
                    <td ><input  v-model='title'  type="text" /></td>
                </tr>
                <tr>
                    <th class='caption blue-grey--text font-weight-bold'><v-icon class='vIcon'>mdi-chevron-right</v-icon>SUBTITLE</th> 
                    <td ><input  v-model='subtitle'  type="text"  /></td>
                </tr>
                <tr>
                    <th class='caption blue-grey--text font-weight-bold'><v-icon class='vIcon'>mdi-chevron-right</v-icon>BUTTON NAME</th> 
                    <td ><input  v-model='buttonName'  type="text"  /></td>
                </tr>
                <tr>
                    <th class='caption blue-grey--text font-weight-bold'><v-icon class='vIcon'>mdi-chevron-right</v-icon>DESCRIPTION</th> 
                    <td ><textarea  v-model='description'  type="text" ></textarea></td>
                </tr>
                <tr>
                    <th class='caption blue-grey--text font-weight-bold'><v-icon class='vIcon'>mdi-chevron-right</v-icon>BG IMAGE</th> 
                    <td  v-if='!backgroundImage'>  
                        <input  style='border: none;padding: 0;' type="file" @change='onFileChange'>
                    </td>

                    <td v-else>
                        <img style='width: 150px;' :src="`http://localhost:3085/cards/${backgroundImage}`" />
                        <button @click="removeImage" style='padding-left: 10px'>Remove image</button>
                    </td>   
                </tr><br>
            </table>
        </form>
    </div>

<!-- design layout -->

<!-- add menu form -->
    <br>
    <div style='border: 1px solid grey; text-align: center;'>
            <v-btn-toggle dense  group>
    <!-- font size -->
                <v-menu :close-on-content-click="true" :nudge-width="250" offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;'>
                            <v-icon>mdi-format-size</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>
                            <div>
                                <span style='float: left;margin-top: 5px;' v-text='sliderFont + "px"'></span>
                                <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderFont"  min='20' max='50' step="2" ></v-slider>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>
    <!-- padding -->
                <v-menu :close-on-content-click="true" :nudge-width="250" offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;'>
                            <v-icon>mdi-fit-to-page</v-icon>
                        </v-btn>
                    </template>

                    <v-card>
                        <v-card-text>
                            <div>
                                <span style='float: left;margin-top: 5px;' v-text='sliderPadding + "%"'></span>
                                <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderPadding" min='2' max='20' step="2" ></v-slider>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>
            </v-btn-toggle>
<!-- Text Align -->  
            <v-btn-toggle class='body-2' dense group v-model='textAlign'>
                <v-btn small style='padding: 5px;'>
                    <v-icon style='font-size: 1.2rem;'>mdi-format-align-left</v-icon>
                </v-btn>
                <v-btn small style='padding: 5px;'>
                    <v-icon style='font-size: 1.2rem;'>mdi-format-align-center</v-icon>
                </v-btn>
                <v-btn small style='padding: 5px;' >
                    <v-icon style='font-size: 1.2rem;'>mdi-format-align-right</v-icon>
                </v-btn>
            </v-btn-toggle>

    <!-- background color -->        
            <v-btn-toggle  class='body-2' dense group >
                <v-menu  v-model="menuBackground" :close-on-content-click="true" :max-width="200" bottom >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;;' >
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
                <v-menu v-model="menuFont" :close-on-content-click="true" :max-width="200" bottom left  offset-x >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;;'>
                            <v-icon >mdi-alpha-a</v-icon>
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
<!-- button color -->
        <v-menu v-model="menuButton" :close-on-content-click="true" :max-width="200" bottom left >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;'>
                        <v-icon>mdi-alpha-b-box</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-text>
                        <v-chip-group v-model='buttonArray' column dense>
                            <v-chip  :style="{width: '25px', height: '25px', backgroundColor:tag} "   v-for="tag in tags" :key="tag"></v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
        </v-menu>
<!-- image opacity -->
        <v-menu :close-on-content-click="true" :nudge-width="250" offset-x >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;'>
                        <v-icon style='font-size: 1.3rem;'>mdi-invert-colors</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-text>
                        <div>
                            <span style='float: left;margin-top: 5px;' v-text='sliderOpacity'></span>
                            <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderOpacity" min='0' max='1' step="0.1" ></v-slider>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
<!-- line height -->
            <v-menu :close-on-content-click="true" :nudge-width="250" offset-x >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn small v-bind="attrs" v-on="on" style='padding: 5px;'>
                        <v-icon style='font-size: 1.4rem;'>mdi-format-line-spacing</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-text>
                        <div>
                            <span style='float: left;margin-top: 5px;' v-text='sliderLineHeight'></span>
                            <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderLineHeight" min='10' max='200' step="10" ></v-slider>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
            </v-btn-toggle>
    </div>
    <br>

<!-- mainView -->    
    <div :style="{textAlign: textAlignUi, color: colorNumber(fontArray)}">
        <div class='mainDiv-1' :style="{backgroundColor: colorNumber(bgArray), lineHeight: sliderLineHeightValue, color: colorNumber(fontArray), backgroundImage: 'url(http://localhost:3085/cards/' + backgroundImage + ')', } " >
            <div :style="{background: sliderOpacityValue}">
                <div :style="{ padding: sliderPaddingValue }">
                    <div class='logoDiv' :style="{fontSize: sliderFontLogo}">
                        {{logo}}
                    </div>
                    <div class='titleDiv' :style="{fontSize: sliderFontTitle}">
                        {{title.toUpperCase()}}
                    </div>
                    <div class='subtitleDiv' :style="{fontSize: sliderFontSubtitle}">
                        {{subtitle}}
                    </div>
                    <div v-if='buttonName' class='buttonDiv'>
                        <v-btn :color='colorNumber(buttonArray)' dark >{{buttonName}}</v-btn>
                    </div>
                    <div class='descriptionDiv' :style="{fontSize: sliderFontDescription}">
                        {{description}}
                    </div>
                </div>
            </div>
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
        <span v-if='!editToggle'><v-btn color='blue-grey' small dark @click='onSubmit'>SAVE</v-btn></span>
        <span v-else><v-btn color='blue-grey' small dark @click='onUpdate'>UPDATE</v-btn></span>

        <v-snackbar color='blue-grey' top small v-model="snackbar" :timeout="timeout" >
            <div style='text-align: center;'>
                <v-icon>mdi-emoticon-happy-outline</v-icon> This card is saved safely.
            </div>
        </v-snackbar>
        
    </div>




    <!-- bottom menu block -->
    <div style='height: 5vh;'>

    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            // store 
            logo: '',
            title: '',
            subtitle: '',
            buttonName: '',
            description: '',
            addOn: false,
            backgroundImage: '',

            textAlign: "",
            tags: [ '#ffffff', '#000000', '#455a64', '#e64a19', '#5d4037', '#616161', '#1b5e20', '#827717', '#01579b', '#004d40', '#1a237e', '#311b92', '#b71c1c', '#7b1fa2', '#c2185b'],        
            bgArray: '',
            fontArray: '',
            buttonArray: '', //button color
            sliderFont: 20,
            sliderPadding: 2,
            sliderOpacity: "",
            sliderLineHeight: 10,

            // dialog
            dialog: false,
            snackbar: false,
            timeout: 3000,
            editToggle: false,
            // template popup
            menuFont: false,  
            menuBackground: false,
            menuButton: false,
        }
    },

    methods:{
        onUpdate(){
            this.$store.dispatch('cards/updateCards', {
                page: 5,
                logo: this.logo,
                title: this.title,
                subtitle: this.subtitle,
                buttonName: this.buttonName,
                description: this.description,
                addOn: true,
                tags: this.tags,
                textAlign: this.textAlign,

                bgArray: this.bgArray,
                fontArray: this.fontArray,
                buttonArray: this.buttonArray,
                sliderFont: this.sliderFont,
                sliderPadding: this.sliderPadding,
                sliderOpacity: this.sliderOpacity,
                sliderLineHeight: this.sliderLineHeight,
                backgroundImage: this.imagePath

            }).then(()=>{
                this.snackbar = true
                this.editToggle = true
                }).catch(()=>{console.log('form input error')})
        },

        onSubmit(){
            this.$store.dispatch('cards/addCards', {
                page: 5,
                logo: this.logo,
                title: this.title,
                subtitle: this.subtitle,
                buttonName: this.buttonName,
                description: this.description,
                addOn: true,
                tags: this.tags,
                textAlign: this.textAlign,
                bgArray: this.bgArray,
                fontArray: this.fontArray,
                buttonArray: this.buttonArray,
                sliderFont: this.sliderFont,
                sliderPadding: this.sliderPadding,
                sliderOpacity: this.sliderOpacity,
                sliderLineHeight: this.sliderLineHeight,
                backgroundImage: this.imagePath

            }).then(()=>{
                this.snackbar = true
                this.editToggle = true
                }).catch(()=>{console.log('form input error')})
        },

        onRemove(){
                    this.logo=''
                    this.title= ''
                    this.subtitle= ''
                    this.buttonName= ''
                    this.description= ''
                    this.addOn= false
                    this.backgroundImage= ''
                    this.textAlign= ''
                    this.bgArray= ''
                    this.fontArray= ''
                    this.buttonArray= ''
                    this.sliderFont= ''
                    this.sliderPadding= ''
                    this.sliderOpacity= ''
                    this.sliderLineHeight= ''
                    this.dialog=false
                    this.editToggle = false
                this.$store.dispatch('cards/removeCards', 5).then(()=>{
                    
                }).catch(()=>{console.log('onRemove error')})

        },

        //image
        onFileChange(e) {
            console.log(e.target.files) 
            var imageFormData = new FormData();
            
            [].forEach.call(e.target.files, (f)=>{
                imageFormData.append('image', f)    // { image: [file1, file2]}
            }) 
            this.$store.dispatch('cards/uploadImages', imageFormData)
        },

        
        removeImage: function (e) {
            console.log('removeImage')
            this.$store.commit('cards/REMOVE_IMAGE')
            this.backgroundImage = '';
        }, 
        // image_end
        colorNumber(array){
            const tags = this.tags
            const res = tags[array]
            return res
        },
        fetchCard(){

            const data = this.$store.state.cards.cardData
            const index = data.findIndex(e=>e.page === 5)
            if(index === -1){ 
                return 
            }else{
                    this.editToggle = true

                    const index = data.findIndex(e=>e.page === 5)

                    this.logo= data[index].logo
                    this.title =  data[index].title
                    this.subtitle =  data[index].subtitle
                    this.buttonName= data[index].buttonName
                    this.description = data[index].description
                    this.addOn = data[index].addOn
                    this.backgroundImage = data[index].backgroundImage

                    this.textAlign= data[index].textAlign
                    this.bgArray= data[index].bgArray
                    this.fontArray= data[index].fontArray
                    this.buttonArray= data[index].buttonArray
                    this.sliderFont= data[index].sliderFont
                    this.sliderPadding= data[index].sliderPadding
                    this.sliderOpacity= data[index].sliderOpacity
                    this.sliderLineHeight= data[index].sliderLineHeight

            }
        },
    },


    created(){
        this.fetchCard()
    },
    watch:{
        imagePath(){
            console.log('imagePath WATCH')
            console.log('imagePath content', this.imagePath)
            this.backgroundImage = this.imagePath
        }
    },
    computed:{
        imagePath(){
            console.log('imagePath COMPUTED')
                return this.$store.state.cards.imagePaths[0]
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
        
        sliderFontTitle(){
            return this.sliderFont + "px"
        },
        sliderFontSubtitle(){
            return (this.sliderFont - 5) + "px"
        },
        sliderFontLogo(){
            return (this.sliderFont - 9 ) + "px"
        },
        sliderFontDescription(){
            return (this.sliderFont - 10) + "px"
        },

        sliderPaddingValue(){
            return this.sliderPadding + "%"
        },
        sliderOpacityValue(){
            return "rgba(0,0,0,"+ this.sliderOpacity+")"
        },
        sliderLineHeightValue(){
            return this.sliderLineHeight + "px"
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
    color: #607d8a;
}
input{width: 100%; padding-left: 12px;}
// input{ width: 100%; padding-left: 5px;  font-size: 0.8rem; font-weight: 300; border: 1px solid grey; border-radius: 5px;  }
// textarea{ width: 100%; border-radius: 5px; font-size: 0.8rem; font-weight: 300; padding-left: 5px;}
textarea{ width: 100%; border-radius: 5px; padding-left: 12px; border: 2px solid #ccc;border-radius: 5px; transition: 0.5s}
textarea:focus{
    border: 2px solid #455a64;
    background: white; border-radius: 5px; 
}
textarea:hover{
    border: 2px solid #455a64;
    background: white; border-radius: 5px;
}


.mainDiv-1{
    border: 1px solid rgb(211, 211, 211);

    // background-color: #6E7881; 
    // color: white;
    background-position: center;  
    background-size: cover !important;
    word-wrap:break-word;

    .logoDiv{
    display: inline-block;
    font-weight: 200;
    width: 50%;
    }
    .titleDiv{
        font-weight: 800;
        font-size: 2rem;
        display: inline-block;
        width: 80%;
        line-height: 140%;
        
    }
    .subtitleDiv{
        display: inline-block;
        font-size: 1.2rem;
        font-weight: 300; 
        width: 90%;
        line-height: 120%;
    }
    .buttonDiv{
        margin-top: 30px;
    }
    .descriptionDiv{
        margin-top: 15px;
        display: inline-block;
        font-weight: 200;
        font-size: 0.8rem;
        width: 80%;
        line-height: 100%;
    }
}

</style>

