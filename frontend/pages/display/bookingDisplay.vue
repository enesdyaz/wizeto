<template>
    <div>

        <v-stepper v-model="e6" vertical>
<!-- add service-->

            <v-stepper-step :complete="e6 > 1" step="1" editable>
                <div v-if='!serviceContent'>
                    Select your service
                </div>
                <div v-else>
                    Service: {{serviceContent}}
                </div>
                
                </v-stepper-step>

            <v-stepper-content step="1">
                <div>
                     <v-list dense flat>
   
                        <v-list-group style='margin-left: -30px;' v-for='(data, index) in category' :key='index' :value="true"  small sub-group>

                            <template  v-slot:activator >
                                <v-list-item-content >
                                    <v-list-item-title style='color: #607d8b; '>{{data.parent.toUpperCase()}}</v-list-item-title>
                                </v-list-item-content>
                            </template>

                            <v-list-item-group style='padding-left: 10%; color: red;' v-model='serviceContent' color='primary'>

                                <v-list-item style='margin: 0' v-for="(content, i) in data.content" :key="i"  :value='content.name'>
                                    <v-list-item-title  style='margin-left: -3%; font-weight: 400;' v-text="content.name"></v-list-item-title>

                                    <v-list-item-icon>
                                    <div style='padding-right: 10px;font-size: 0.8rem;margin-top: 3px;'>${{content.price}}</div>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list-group>

                    </v-list>
            </div>
                <v-btn color="primary" small  @click="e6 = 2">Next</v-btn>
            </v-stepper-content>


<!-- calendar -->

            <v-stepper-step :complete="e6 > 2" step="2" editable>
                <div v-if='!date'>
                    Select the date
                </div>
                <div v-else>
                    Date: {{date}}
                </div>
                <small></small>
            </v-stepper-step>
            <v-stepper-content step="2">
                <v-date-picker 
                :first-day-of-week="1" v-model="date"  class="mt-4" :allowed-dates="allowedDates" :min='min' :max='this.max' color="blue-grey" >
                </v-date-picker>
                <div>
                    <v-btn color="primary" @click="e6 = 3" small>Next</v-btn>
                    <v-btn text @click="e6 = 1" small>Back</v-btn>
                </div>
                
            </v-stepper-content>


<!-- select time -->
            <v-stepper-step :complete="e6 > 3" step="3" editable>
                  <div v-if='!time'>
                    Select Available Time
                </div>
                <div v-else>
                    Time: {{time}}
                </div>
            </v-stepper-step>

            <v-stepper-content step="3">
                <div v-if='date'>
                    <v-chip-group column v-for="(d, i) in booking_time" :key="i" v-model='time' active-class="deep-purple--text text--accent-4 font-weight-bold" >

                        <div v-for="(a, i) in d.time" :key='i' >
                            <v-chip v-if='a.booking' color='blue-grey' outlined small label :value='a.hour'>
                                {{a.hour}}
                            </v-chip>
                        </div>
                    </v-chip-group> 
                </div><br>
                <div>
                    <v-btn color="primary" @click="e6 = 4" small>Next</v-btn>
                    <v-btn text @click="e6 = 2" small>Back</v-btn>
                </div>

            </v-stepper-content>

<!-- customer information -->
            <v-stepper-step :complete="e6 > 4" step="4" editable>
                  <div>
                    customer information
                </div>
             
            </v-stepper-step>

            <v-stepper-content step="4">
                <div>
                    <v-form>
                        <table>
                            <tr>
                                <th> First name / Surname </th>
                                <td><v-text-field  v-model='name' :rules="[() => !!name || 'This field is required']" outlined dense hide-details required></v-text-field></td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td><v-text-field v-model='email' :rules="[() => !!email || 'This field is required' , ()=>/.+@.+\..+/.test(email) || 'E-mail must be valid']"  outlined hide-details dense required></v-text-field></td>
                            </tr>
                            <tr>
                                <th>Mobile No</th>
                                <td><v-text-field v-model='mobile' :rules="[
                                        () => !!mobile || 'This field is required',
                                        () => !!mobile && mobile.length <= 10 || 'Mobile Number must be less than 10 characters',
                                        ]" outlined dense hide-details required></v-text-field></td>
                            </tr>
                        </table>
                        
                    </v-form>
                </div><br>
                <div>
                    <v-btn color="primary" small @click="customerInfo()">Next</v-btn>
                    <v-btn text @click='e6 = 3' small>back</v-btn>
                </div>

            </v-stepper-content>


