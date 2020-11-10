<template>
<div  v-if='data.addOn'>
<!-- ui --->   
    <div :style="{textAlign: textAlignUi, color: colorNumber(data.fontArray)}">
        <div class='mainDiv-1' :style="{backgroundColor: colorNumber(data.bgArray), lineHeight: sliderLineHeightValue, color: colorNumber(data.fontArray), backgroundImage: 'url(' + data.backgroundImage + ')', } " >
            <div :style="{background: sliderOpacityValue}">
                <div :style="{ padding: sliderPaddingValue }">
                    <div class='logoDiv' :style="{fontSize: sliderFontLogo}">
                        {{data.logo}}
                    </div>
                    <div class='titleDiv' :style="{fontSize: sliderFontTitle}">
                        {{data.title.toUpperCase()}}
                    </div>
                    <div class='subtitleDiv' :style="{fontSize: sliderFontSubtitle}">
                        {{data.subtitle}}
                    </div>
                    <div v-if='data.buttonName' class='buttonDiv'>
                        <v-btn :color='colorNumber(data.buttonArray)' dark >{{data.buttonName}}</v-btn>
                    </div>
                    <div class='descriptionDiv' :style="{fontSize: sliderFontDescription}">
                        {{data.description}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
        }

    },
    methods:{
        colorNumber(array){
        const tags = this.data.tags
        const res = tags[array]
        return res
        }
    },

    computed:{
        data(){
            return this.$store.state.widget.main3
        },

        textAlignUi(){
        const items = ['left', 'center', 'right']
        let select = items[this.data.textAlign]
        return select
        },
        
        sliderFontTitle(){
            return this.data.sliderFont + "px"
        },
        sliderFontSubtitle(){
            return (this.data.sliderFont - 5) + "px"
        },
        sliderFontLogo(){
            return (this.data.sliderFont - 9 ) + "px"
        },
        sliderFontDescription(){
            return (this.data.sliderFont - 10) + "px"
        },

        sliderPaddingValue(){
            return this.data.sliderPadding + "%"
        },
        sliderOpacityValue(){
            return "rgba(0,0,0,"+ this.data.sliderOpacity+")"
        },
        sliderLineHeightValue(){
            return this.data.sliderLineHeight + "px"
        }
    },

}
</script>


<style lang="scss" scoped>


.mainDiv-1{

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
