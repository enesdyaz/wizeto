<template> 
<v-row class="fill-height">
    <v-col>{{selectedEvent.time}}
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

        <v-menu v-model="selectedOpen"  :activator="selectedElement" offset-y :close-on-content-click="false">
            <v-card :style="{border: `3px solid ${selectedEvent.color}`}"  >
            
            <div style='padding: 2%;'>
                    <div :class=" `${selectedEvent.color}`">
                    <v-btn class=' subtitle-2' dark text  >
                        <v-icon class='body-1 pr-2'>mdi-book-outline</v-icon> BOOKING DETAILS
                    </v-btn>
                </div>    
                        
            
                <v-card-text>
                    <table style='width: 100%;'>
                        <tr>
                            <td width="30%" class='caption'>NAME</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;' ref='inputName' :value="selectedEvent.name" :readonly='toggle'  type="text">
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>SERVICE</td>
                            <td> 
                                    <div v-if='serviceList?serviceList.length:""'>
                                        <select style='width: 100%;padding-left: 10px;' ref='inputService'  :value='selectedEvent.service'  >
                                            <option v-for="(service, i) in serviceList" :key='i'  :disabled="toggle"  >
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

                            <td style="padding-left: 5px;">$ {{selectedEvent.price}} <small>( {{ selectedEvent.duration}}min )</small></td>
                            <!-- <td style="padding-left: 5px;">{{ price?" $ "+price:"N/A"}} <small>( {{ duration? duration: 'N/A'}}min )</small></td> -->
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>DATE</td>
                            <td>
                                <div v-if="state_bookingData">
                                <select style='width: 100%;padding-left: 10px;' ref="inputDate"  :value="selectedEvent.date" >
                                        <option v-for="(d, i) in state_bookingData.book" :key="i"  :disabled="toggle" >
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
                                    <div v-if='selectedEvent.time'>
                                        {{selectedEvent.time}}
                                    </div>
                                    <div v-else>
                                        <select  v-for="(d, i) in booking_time" :key="i" ref="inputTime"  style='width: 100%;padding-left: 10px;' :value='selectedEvent.time'>
                                            <option v-for="(a, i) in d.time" :key='i'  :disabled="toggle"  >
                                                    {{a.hour}}
                                            </option>
                                        </select> 
                                    </div>
                                    
                                </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>MOBILE</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;' ref="inputMobile" :value='selectedEvent.mobile' :readonly="toggle" type="text">
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>EMAIL</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;'  ref="inputEmail" :value="selectedEvent.email" :readonly="toggle" type="text">
                            </td>
                        </tr>
                    </table>
                </v-card-text>
            </div>

            <v-divider></v-divider>

            <v-spacer></v-spacer>
            <div style='display: block; text-align: center;'>
                <v-btn color="primary" text @click="addBook" > BOOKING </v-btn>
                <v-btn color="primary" text @click="dialog = false" > CLOSE </v-btn>
            </div>
            
        </v-card>
            <!-- <v-card color="grey lighten-4" min-width="350px" max-width="450px" flat dense >
                <v-system-bar :color="selectedEvent.color"  height="20" ></v-system-bar>
                <div style='padding: 5%;'>
                    <div style='text-align: center;'>
                        <v-btn class=' subtitle-2' text color='blue-grey' >
                            <v-icon class='body-1 pr-2'>mdi-book-outline</v-icon> Booking  Details
                        </v-btn>
                    </div>
                    <br>
                    <div>
                            <v-simple-table dense>
                                <tbody>
                                    <tr>
                                        <td width="30%" class='caption'>NAME</td>
                                        <td>{{ selectedEvent.name}}</td>
                                    </tr>
                                    <tr>
                                        <td width="30%" class='caption'>SERVICE</td>
                                        <td>{{ selectedEvent.service}}</td>
                                    </tr>
                                    <tr>
                                        <td width="30%" class='caption'>PRICE</td>
                                        <td>{{ selectedEvent.price?" $ "+selectedEvent.price:"N/A"}}</td>
                                    </tr>

                                    <tr>
                                        <td width="30%" class='caption'>START</td>
                                        <td>{{ selectedEvent.start}}</td>
                                    </tr>
                                    <tr>
                                        <td width="30%" class='caption'>END</td>
                                        <td>{{ selectedEvent.end}}</td>
                                    </tr>
                                    <tr>
                                        <td width="30%" class='caption'>CONTACT</td>
                                        <td><v-icon class='caption'>mdi-cellphone</v-icon> {{ selectedEvent.mobile?selectedEvent.mobile:"N/A"}}
                                            <v-divider></v-divider>
                                            <v-icon class='caption'>mdi-email-outline</v-icon> {{ selectedEvent.email?selectedEvent.email:"N/A"}}

                                        </td>
                                    </tr>
                                </tbody>
                            </v-simple-table>
                        </div>  
                        <v-card-actions>
                        <v-btn text color="secondary" @click="selectedOpen = false" >edit </v-btn>
                        <v-btn text color="secondary" @click="onDelete(selectedEvent._id)" >delete </v-btn>
                        </v-card-actions>
                </div>
            
            </v-card> -->
        </v-menu>
    </v-sheet>
    </v-col>

    
    <v-dialog  v-model="dialog" width="420" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on"  class='ml-4' style='font-size: 1.2rem;'>mdi-comment-outline</v-icon>
        </template>

        <v-card style='border: 5px solid #607d8a; ' >
            
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
                                <input style='width: 100%;padding-left: 10px;'  v-model='name' type="text">
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>SERVICE</td>
                            <td> 
                                    <div v-if='serviceList?serviceList.length:""'>
                                        <select style='width: 100%;padding-left: 10px;' v-model='service'>
                                            <option v-for="(service, i) in serviceList" :key='i' :value='service' >
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
                                <select style='width: 100%;padding-left: 10px;'  v-model='date' >
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
                                        <select  v-for="(d, i) in booking_time" :key="i" v-model='time' style='width: 100%;padding-left: 10px;'>
                                            <option v-for="(a, i) in d.time" :key='i' :value='a.hour' >
                                                <div v-if='a.booking' color='blue-grey' outlined small label >
                                                    {{a.hour}}
                                                </div>
                                                <div v-else >
                                                    not available
                                                </div>
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
                                <input style='width: 100%;padding-left: 10px;' v-model='mobile' type="text">
                            </td>
                        </tr>
                        <tr>
                            <td width="30%" class='caption'>EMAIL</td>
                            <td>
                                <input style='width: 100%;padding-left: 10px;'  v-model='email' type="text">
                            </td>
                        </tr>
                    </table>
                </v-card-text>
            </div>

            <v-divider></v-divider>

            <v-spacer></v-spacer>
            <div style='display: block; text-align: center;'>
                <v-btn color="primary" text @click="addBook" > BOOKING </v-btn>
                <v-btn color="primary" text @click="dialog = false" > CLOSE </v-btn>
            </div>
            
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

        // add booking
        bookingData: '',

        date: '',
        time: '',
        service: '',
        price: '',
        duration: '',
        name: '',
        email: '',
        mobile: '',
        colors: ['blue', 'indigo', 'purple', 'red', 'green', 'orange', 'grey']
    }),

    mounted () {
    this.$refs.calendar.checkChange()
    },

    methods: {
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
                this.date = ''
                this.time =''
                this.service = ''
                this.name = ''
                this.price = ''
                this.date = ''
                this.mobile = ''
                this.email = ''
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
                const d = this.date
                const data = this.state_bookingData
                console.log('booking_time', data)
                
                if(data.length<1){return}
                else{
                    var result = data.book.filter(e=> e.date == d)
                    console.log('result', result)
                }
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