<!-- customer information -->
            <v-stepper-step :complete="e6 > 5" step="5" editable>
                  <div>
                    Confirm your Detail
                </div>
             
            </v-stepper-step>

            <v-stepper-content step="5">
                <div>
                    <v-form>
                        <table>
                            <tr>
                                <th> Name </th>
                                <td> {{name}} </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{{email}}</td>
                            </tr>
                            <tr>
                                <th>Mobile No</th>
                                <td>{{mobile}}</td>
                            </tr>
                            <tr>
                                <th>Service Name</th>
                                <td>{{serviceContent}}</td>
                            </tr>
                            <tr>
                                <th>Booking Date</th>
                                <td>{{date}}</td>
                            </tr>
                            <tr>
                                <th>Booking Time</th>
                                <td>{{time}}</td>
                            </tr>
                        </table>
                        
                    </v-form>
                </div><br>
                <div>
                    <v-btn color="primary" @click="confirmBook()" small>Booking</v-btn>
                    <v-btn text small @click='e6 = 4'>Back</v-btn>
                </div>

            </v-stepper-content>
        </v-stepper>
<!-- snackbar -->        
        <v-snackbar color='primary'  v-model="snackbar" :timeout="timeout" >
            <div style='text-align: center;'>
                <v-icon>mdi-emoticon-happy-outline</v-icon> Your data is saved safely.
            </div>
        </v-snackbar>
    </div>
</template>

<script>
import moment from 'moment'
import serviceDisplayToggle from '../../components/setup/display/serviceDisplayToggle'
export default {
  
    components:{
        serviceDisplayToggle,
    },
    layout: 'adminLayout',
    data () {
        return {
            e6: 1, 
            snackbar: false,
            timeout: 5000,
            
            min: moment().format('YYYY[-]MM[-]DD'),
            book: [],
            arrayDay: '',
            period: '',

            date: '',
            time: '',
            serviceContent: '',

            name: '',
            email: '',
            mobile: '',

        }
    },

    methods: {
        confirmBook(){
            if(this.date&&this.time&&this.serviceContent){
                console.log('ok')
                this.$store.dispatch('booking/confirmBooking', {
                date: this.date,
                time: this.time,
                service: this.serviceContent,
                name: this.name,
                email: this.email,
                mobile: this.mobile
            }).then(()=>{
                this.date= ''
                this.time= ''
                this.service = ''
                this.name= ''
                this.email= ''
                this.mobile= ''
                this.snackbar = true
                this.e6 = '1'
            })
            }else{
                alert('Please check date&time')
            }
            
        },
        customerInfo(){
            this.name && this.email && this.mobile ? this.e6 = 5 : this.e6 = 4
        },
        allowedDates(val){
            var date = new Date(val).getDay()
            if(this.arrayDay){
                for (var i = 0; i < this.arrayDay.length; i++) {
                    if (this.arrayDay[i] == date){
                        this.booking = val
                        return val
                    } 
                }
            }
         
        },
        changeDay(day){ // array 를 요일로 만들기
            var week = ['(S)', '(M)', '(T)', '(W)', '(T)', '(F)', '(S)'];
            var dayOfWeek = moment(day).format('DD[/]MM')+" "+week[new Date(day).getDay()];
            return dayOfWeek;
        },
        
    },
    created(){
        this.bookingData
    },

    computed: {
        bookingData(){
            const data = this.$store.state.booking.bookingData
                console.log(data)
                if(typeof data === 'object'){
                    console.log('yes data exist')

                this.book = data.book // initial 
                this.arrayDay = data.arrayDay
                this.period = data.period
                }
        },
        max(){
            return moment().add(this.period-1, 'day').format('YYYY[-]MM[-]DD')
        },
        booking_time(){
            const d = this.date
            var result = this.book.filter(e=> e.date == d)
            return result  
        },
        category(){
            return this.$store.state.parent.category
        }
    }
}
</script>

<style lang="scss" scoped>
.sat{ color: #1A67C0; border: 1px solid #1A67C0}
.sun{  color: #E91F62; border: 1px solid #E91F62}
.else{ color: #fff; background: #607D8A}
.chip{
    color: rgb(96,125,138);
    font-weight: bold;
}
table{
    tr{
        th{width: 30%; font-size: 0.8rem; font-weight: 300;}
        td{width: 60%; font-size: 0.8rem; font-weight: 300}
    }
}
</style>