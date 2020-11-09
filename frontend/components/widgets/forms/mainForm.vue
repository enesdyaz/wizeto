<template>
<div style='padding: 5%;'>
<!-- Content -->    
    <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Main Section
            </v-btn>         
    </div>
    <div>
        <main-form-content ></main-form-content>
    </div>
</div>
</template>

<script>
import mainFormContent from './mainFormContent'
export default {
    components:{
        mainFormContent
    },
    data(){
        return{
            tab: null,
        }
    }
}
</script>

<style>

</style>