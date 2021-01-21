<template> 
<v-row class="fill-height">
    <v-col>
    <v-sheet height="64">
        <v-toolbar flat color="white">
        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>mdi-chevron-right</v-icon>
        </v-btn>
        <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                outlined
                color="grey darken-2"
                v-bind="attrs"
                v-on="on"
            >
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right>mdi-menu-down</v-icon>
            </v-btn>
            </template>
            <v-list>
            <v-list-item @click="type = 'day'">
                <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'week'">
                <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = 'month'">
                <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
            <v-list-item @click="type = '4day'">
                <v-list-item-title>4 days</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
        </v-toolbar>
    </v-sheet>
    
    <v-sheet height="600">
        <v-calendar
        ref="calendar"
        v-model="focus"
        color="primary"
        :events="state_appointment"
        :event-color="getEventColor"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:time='addEvent'
        ></v-calendar>

        <v-menu min-width="355px" v-model="selectedOpen"  :activator="selectedElement" offset-y :close-on-content-click="false">
            <v-card >
            
            <div style='padding: 2%;'>
                    <div :class=" `${selectedEvent.color}`">
                    <v-btn class=' subtitle-2' dark text  >
                        <v-icon class='body-1 pr-2'>mdi-book-outline</v-icon> BOOKING DETAILS
                    </v-btn>
                </div>    
                        
            
                <v-card-text>
                    <table style='width: 100%;'>
                        <tr>
                            <td width="30%" class='caption font-weight-bold'>NAME</td>
                            <td>
                                <div  class='selected' v-if="selectedEdit" style='font-weight: bold'>
                                    {{selectedEvent.name}}
                                </div>
                                <div v-else>
                                    <input style='width: 100%;padding-left: 10px;' ref="input" v-model='name' type="text" required>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>SERVICE</td>
                            <td> 
                                    <div  class='selected' v-if="selectedEdit">
                                        {{selectedEvent.service}}
                                    </div>
                                    <div v-else>
                                            <select style='width: 100%;padding-left: 10px;' required v-model="service" >
                                                <option value="" disabled >-- select --</option>
                                                <option v-for="(service, i) in serviceList" :key='i'>
                                                        {{service}}                                            
                                                </option>
                                            </select> 
                                    </div> 
                                </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>PRICE</td>
                            <td style="padding-left: 5px;">
                                <div  class='selected' v-if="selectedEdit">
                                        ${{selectedEvent.price}} <small>( {{selectedEvent.duration}} min)</small>
                                </div>
                                <div v-else>
                                        {{ price?" $ "+price:"N/A"}} <small>( {{ duration? duration: 'N/A'}}min )</small>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>DATE</td>
                            <td>
                                <div  class='selected' v-if="selectedEdit">{{selectedEvent.date}}</div>
                                <div v-else>
                                    <div v-if="state_bookingData">
                                        <select style='width: 100%;padding-left: 10px;' ref="inputDate" v-model="date" required>
                                                <option v-for="(d, i) in state_bookingData.book" :key="i" >
                                                    {{d.date}}
                                                </option>
                                        </select> 
                                    </div>
                                    <div v-else>
                                        This date is Not available
                                    </div>
                                </div>
                            
                            </td>
                        </tr>

                        <tr>
                            <td width="30%" class='caption'>TIME</td>
                                <td> 
                                    <div class='selected' v-if="selectedEdit">{{selectedEvent.time}}</div>
                                    <div v-else>
                                        <div v-if='booking_time?booking_time.length:""'>
                                        <select  v-for="(d, i) in booking_time" :key="i" v-model='time' required style='width: 100%;padding-left: 10px;'>
                                            <option v-for="(a, i) in d.time" :key='i' :value='a.hour' :disabled="!a.booking">
                                                    {{a.hour}}
                                            </option>
                                        </select> 
                                        </div>
                                        <div v-else>
                                            This time is Not available
                                        </div>
                                    </div>
                                </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>MOBILE</td>
                            <td>
                                <div  class='selected' v-if="selectedEdit">{{selectedEvent.mobile}}</div>
                                <div v-else>
                                    <input style='width: 100%;padding-left: 10px;' v-model='mobile' type="text" required>
                                </div>
                                
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>EMAIL</td>
                            <td>
                                <div  class='selected' v-if="selectedEdit">{{selectedEvent.email}}</div>
                                <div v-else>
                                    <input style='width: 100%;padding-left: 10px;'  v-model='email' type="text" required>
                                </div>
                                
                            </td>
                        </tr>
                    </table>
                </v-card-text>
            </div>

            <v-divider></v-divider>

            <v-spacer></v-spacer>
            <div style='display: block; text-align: center;'>
                <span v-if="selectedEdit"><v-btn color="primary"  text @click="onEdit" > EDIT </v-btn></span>
                <span v-else><v-btn color="primary" text @click='onUpdate' > UPDATE </v-btn></span>
                <v-btn color="primary" text @click="onClose" > CLOSE </v-btn>
            </div>
        </v-card>

        </v-menu>
    </v-sheet>
    </v-col>

    
    <v-dialog  v-model="dialog" width="420" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on"  class='ml-4' style='font-size: 1.2rem;'>mdi-comment-outline</v-icon>
        </template>

        <v-card style='border: 5px solid #607d8a; ' >
            <form @submit.prevent ='addBook'>

            <div style='padding: 2%;'>
                    <div style='text-align: center;background: #607d8a'>
                    <v-btn class=' subtitle-2' dark text  >
                        <v-icon class='body-1 pr-2'>mdi-book-outline</v-icon> ADD BOOKING
                    </v-btn>
                </div>    
                        
            
                <v-card-text>
                    <table style='width: 100%;'>
                        <tr>
                            <td width="30%" class='caption'>NAME</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;'  v-model='name' type="text" required>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>SERVICE</td>
                            <td> 
                                    <div v-if='serviceList?serviceList.length:""'>
                                        <select style='width: 100%;padding-left: 10px;' required v-model='service'>
                                            <option value="" disabled >-- select --</option>
                                            <option v-for="(service, i) in serviceList" :key='i' :value='service' required >
                                                <div color='blue-grey' outlined small label >
                                                    {{service}}
                                                </div>
                                        
                                            </option>
                                        </select> 
                                    </div>
                                    <div v-else>
                                        No service
                                    </div>
                                </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>PRICE</td>
                            <td style="padding-left: 5px;">{{ price?" $ "+price:"N/A"}} <small>( {{ duration? duration: 'N/A'}}min )</small></td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>DATE</td>
                            <td>
                                <div v-if="state_bookingData">
                                <select style='width: 100%;padding-left: 10px;'  v-model='date' required>
                                        <option v-for="(d, i) in state_bookingData.book" :key="i" :value='d.date' >
                                            {{d.date}}
                                        </option>
                                    </select> 
                                    </div>
                                    <div v-else>
                                        This date is Not available
                                    </div>
                            </td>
                        </tr>

                        <tr>
                            <td width="30%" class='caption'>TIME</td>
                                <td> 
                                    <div v-if='booking_time?booking_time.length:""'>
                                        <select  v-for="(d, i) in booking_time" :key="i" v-model='time' style='width: 100%;padding-left: 10px;' required>
                                            <option value="" selected disabled> -- select -- </option>
                                            <option v-for="(a, i) in d.time" :key='i' :disabled="!a.booking" :value='a.hour' >
                                                    {{a.hour}}
                                        
                                            </option>
                                        </select> 
                                    </div>
                                    <div v-else>
                                        This time is Not available
                                    </div>
                                </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>MOBILE</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;' v-model='mobile' type="text" required>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>EMAIL</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;'  v-model='email' type="text" required>
                            </td>
                        </tr>
                    </table>
                </v-card-text>
            </div>

            <v-divider></v-divider>

            <v-spacer></v-spacer>
            <div style='display: block; text-align: center;'>
                <v-btn color="primary" text type='submit' > BOOKING </v-btn>
                <v-btn color="primary" text @click="dialog = false" > CLOSE </v-btn>
            </div>
        </form>
        </v-card>
