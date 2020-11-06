<template>
<div style='padding: 5%;'>
<!-- Content -->    
    <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Card Section
            </v-btn>         
    </div>
    <div>
        <card-form-content />
    </div>
</div>
</template>

<script>
import cardFormContent from './cardFormContent'
export default {
    components:{
        cardFormContent
    },
}
</script>

<style>

</style>