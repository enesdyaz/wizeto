<template>
<div>
    
    <div class='containerView'  >
        
        <div v-if='imageData.parallaxImage'>
            <!-- <img class='image'  style='width: 100px;margin: 0 auto;' :src="companyInfo.backgroundImage ? companyInfo.backgroundImage : defaultImage" /> -->
                <v-img :src="imageData.parallaxImage"></v-img>
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
        imageData(){
            return this.$store.state.image.imageData
        }
    }
}
</script>



<style lang="scss" scoped>
</style>

