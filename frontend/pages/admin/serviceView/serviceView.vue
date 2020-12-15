<template>
<div>
    <div v-if='select === 0'>
<!-- Parent -->  
        <div v-for='(c, index) in category' :key='index' style='padding: 5% 5% 0% 5%;'>
            <!-- <div class='body-2' style='color: #455a64;margin: 10px 0;'>
                <v-icon style='font-size: 12px;'>mdi-menu-right-outline</v-icon> {{c.parent.toUpperCase()}}
            </div> -->

    <!-- left_column - v-image -->
            <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px 0;border-bottom: 1px solid rgba(0,0,0,0.1)' 
            v-for='a in c.content' :key='a.id' >
                <div style='width: 22%;'>
                    <div v-if='a.image'>
                        <v-img class='mt-1 ml-1' :src="a.image" aspect-ratio="1" alt="" >
                            <template v-slot:placeholder>
                                <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"
                                    ></v-progress-circular>
                                </v-row>
                                </template>
                        </v-img>
                    </div>
                    <div v-else style='margin-top: 25px; text-align: center;'><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>
                </div>

    <!-- right_column - Description -->
                <div style='width: 75%;position: relative'>
                    <div class='pl-2 mt-2'>
                        <div>
                            <nuxt-link class='body-2 font-weight-bold' style='text-decoration: none; color: #455a64' :to="'/admin/serviceView/' + a.id" >{{textCut(a.name.toUpperCase(), 25)}}</nuxt-link>
                        </div>
                        <div class='caption' >{{textCut(a.description, 35)}}</div>
                        <div class='body-2 font-weight-bold'  style='color: #8c9eff;'>${{a.price}}</div>
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
            console.log('select', this.$store.state.category.select)
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