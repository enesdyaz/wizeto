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
        :events="inbox"
        :event-color="getEventColor"
        :type="type"
        @click:event="showEvent"
        @click:more="viewDay"
        @click:time='addEvent'
        ></v-calendar>
        <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x >
            <v-card color="grey lighten-4" min-width="350px" max-width="450px" flat dense >
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
                        <v-btn text color="secondary" @click="selectedOpen = false" >delete </v-btn>
                        </v-card-actions>
                </div>
            
            </v-card>
        </v-menu>
    </v-sheet>
    </v-col>

    
    <v-dialog v-model="dialog" width="420">
        <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on"  class='ml-4' style='font-size: 1.2rem;'>mdi-comment-outline</v-icon>
        </template>

        <v-card color="grey lighten-4" flat dense>
            <v-system-bar color="blue-grey"  height="20" ></v-system-bar>
            <div style='padding: 5%;'>
                <div style='text-align: center;'>
                        <v-btn class=' subtitle-2' text color='blue-grey' >
                            <v-icon class='body-1 pr-2'>mdi-book-outline</v-icon> ADD BOOKING
                        </v-btn>
                    </div>

                <v-card-text>
                    <table style='width: 100%;'>
                                        <tr>
                                            <td width="30%" class='caption'>NAME</td>
                                            <td>
                                                <input style='width: 100%;padding: 2px;'  v-model='name' type="text">
                                            </td>
                                        </tr>
                                
                                        <tr>
                                            <td width="30%" class='caption'>SERVICE</td>
                                            <td><select v-model="service" style='width: 100%;'>
                                                <option v-for="(book, index) in booking" :value="book.name" :key="index">
                                                    {{ book.name }}
                                                </option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="30%" class='caption'>PRICE</td>
                                            <td>{{ price?" $ "+price:"N/A"}} <small>( {{ duration? duration: 'N/A'}}min )</small></td>
                                        </tr>
                                        <tr>
                                            <td width="30%" class='caption'>DATE</td>
                                            <td>
                                                <div v-if="date">
                                                <select style='width: 100%;'  v-model='date' >
                                                        <option v-for="(d, i) in bookingData.book" :key="i" :value='d.date' >
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
                                                        <select  v-for="(d, i) in booking_time" :key="i" v-model='time' style='width: 100%;'>
                                                            <option v-for="(a, i) in d.time" :key='i' :value='a.hour' >
                                                                <div v-if='a.booking' color='blue-grey' outlined small label >
                                                                    {{a.hour}}
                                                                </div>
                                                            </option>
                                                        </select> 
                                                    </div>
                                                    <div v-else>
                                                        This time is Not available
                                                    </div>
                                                </td>
                                                <!-- <td> <v-chip-group column v-for="(d, i) in booking_time" :key="i" v-model='time' active-class="deep-purple--text text--accent-4 font-weight-bold" >
                                                        <div v-for="(a, i) in d.time" :key='i' >
                                                            <v-chip v-if='a.booking' color='blue-grey' outlined small label :value='a.hour'>
                                                                {{a.hour}}
                                                            </v-chip>
                                                        </div>
                                                    </v-chip-group> 
                                                </td> -->
                                    
                                        </tr>
                                        <tr>
                                            <td width="30%" class='caption'>MOBILE</td>
                                            <td>
                                                <input style='width: 100%;' v-model='mobile' type="text">
                                            </td>
                                        </tr>
                                        <tr>
                                            <td width="30%" class='caption'>EMAIL</td>
                                            <td>
                                                <input style='width: 100%;'  v-model='email' type="text">
                                            </td>
                                        </tr>
                                </table>
                </v-card-text>
            </div>

            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialog = false" > BOOKING </v-btn>
            </v-card-actions>
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
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
    }),

    mounted () {
    this.$refs.calendar.checkChange()
    },

    methods: {
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
            console.log('mouse', tms)
            this.date = tms.date
            this.dialog = true

        },
    },

    computed:{
        inbox(){
            return this.$store.state.booking.book
        },
        booking(){
            return this.$store.getters.service.booking_date
        },
        // booking(){
        //     const data = this.$store.state.service.service
        //     if(!data)return
        //     var array = []
        //     for(var i=0;i<data.length;i++){
        //         array.push(data[i].item)            
        //     }
        //     const reducer = array.reduce((acc, cur)=> acc.concat(cur))
        //     const arr = new Array(reducer)
        //     console.log(arr)
            
        //     return reducer
        // },
        booking_time(){
                const d = this.date
                console.log('date', d)
                const data = this.$store.state.booking.bookingData
                console.log('data', data)
                
                this.bookingData = data
                if(data.length<1){return}
                else{
                    var result = data.book.filter(e=> e.date == d)
                }

                console.log('data', data.book)
                // console.log(data.book)
                return result
        },
  
    },
    watch:{
        service(){
            console.log('watch')
            const index = this.booking.findIndex(i=>i.name === this.service)
            this.price = this.booking[index].price
            this.duration = this.booking[index].duration
        }
    }
 
}
</script>