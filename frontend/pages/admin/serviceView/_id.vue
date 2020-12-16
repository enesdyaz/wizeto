
<template>
<div>
    <div v-if='dialog' class='container'>
        <div class='mb-3'>
            <v-icon @click='dialog=false'>mdi-arrow-left</v-icon>
        </div>
            <booking-view :dataName = 'data.name' :dataPrice='data.price' @bookingEmit='bookingInfo'></booking-view>
    </div>


    <div v-if="!dialog" >
    <div style='color: #455a64; padding:5%; '> 
        <div class='mb-3'>
            <v-icon @click='routerBack()'>mdi-arrow-left</v-icon>
        </div>
        <div v-if='data.image'>
            <v-img :src='data.image'></v-img>
        </div>
        <br>
        <div class='button font-weight-bold' style='font-size: 2rem;'>
            {{data.name}}
        </div>
        <div v-if="data.duration" class='caption' style='color: #707070'>
            <v-icon style='font-size: 1rem;margin-top: -2px'>mdi-clock-outline</v-icon> {{data.duration}}min
        </div>
        <br>
        <div class='subtitle-2'>
            {{data.description}}
        </div>
<!-- booking -->     
        <div style='text-align: center;margin-top: 20px;'>
            <v-btn small outlined dark rounded color='blue-grey' @click='dialog=!dialog'>Booking</v-btn>
            
            <v-alert style='margin-top: 30px;' v-if='bookingInfoMessage' type='success'>{{bookingInfoMessage}}</v-alert>
        </div>
    </div>


    <br><br>
<!-- recent Contents -->    
    <div style='padding: 0 5% 2% 5%;font-size: 1rem; color: #455a64' >
        <v-icon>mdi-table-of-contents</v-icon>
        Related Contents
    </div>
    <div>
          <div v-for='(c, index) in category' :key='index' style='padding: 0 5% 0 5%;margin-bottom: 45px;'>
    <!-- left_column - v-image -->
            <div style='display: flex; background: #fff;color: #455a64;border-radius: 5px;padding-bottom: 4px;margin: 5px 0;border-bottom: 1px solid rgba(0,0,0,0.1)' 
            v-for='a in c.content' :key='a.id' >
                <div style='width: 22%;'>
                    <div v-if='a.image'>
                        <nuxt-link :to="'/admin/serviceView/' + a.id" >
                        <v-img class='mt-1 ml-1' :src="a.image" aspect-ratio="1" alt="" >
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
            category: this.$store.state.parent.category,
            dialog: false,
            bookingInfoMessage: '',
        }
    },
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
            return data
        }
    },

    methods:{
        bookingInfo(i){
            this.dialog=i
            this.bookingInfoMessage="Your booking is successfuly done and we'll send an confirmation email"
        },
        routerBack(){
            this.$router.go(-1)
            console.log(this.$router)
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
        }
    }
}
</script>

<style>

</style>