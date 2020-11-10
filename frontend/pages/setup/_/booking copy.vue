<template>
    <div >
        <div :class='{active: !isActive}' class='leftBox' style='overflow:auto; height: 100vh;'>
            <booking-setup></booking-setup>
        </div>

        <div :class='{active: isActive}'  class='rightBox'>
            <div justify='center' align='center' class='d-none d-sm-flex' >
                <v-col>
                    <mobile-phone></mobile-phone>
                </v-col>
            </div>
        </div>

        <!-- <div class='bottomNavigation d-sm-none'>
            <div class='bottomAdmin'><v-btn text @click='admin'>ADMIN</v-btn> </div>
            <div class='bottomView'><v-btn text @click='view' > VIEW</v-btn></div>
        </div> -->
    </div>
</template>

<script>
// import mobilePhone from '../../components/setup/MobileIphone'
// import mobilePhone from '../../components/setup//MobileIphone'
// import BookingSetup from '../../components/setup/booking/BookingSetup'
// import BookingCalendar from '../../components/setup/booking/bookingCalendar'
export default {
components: {
    // mobilePhone,
    // mobilePhone,
    // BookingSetup,
    // BookingCalendar
},
// layout: 'adminLayout',
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
}
}
</script>

<style lang='scss' scoped>

.leftBox{
width: 50%;
float: left;
}

.rightBox{
width: 50%;
float: left;
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

.bottomNavigation{
position: fixed;
bottom: 0;
width: 100%;

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