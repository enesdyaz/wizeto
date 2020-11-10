<template>
<div style='padding: 5%'>
<!-- Content -->    
    <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Main Section
            </v-btn>         
    </div>
    <div>
        <div v-if='mainFormSelect === 0 ' ><main-form-content /></div>
        <div v-else-if ='mainFormSelect === 1'><main-form-content2 /></div>
        <div v-else-if ='mainFormSelect === 2'><main-form-content3 /></div>
        <div v-else-if ='mainFormSelect === 3'><main-form-content4 /></div>
        <div v-else><main-form-content5 /></div>
    </div>

    <br>
        <div class='text-center'>
            <v-btn-toggle v-model='mainFormSelect' mandatory>
                <v-btn color='blue-grey' text small>1</v-btn>
                <v-btn color='blue-grey' text small>2</v-btn>
                <v-btn color='blue-grey' text small>3</v-btn>
                <v-btn color='blue-grey' text small>4</v-btn>
                <v-btn color='blue-grey' text small>5</v-btn>
            </v-btn-toggle>
        </div>
    <br><br>
</div>
</template>

<script>
import mainFormContent from './mainFormContent'
import mainFormContent2 from './mainFormContent2'
import mainFormContent3 from './mainFormContent3'
import mainFormContent4 from './mainFormContent4'
import mainFormContent5 from './mainFormContent5'

export default {
    components:{
        mainFormContent,
        mainFormContent2,
        mainFormContent3,
        mainFormContent4,
        mainFormContent5,
    },
    data(){
        return{
            tab: null,
            mainFormSelect: 0,
        }
    }
}
</script>

<style>

</style>