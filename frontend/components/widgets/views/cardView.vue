<template>
<div>
<!-- top toolbar     -->
<div style='border: 1px solid grey'>
        <v-btn-toggle v-model="select" dense group>
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
                            <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderFont"  min='15' max='30' step="3" ></v-slider>
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
                            <v-slider color='blue-grey' style='width: 85%;' hide-details v-model="sliderPadding" min='0' max='20' step="4" ></v-slider>
                        </div>
                    </v-card-text>
                </v-card>
            </v-menu>
        </v-btn-toggle>

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
                        <v-chip-group v-model='backgroundColorModel' column dense>
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
                        <v-chip-group v-model='fontColorModel' column dense>
                            <v-chip  :style="{width: '25px', height: '25px', backgroundColor:tag} "   v-for="tag in tags" :key="tag"></v-chip>
                        </v-chip-group>
                    </v-card-text>
                </v-card>
            </v-menu>

        </v-btn-toggle>
</div>



        <br>
        
<!-- ui --->   
        <div class='ui-basic' :style="{padding: paddingTitle, textAlign: textAlignUi, backgroundColor: backgroundColorSelect, color: fontColorSelect}" >
            <!-- <div class='ui-image' ><v-img :src='data.backgroundImage'></v-img></div> -->
            <div class='ui-title' :style="{fontSize: fontTitle}" >{{data.title?data.title.toUpperCase():data.title}}</div>
            <div class='ui-subtitle' :style="{fontSize: fontSubtitle}" >{{data.subtitle}}</div>
        </div>


    


</div>
</template>

<script>
export default {
    data(){
        return{
        select: '',
        textAlign: '',
        menuFont: false,
        menuBackground: false,
        tags: [ 'whitesmoke', '#000000', '#455a64', '#e64a19', '#5d4037', '#616161', '#1b5e20', '#827717', '#01579b', '#004d40', '#1a237e', '#311b92', '#b71c1c', '#7b1fa2', '#c2185b'],
        backgroundColorModel: '#616161',
        fontColorModel: 'whitesmoke',
        sliderFont: '18',
        sliderPadding: '4',
        fontToggle: '',
        }

    },
    computed:{
        data(){
            return this.$store.state.widget.card
        },
        selectUi(){
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
        let select = items[this.backgroundColorModel]
        return select
        },
        fontColorSelect(){
        const items = this.tags
        let select = items[this.fontColorModel]
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
    methods:{
        a(){
            alert('aa')
        }
    }
}
</script>


<style lang="scss" scoped>
.textCenter{text-align: center;}
.textLeft{text-align: left;}
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

// UI
.ui-expand{ position: relative; 
    
    
    .ui-title{ color: #fff; font-size: 1.8rem; font-weight: 900; position: absolute; bottom: 20%; left: 10%;}
    .ui-subtitle{ color: #fff; font-size: 1.4rem; font-weight: 400; position: absolute; bottom: 10%; left: 10%;}
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
