<template>
<div>

<!-- Parent -->  
    <div v-for='(c, index) in category' :key='index' style='padding: 5% 5% 0% 5%;display: flex; flex-wrap: nowrap; overflow-x: auto; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px 0;border: 1px solid red;'>
        
        <div class='body-2' style='flex: 24; color: #455a64;margin: 10px 0;width: 100%;border: 1px solid green;'>
            <v-icon style='font-size: 12px;'>mdi-menu-right-outline</v-icon> {{c.parent.toUpperCase()}}
        </div>


        <div v-for='a in c.content' :key='a.id' >
                
        <!-- left_column - v-image -->
                <div style='border: 1px solid blue; width: 65%; flex: 0 0 auto; '>
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
                        <div v-else style='line-height: 40px; text-align: center;'><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>

    <!-- right_column - Description -->
                        <div>
                            <div class='container'>
                                <div class='body-1 font-weight-bold'>{{a.name.toUpperCase()}}</div>
                                <div class='caption' >{{textCut(a.description, 70)}}</div>
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
    layout: 'adminLayout',
    computed:{
        category(){
            return this.$store.state.parent.category
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