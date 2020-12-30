<template>
<div>
    <div v-if='select === 2'>
    <br><br>

        <div v-for='(c, index) in category' :key='index' class='mb-14'>
            <div class='caption'  style='display: block;margin-left: 18px;margin-top: 10px; color: black'>
                <v-icon class='body-2 pr-2'>mdi-dots-grid</v-icon>{{c.parent.toUpperCase()}}
            </div>

            <div >
                <div v-for='a in c.content' :key='a.id' >
                    <div >
                        <div class='container' v-if='a.image'>
                            <nuxt-link :to="'/admin/serviceView/' + a.id" >
                            <v-img class='mt-1 ml-1' :src="a.image" aspect-ratio="1.5" alt="" >
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                </template>
                            </v-img>
                            </nuxt-link>
                        </div>
                        <div v-else style='line-height: 170px; text-align: center;'>
                            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                        </div>

                        <div class='ml-5'>
                            <div>
                                <nuxt-link class='body-2 font-weight-bold' style='text-decoration: none; color: #455a64' :to="'/admin/serviceView/' + a.id" >{{textCut(a.name.toUpperCase(), 40)}}</nuxt-link>
                            </div>
                            <!-- <div class='caption' >{{textCut(a.description, 40)}}</div>
                            <div class='body-2 font-weight-bold'  style='color: #8c9eff;float: right'>${{a.price}}</div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    computed:{
        category(){
            return this.$store.state.parent.category
        },
        select(){
            return this.$store.state.category.select
        }
    },
    methods:{
        textCut(txt, len, lastTxt) {
            if (len == "" || len == null) { // 기본값
                len = 20;
            }
            if (lastTxt == "" || lastTxt == null) { // 기본값
                lastTxt = "...";
            }
            if (txt.length > len) {
                txt = txt.substr(0, len) + lastTxt;
            }
            return txt;
        }
    }
}
</script>

<style>

</style>