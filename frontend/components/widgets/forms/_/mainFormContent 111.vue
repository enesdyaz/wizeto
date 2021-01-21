<template>
<div>
    <div style='padding: 5%;'>
        <form @submit.prevent='onSubmit'>cards:{{cards}}
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
                    <td  v-if="!cards?cards.backgroundImage:''">  
                        <input  style='border: none;padding: 0;' type="file" @change='onFileChange'>
                    </td>

                    <td v-else>
                        <img style='width: 150px;' :src="`http://localhost:3085/cards/${cards?cards.backgroundImage:''}`" />
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
                                <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderFont"  min='22' max='50' step="2" ></v-slider>
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
                                <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderPadding" min='0' max='20' step="2" ></v-slider>
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
                <v-menu  v-model="menuBackground" :close-on-content-click="true" :nudge-width="200" offset-x >
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
                <v-menu v-model="menuFont" :close-on-content-click="true" :nudge-width="200" offset-x >
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
        <v-menu v-model="menuButton" :close-on-content-click="true" :nudge-width="200" offset-x >
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
                            <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderOpacity" min='0.1' max='1' step="0.1" ></v-slider>
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
                            <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderLineHeight" min='20' max='200' step="10" ></v-slider>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
            </v-btn-toggle>
    </div>
    <br>

<!-- mainView -->    
    <div :style="{textAlign: textAlignUi, color: colorNumber(fontArray)}">
        <div class='mainDiv-1' :style="{backgroundColor: colorNumber(bgArray), lineHeight: sliderLineHeightValue, color: colorNumber(fontArray), backgroundImage: 'url(' + 'http://localhost:3085/cards/'+ cards?cards.backgroundImage:'' + ')', } " >
            <div :style="{background: sliderOpacityValue}">
                <div :style="{ padding: sliderPaddingValue }">
                    <div class='logoDiv' :style="{fontSize: sliderFontLogo}">
                        {{logo}}
                    </div>
                    <div class='titleDiv' :style="{fontSize: sliderFontTitle}">
                        {{title?title.toUpperCase():title}}
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

        <v-btn color='blue-grey' small dark @click='onSubmit'>SAVE it</v-btn>

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

            textAlign: 'left',
            tags: [ 'whitesmoke', '#000000', '#455a64', '#e64a19', '#5d4037', '#616161', '#1b5e20', '#827717', '#01579b', '#004d40', '#1a237e', '#311b92', '#b71c1c', '#7b1fa2', '#c2185b'],        
            bgArray: '',
            fontArray: '',
            buttonArray: '', //button color
            sliderFont: '22',
            sliderPadding: '0',
            sliderOpacity: '',
            sliderLineHeight: '',

            // dialog
            dialog: false,
            snackbar: false,
            timeout: 3000,
            // template popup
            menuFont: false,  
            menuBackground: false,
            menuButton: false,

            bgImage:'',
        }
    },

    methods:{
        onSubmit(){
            this.$store.dispatch('cards/addCards', {
                page: "1",
                logo: this.logo,
                title: this.title,
                subtitle: this.subtitle,
                buttonName: this.buttonName,
                description: this.description,
                addOn: true,
                textAlign: this.textAlign,
                bgArray: this.bgArray,
                fontArray: this.fontArray,
                buttonArray: this.buttonArray,
                sliderFont: this.sliderFont,
                sliderPadding: this.sliderPadding,
                sliderOpacity: this.sliderOpacity,
                sliderLineHeight: this.sliderLineHeight,
                // backgroundImage: this.cards?this.cards.backgroundImage:""

            }).then(()=>{this.snackbar = true}).catch(()=>{console.log('form input error')})
        },

        onRemove(){
                this.$store.dispatch('cards/removeCards', false).then(()=>{
                    this.logo=''
                    this.title= ''
                    this.subtitle= ''
                    this.buttonName= ''
                    this.description= ''
                    this.addOn= false

                    this.textAlign= ''
                    this.bgArray= ''
                    this.fontArray= ''
                    this.buttonArray= ''
                    this.sliderFont= ''
                    this.sliderPadding= ''
                    this.sliderOpacity= ''
                    this.sliderLineHeight= ''
                }).catch(()=>{console.log('onRemove error')})

        },

        //image
        onFileChange(e) {
            let i = 0
            e.target.files.forEach(e=> i = i + e.size) 

            if(i>3000000){   // 3Mb
                console.log(i)
                this.message = 'Please upload less than 3 Mb'
                this.snackbar = true 
            }else{
                // backend 에서 사용
                const imageFormData = new FormData();
                [].forEach.call(e.target.files, (f) => {
                imageFormData.append('image', f);   // { image: [file1, file2] }
                });
                console.log(imageFormData)
                this.$store.dispatch('cards/uploadImages', {image: imageFormData, page: 1})
            }
        },


        removeImage: function (e) {
            this.$store.commit('cards/REMOVE_IMAGE', {page:1})
        }, 
        // image_end
        colorNumber(array){
            const tags = this.tags
            const res = tags[array]
            return res
        },
  
    },

    created(){
    // const cardData = this.$store.state.cards.cardData
    // if(!cardData) return
    // const index = data.findIndex(e=>e.page === 1)
    // const data = cardData[index]


    //         this.logo= data.logo
    //         this.title =  data.title
    //         this.subtitle =  data.subtitle
    //         this.buttonName= data.buttonName
    //         this.description = data.description
    //         this.addOn = data.addOn
    //         this.backgroundImage = data.backgroundImage

    //         this.textAlign= data.textAlign
    //         this.bgArray= data.bgArray
    //         this.fontArray= data.fontArray
    //         this.buttonArray= data.buttonArray
    //         this.sliderFont= data.sliderFont
    //         this.sliderPadding= data.sliderPadding
    //         this.sliderOpacity= data.sliderOpacity
    //         this.sliderLineHeight= data.sliderLineHeight
    //         this.bgImage = data.backgroundImage

    },
    computed:{
        cards(){
            const data = this.$store.state.cards.cardData
            if(!data) return
            console.log('computed- cards', data)

            const index = data.findIndex(e=>e.page === 1)
            console.log('cards data', data[index])
            return data[index]
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
textarea{ width: 100%; border-radius: 5px; padding-left: 12px; border: 2px solid #455a64;border-radius: 5px; transition: 0.5s}
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

