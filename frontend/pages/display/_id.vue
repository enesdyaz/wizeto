<template>
<div>
    <div style='color: #455a64; padding:5%; '> 
        <div>
            <v-img :src='data.image'></v-img>
        </div>
        <br>
        <div class='button font-weight-bold' style='font-size: 2rem;'>
            {{data.name}}
        </div>
        <div class='caption' style='color: #707070'>
            <v-icon style='font-size: 1rem;margin-top: -2px'>mdi-clock-outline</v-icon> {{data.duration}}min
        </div>
        <br>
        <div class='subtitle-2'>
            {{data.description}}
        </div>
    </div>

    <br><br>
    <div style='padding: 0 5% 2% 5%;font-size: 1rem; color: #455a64' >
        <v-icon>mdi-table-of-contents</v-icon>
        Related Contents
    </div>
    <div style='display: flex;flex-wrap: nowrap; overflow-x: auto;'>
        <div v-for='a in content' :key='a.id' >
            <div style='width: 200px;height: 300px;flex: 0 0 auto; border: 3px solid #eeeeee;margin-left: 20px; padding: 5px; border-radius: 5px;'>
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
                <div v-else style='line-height: 40px; text-align: center;'>
                    <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
                </div>

                <div class='container'>
                    <div>
                        <nuxt-link class='body-2 font-weight-bold' style='text-decoration: none; color: #455a64' :to="'/display/' + a.id" >{{a.name.toUpperCase()}}</nuxt-link>
                    </div>
                    <div class='caption' >{{textCut(a.description, 60)}}</div>
                    <div class='body-2 font-weight-bold'  style='color: #8c9eff;float: right'>${{a.price}}</div>
                </div>
            </div>
        </div>
    </div>


</div>
</template>

<script>
export default {
    data(){
        return{
            category: this.$store.state.parent.category
        }
    },
    layout: 'adminLayout',
    computed:{
        content(){
            const data = this.category
            return data[0].content
        },
        data(){
            const data = this.category
            for(var i=0;i<data.length;i++){
                if(data[i].content.find(v=>v.id === parseInt(this.$route.params.id, 10)) ){
                    return data[i].content.find(v=>v.id === parseInt(this.$route.params.id, 10))
                }         
            }
        return a
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