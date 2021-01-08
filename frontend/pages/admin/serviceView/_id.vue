
<template>
<div>
    <div v-if='dialog' class='container'>
        <div class='mb-3'>
            <v-icon @click='dialog=false'>mdi-arrow-left</v-icon>
        </div>
            <booking-view :dataName='data.name' :dataDuration="data.duration" :dataPrice='data.price' @bookingEmit='bookingInfo'></booking-view>
    </div>


    <div v-else>
        <div style='color: #455a64; padding:5%; '> 
            <div class='mb-3'>
                <v-icon @click='routerBack()'>mdi-arrow-left</v-icon>
            </div>
            <div v-if='data.image'>
                <v-img :src='`http://localhost:3085/${data.image}`'></v-img>
            </div>
            <br>
            <div class='button font-weight-bold' style='font-size: 2rem;'>
                {{data.name}}
            </div>
            <div v-if="data.duration" class='caption' style='color: #707070'>
                <v-icon style='font-size: 1rem;margin-top: -2px'>mdi-clock-outline</v-icon> {{data.duration}}min
            </div>
            <br>
            <div class='subtitle-2' >

                <!-- <div  v-html="data.description"></div> -->
                    <quill-editor style='position: relative' class='editor' v-model="data.description" value='aaa'
                    ref="quillEditor" :options="editorOption" :disabled='true' />
            </div>
    <!-- booking -->     
            <div style='text-align: center;margin-top: 20px;'>
                <v-btn small outlined dark rounded color='blue-grey' @click='dialog=!dialog'>Booking</v-btn>
                
                <v-alert style='margin-top: 30px;' v-if='bookingInfoMessage' type='success'>{{bookingInfoMessage}}</v-alert>
            </div>
        </div>


        <br><br><br><br><br>

        <!-- <div style='padding: 0 5% 2% 5%;font-size: 1rem; color: #455a64' >
            <v-icon>mdi-table-of-contents</v-icon>
            Related Contents
        </div> -->
        <!-- <div>
            <div v-for='(c, index) in service' :key='index' style='padding: 0 5% 0 5%;margin-bottom: 45px;'>
                <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px 0;border-bottom: 1px solid rgba(0,0,0,0.1)' 
                v-for='a in c.item' :key='a.id' >
                    <div style='width: 22%;'>
                        <div v-if='a.image'>
                            <nuxt-link :to="'/admin/serviceView/' + a.id" >
                            <v-img class='mt-1 ml-1' :src='`http://localhost:3085/${a.image}`' aspect-ratio="1" alt="" >
                                <template v-slot:placeholder>
                                    <v-row class="fill-height ma-0" align="center" justify="center">
                                        <v-progress-circular indeterminate color="grey lighten-5"
                                        ></v-progress-circular>
                                    </v-row>
                                    </template>
                            </v-img>
                            </nuxt-link>
                        </div>
                        <div v-else style='margin-top: 25px; text-align: center;'><v-icon>mdi-checkbox-marked-circle-outline</v-icon></div>
                    </div>
                    <div style='width: 75%;position: relative'>
                        <div class='pl-2 mt-2'>
                            <div>
                                <nuxt-link class='body-2 font-weight-bold' style='text-decoration: none; color: #455a64' :to="'/admin/serviceView/' + a._id" >{{textCut(a.name.toUpperCase(), 25)}}</nuxt-link>
                            </div>
                            <div class='caption' >{{textCut(removeHTML(a.description), 35)}}</div>
                            <div class='body-2 font-weight-bold'  style='color: #8c9eff;'>${{a.price}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->


    </div>
</div>
</template>

<script>
import bookingView from '~/components/setup/booking/bookingView';
import serviceView2 from '~/pages/admin/serviceView/serviceView2.vue'
export default {
    components:{
        bookingView,
        serviceView2
    },
    data(){
        return{
            dialog: false,
            bookingInfoMessage: '',
            service: '',

            //quill
            editorOption: {
            // Some Quill options...
                theme: 'bubble',
                readOnly: true,
                modules: {
                    toolbar: [ ]
                }
            }
        }
    },
    created(){
        this.fetchData()
    },
    computed:{
        data(){
            const data = this.service
            let match = []
            for(var i=0;i<data.length;i++){
                const first = data[i].item.find(v=>v._id === this.$route.params.id)
                if(first){
                    match.push(first)
                }
            }
            console.log('match', match)

            return match[0]      
            
        }
    },

    methods:{
        fetchData(){
            const data = this.$store.state.service.service
            this.service = data
        },
        bookingInfo(i){
            this.dialog=i
            this.bookingInfoMessage="Your booking is successfuly done and we'll send an confirmation email"
        },
        routerBack(){
            this.$router.go(-1)
        },
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
        },
        removeHTML(text){
            return text.replace(/(<([^>]+)>)/ig,"")
        },
    }
}
</script>

<style lang='css' scoped>



</style>

