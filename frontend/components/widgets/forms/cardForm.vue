<template>
<div style='padding: 5%;'>
<!-- Content -->    
    <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Card Section
            </v-btn>         
    </div>
    <div>
        <div v-if='cardFormSelect === 0 ' ><card-form-content /></div>
        <div v-else-if ='cardFormSelect === 1'><card-form-content2 /></div>
        <div v-else><card-form-content3 /></div>

        
        <br>
        <div class='text-center'>
            <v-btn-toggle v-model='cardFormSelect'>
                <v-btn color='blue-grey' text small>1</v-btn>
                <v-btn color='blue-grey' text small>2</v-btn>
                <v-btn color='blue-grey' text small>3</v-btn>
            </v-btn-toggle>
        </div>
        
    </div>
</div>
</template>

<script>
import cardFormContent from './cardFormContent'
import cardFormContent2 from './cardFormContent2'
import cardFormContent3 from './cardFormContent3'
export default {
    components:{
        cardFormContent,
        cardFormContent2,
        cardFormContent3,
    },
    data(){
        return{
            cardFormSelect: 0,
        }
    }
}
</script>

<style>

</style>