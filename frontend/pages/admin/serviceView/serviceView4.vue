<template>
<div>
    <div v-if='select === 3'>
    <br><br>

        <div v-for='(c, index) in category' :key='index' class='mb-14'>
            <div class='caption'  style='display: block;margin-left: 18px;margin-top: 10px; color: black'>
                <v-icon class='body-2 pr-2'>mdi-dots-grid</v-icon>{{c.parent.toUpperCase()}}
            </div>

            <div class='container' style='display: flex; flex-wrap: wrap; text-align: center;'>
                <div v-for='a in c.content' :key='a.id' style='width: 50%'>
                    <div style='border: 1px solid rgba(0,0,0,0.2); margin: 5px;padding: 10px;'>
                        <div >
                            <div style='height: 45px;line-height: 16px; word-break: break-all;'>
                                <nuxt-link class='body-2 font-weight-bold' style='text-decoration: none; color: #455a64' :to="'/admin/serviceView/' + a.id" >{{textCut(a.name.toUpperCase(), 22)}}</nuxt-link>
                            </div>
                            <div class='caption' style='color: rgba(0,0,0,0.6); word-break: break-all;'>{{textCut(a.description, 18)}}</div>
                            <div class='caption mb-3' v-if='a.duration'><v-icon class='body-2 pr-1'>mdi-clock-outline</v-icon>{{a.duration}} min</div>
                            <div class='caption font-weight-bold' v-if='a.price'>$ {{a.price}} </div>
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