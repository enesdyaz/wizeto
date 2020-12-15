<template>
    <div>
        <div :class='{active: !isActive}' class='leftBox' style='overflow:auto; height: 100vh;'>
            <div>admin</div>
                {{navItem}}
                <div v-if="navItem ==='Service'"><category-form /></div>
                <div v-if="navItem ==='Booking'"><booking-setup /></div>
                <div v-if="navItem ==='Cards'"><main-form /></div>
        </div>

        <div :class='{active: isActive}' class='rightBox' >
                <v-container>
                    <div class="iphone-x">
                            <div> 
                                <div class='c'>Speaker</div> <b>Camera</b> 
                            </div>
        <!-- time and signal -->
                            <div>
                                <div style='margin-left: 40px; display: inline-block; font-size: 0.8rem;font-weight: bold'>2:29</div>
                                <div style='margin-left: 230px;display: inline-block; font-size: 0.8rem;'><v-icon style='font-size: 0.8rem;color:black'>mdi-signal</v-icon></div>
                                <div style='margin-left: -2px; display: inline-block; font-size: 0.6rem; color:black;'>4G</div>
                                <div style='margin-left: -2px; display: inline-block; font-size: 0.8rem;'><v-icon class='battery' style='font-size: 1rem;color:black'>mdi-battery-10</v-icon></div>
                            </div>

                            <div class="mobileContent">
                                    <nuxt-child />
                            </div>
                    </div>
                </v-container>
        </div>
        
<!-- 
        <div :class='{active: isActive}'  class='d-sm-none' >
            <nuxt-chid />
        </div> -->

        <div class='bottomNavigation d-sm-none'>
            <div class='bottomAdmin'><v-btn text class='body-2' @click='admin'><v-icon style='font-size: 1.2rem;'>mdi-cog-outline</v-icon><span style='font-size: 0.8rem;'>setting</span></v-btn> </div>
            <div class='bottomView'><v-btn text class='body-2'  @click='view' ><v-icon style='font-size: 1.2rem;'>mdi-view-day</v-icon> <span style='font-size: 0.8rem;'>view</span></v-btn></div>
        </div>
    </div>
</template>

<script>

import CategoryForm from '../components/setup/service/CategoryForm'
import bookingSetup from '../components/setup/booking/BookingSetup'
import cards from '../pages/setup/cards'

export default {
    components: {
        CategoryForm,
        bookingSetup,
        cards,

    },
    data() {
        return {
        isActive: true
        }
    },
    methods: {
        admin(){
        this.isActive = true;
        },
        view(){
        this.isActive = false
        }
    },
    computed:{
        navItem(){
                return this.$store.state.layout.navItem
        }
    }
}
</script>

<style lang='scss' scoped>

.leftBox{
    width: 50%;
    float: left;
    overflow: scroll;
    }

.rightBox{
    width: 50%;
    float: left;
    margin-top: 0;
    overflow: scroll;
}

// 모바일 컨텐트 내용 - 최상위  (height: 650px, scroll, )
    .mobileContent{
    overflow: scroll;
    margin-top: 15px;
    height: 95.5%;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
    background-color: #fff;
    }

    .iphone-x {
        position: relative;
        margin: 10px auto;
        width: 370px;
        height: 750px;
        border-radius: 40px;
        box-shadow: 0px 0px 0px 0px #1f1f1f, 0px 0px 0px 0px #191919, 0px 0px 0px 12px #111;
        z-index: 10;
    
    &:before,
    &:after{
        content: '';
        position: absolute;
        z-index: -11;
        left: 50%;
        transform: translateX(-50%);

    }
    
    
    // frontal camera/speaker frame
    &:before {
        top: 0px;
        width: 56%;
        height: 30px;
        background-color: #1f1f1f;
        border-radius: 0px 0px 40px 40px;
        z-index: 10;

    }
    
    .c,
    b,
    s,
    span {
        position: absolute;
        z-index: -12;
        display: block;
        color: transparent;

    }
    
    // speaker
    .c {
        top: 0px;
        left: 50%;
        transform: translate(-50%, 6px);
        height: 8px;
        width: 15%;
        background-color: #101010;
        border-radius: 8px;
        box-shadow: inset 0px -3px 3px 0px rgba(256, 256, 256, 0.2);
        z-index: 10;
    }
    
    // camera
    b {
        left: 10%;
        top: 0px;
        transform: translate(180px, 4px);
        width: 12px;
        height: 12px;
        background-color: #101010;
        border-radius: 12px;
        box-shadow: inset 0px -3px 2px 0px rgba(256, 256, 256, 0.2);
            z-index: 10;

        
        &:after {
        content: '';
        position: absolute;
        background-color: #2d4d76;
        width: 6px;
        height: 6px;
        top: 2px;
        left: 2px;
        top: 3px;
        left: 3px;
        display: block;
        border-radius: 4px;
        box-shadow: inset 0px -2px 2px rgba(0, 0, 0, 0.5);
        z-index: 10;
        }
    }
    .battery{
        transform: rotate(90deg);
    }
    
    }

@media only screen and (max-width: 600px) {
    body {
        background-color: lightblue;
    }
    .active{
        display: none;
    }

    .leftBox{
        width: 100%;
    }
    .rightBox{
        width: 100%;
    }

    .bottomNavigation{
    position: fixed;
    bottom: 0;
    width: 100%;
    background: #cfd8dc;
    z-index: 99999999;
    height: 5vh;
    
    .bottomAdmin{
        float: left;
        width: 50%;
        border: 1px solid whitesmoke;
        text-align: center;
    }
    .bottomView{
    @extend .bottomAdmin
    }
}
}


</style>