</v-dialog>
</v-row>
</template>

<script>
import moment from 'moment'
export default {
    data: () => ({
        focus: '',
        type: 'week',
        typeToLabel: {
            month: 'Month',
            week: 'Week',
            day: 'Day',
            '4day': '4 Days',
        },
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],

        //dialog
        dialog: false,
        toggle: true,
        selectedEdit: true,

        // add booking
        bookingData: '',

        id: '',
        date: '',
        time: '',
        service: '',
        price: '',
        duration: '',
        name: '',
        email: '',
        mobile: '',
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    }),

    mounted () {
    this.$refs.calendar.checkChange()
    this.$refs.calendar.scrollToTime('06:00')
    },

    methods: {
        onEdit(){
            this.selectedEdit = false
        },
        onUpdate(){
            this.$store.dispatch('booking/editAppointment', {
                id: this.id,
                date: this.date,
                time: this.time,
                start: this.date + " " + this.time, 
                end: this.finish,
                service: this.service,
                name: this.name,
                email: this.email,
                mobile: this.mobile,
                color: this.colors[Math.floor(Math.random() * 6) + 0],
                duration: this.duration,
                price: this.price,
                
            }).then(()=>{
                this.selectedOpen = false
                this.selectedEdit = true
                this.$store.dispatch('booking/fetchData')
            })
        },
        onClose(){
            this.selectedOpen = false
            this.selectedEdit = true
        },
        addBook(){
            this.$store.dispatch('booking/confirmBooking', {
                date: this.date,
                time: this.time,
                start: this.date + " " + this.time, 
                end: this.finish,
                service: this.service,
                name: this.name,
                email: this.email,
                mobile: this.mobile,
                color: this.colors[Math.floor(Math.random() * 6) + 0],
                duration: this.duration,
                price: this.price
            }).then(()=>{
                this.dialog = false
            })
        },
        onDelete(id){
            this.$store.dispatch('booking/deleteAppointment', id)
            this.selectedOpen = false
        },
        viewDay ({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor (event) {
            return event.color
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
            this.date = event.date
            this.service = event.service
            this.name = event.name
            this.time = event.time
            this.mobile = event.mobile
            this.email = event.email
            this.id = event._id

            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            setTimeout(() => this.selectedOpen = true, 10)
            }
            if (this.selectedOpen) {
            this.selectedOpen = false
            setTimeout(open, 10)
            } else {
            open()
            }

            nativeEvent.stopPropagation()
        },
        addEvent(tms){
                this.date = ''
                this.time =''
                this.service = ''
                this.name = ''
                this.price = ''
                this.date = ''
                this.mobile = ''
                this.email = ''
            this.date = tms.date
            this.dialog = true

        },
    },

    computed:{
        finish(){
            const date = this.date
            const time = this.time
            const dateTime = moment(this.date + " " + this.time).add(this.duration, 'minutes').format('YYYY-MM-DD HH:mm')
            return String(dateTime)

        },
        //state
        state_appointment(){
            return this.$store.state.booking.book?this.$store.state.booking.book:""
        },
        state_service(){
            return this.$store.state.service.service?this.$store.state.service.service:""
        },
        state_bookingData(){
            return this.$store.state.booking.bookingData?this.$store.state.booking.bookingData:""
        },


        // Logic
        serviceList(){
            const data = this.state_service
            if(!data) return
            var array = []
            for(var i=0;i<data.length;i++){
                data[i].item.forEach(e=> array.push(e.name))  
            }
            return array
        },

        booking_time(){
       
            var dataResult = []
            if(!this.date) return
                const date = this.date
                console.log('date', date)
                const data = this.state_bookingData
                console.log('booking_time', data)
                
                if(data.length<1){return}
                else{
                    const result = data.book.find(e=> e.date == date)
                    console.log('result', result)
                }
            
            //서비스 시간
            const serviceTime = this.duration
            console.log('duratoin', serviceTime)
            // 부킹 예약 단위 시간
            const duration = this.state_bookingData.duration 
            console.log('bookingduration', duration)
            // 몇개 array
            const rate = Math.floor(serviceTime/duration)   // 3
            console.log('rate', rate)

            // 선택한 시간이 몇번째 array 인가?
            const lastArray = result.time.length  - 1
            console.log('lastArray', lastArray)

            console.log('result', result)
            // 마지막 값에서 rate 빼기   2 >7
            for(var i=0;i<rate;i++){
                    result.time[lastArray - i].booking = false
            }
            console.log('result-change', result)


            for(var k=0;k<lastArray;k++){
                if(result.time[k].booking === false && !result.time[0] && (k+1)-rate>0 ){
                    for(var l = 0; l < rate ; l++){
                        result.time[k - (l+1)].booking = false
                    }
                }
            }

            console.log('result', result)
            return result
        },
    },
    watch:{
        service(){
            console.log('watch')
            if(this.service === '')return
            let res = []
            for ( const a of this.state_service){
                const name = a.item.find(e=>e.name === this.service)
                    res.push(name)
            }
            console.log('res', res)
            const total = res.filter(function(el){ return el != null})

            this.price = total[0].price
            this.duration = total[0].duration
            

        }
    }
 
}
</script>

<style lang="scss" scoped>
.selected{
    padding: 5px
}

</style>