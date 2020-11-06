<template>
<div>
<!-- ui --->   
        <div class='ui-basic' :style="{padding: paddingTitle, textAlign: textAlignUi, backgroundColor: colorNumber(data.bgArray), color: colorNumber(data.fontArray)}" >
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
    methods:{
        colorNumber(array){
        const tags = this.tags
        const res = tags[array]
        return res
        }
    },
    computed:{
        data(){
            return this.$store.state.widget.card2
        },
        textAlignUi(){
        const items = ['left', 'center', 'right']
        let select = items[this.data.textAlign]
        return select
        },
        backgroundColorSelect(){
        return this.data.backgroundColorSelect
        },
        fontColorSelect(){
        const items = this.tags
        let select = items[this.fontColorModel]
        return select
        },
        fontTitle(){
            return this.data.sliderFont + "px"
        },
        fontSubtitle(){
            return (this.data.sliderFont - 7) + "px"
        },
        paddingTitle(){
            return this.data.sliderPadding + "%"
        }
        

    
    },

}
</script>


<style lang="scss" scoped>
.textCenter{text-align: center;}
.textLeft{text-align: left;}
// UI - BAISC
.ui-basic{
   
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
