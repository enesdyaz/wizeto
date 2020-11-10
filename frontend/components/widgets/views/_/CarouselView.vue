<template>
<div>
    <div class='containerView'>
        <div>
            <div>
                <v-carousel   :continuous="true"
                        cycle 
                        interval='4000'
                        :show-arrows="false"
                        hide-delimiter-background
                        delimiter-icon="mdi-minus"
                        height="300" >
                    <v-carousel-item transition="fade-transition"
                    v-for="(image, index) in carouselData.carouselImage" :key='index' :src="image" ></v-carousel-item>
                </v-carousel> 
            </div>
        </div>
    <div>
       
    </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.containerView{
    z-index: -1;
}
</style>


<script>
export default {
    data(){
        return{
        }
    },
    computed:{
        carouselData(){
            return this.$store.state.image.carouselData
        }
    }
}
</script>




