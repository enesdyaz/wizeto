<template>
<div>
    
    <div class='containerView' :style="{color: companyInfo.fontColor,  backgroundColor: companyInfo.backgroundColor }" >
       

        <div class='caption' style='margin-bottom: 60px;'>
            <!-- <v-icon :style="{color: companyInfo.fontColor, fontSize: '1rem'}" >mdi-drag</v-icon>{{companyInfo.companyType}} -->
        </div>

        <div class='dataBoxCompanyName'>
            {{companyInfo.companyName}}
        </div>
        <div class='dataBoxCompanyDescription'>
            {{companyInfo.companyDescription}}
        </div>
        
         <div v-if='companyInfo.backgroundImage' style='margin-top: 60px;'>
            <img class='image' width='30' style='width: 100px;margin: 0 auto;' :src="companyInfo.backgroundImage ? companyInfo.backgroundImage : defaultImage" />
        </div>
        <div class='caption text-center' style='margin-top: 90px;'>
            <v-icon :style="{color: companyInfo.fontColor, fontSize: '.9rem', paddingRight:'4px'}" > mdi-google-maps</v-icon>{{companyInfo.companyAddress}}
        </div>
        <div class='caption text-center'>
             <v-icon :style="{color: companyInfo.fontColor, fontSize: '.9rem', paddingRight:'4px'}" > mdi-cellphone</v-icon>{{companyInfo.companyPhoneNumber}}
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
    computed:{
        companyInfo(){
            return this.$store.state.company.companyInfo
        }
    }
}
</script>



<style lang="scss" scoped>

// $fontColor: black;
// $backgroundColor: white;



.containerView{
    padding: 5% 5%;
    height: 45vh;
    // background-image: url('/landing/auto.jpg');
    // background-position: center;
    // background-size: cover;

    .dataBoxCompanyName{
        font-weight: 900;
        font-size: 2rem;
        text-align: center;
    }
    .dataBoxCompanyDescription{
            font-size: 1.2rem;
            font-weight: 400;
            text-align: center;
    }
}




</style>

