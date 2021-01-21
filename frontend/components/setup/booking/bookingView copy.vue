<template>
<div>
    <div class='container' style='text-align: center;padding-bottom: 7vh;'>date:{{date}}, time: {{time}}

        <div class='title'>{{dataName}} <span class='caption'>(${{dataPrice}})</span> </div><br><br>
<!-- step 1 -->
            <div>
                <div style='text-align: left'>1. Choose your date</div>
                <v-date-picker  :first-day-of-week="1" v-model="date" no-title class="mt-4" 
                :allowed-dates="allowedDates" :min='min' :max='max' color="blue-grey">
                </v-date-picker>
            </div>
<!-- step 2 -->
            <div v-if='date'>
                <div style='text-align: left'>2. Choose your Time</div>
                <v-chip-group column v-for="(d, i) in booking_time" :key="i" v-model='time'  active-class="deep-purple--text text--accent-4 font-weight-bold" >

                    <div v-for="(a, i) in d.time" :key='i' >
                        <v-chip v-if='a.booking' color='blue-grey' outlined small label :value='a.hour'>
                            {{a.hour}}
                        </v-chip>
                    </div>
                </v-chip-group> 
            </div><br>
<!-- step 3 -->
            <div v-if='time'>
                <div style='text-align: left;margin-bottom: 10px;'>3. Put your details</div>
                <div>
                    <v-form  ref="form" v-model="valid" lazy-validation> 
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
                        <br>
                        <v-btn color="primary" small @click="validate">Confirm</v-btn>   
                    </v-form>
                </div>
                <div>
                </div>
            </div>


<!-- booking detail -->
            <v-dialog v-model="dialog" max-width="330" >
                <v-card>
                    <v-card-title class="title">BOOKING DETAILS</v-card-title>

                    <v-card-text>

                        <v-simple-table>
                            <template v-slot:default>  
                                <tbody>
                                    <tr>
                                        <th>Service Name</th>
                                        <td>{{dataName}}</td>
                                    </tr>
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
                                        <th>Booking Date</th>
                                        <td>{{date}}</td>
                                    </tr>
                                    <tr>
                                        <th>Booking Time</th>
                                        <td>{{time}}</td>
                                    </tr>
                                </tbody>
                            </template>
                        </v-simple-table>

                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" text @click="dialog = false"> Cancel </v-btn>
                    <v-btn color="green darken-1" text @click="confirmBook()"> Booking </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>




            <div class="text-center">

            <v-snackbar color='primary'  v-model="snackbar" :timeout="timeout" >
            <div style='text-align: center;'>
                <v-icon>mdi-emoticon-happy-outline</v-icon> Your data is saved safely.
            </div>
            
            </v-snackbar>
        </div>
    </div>

   
</div>
</template>

<script>
import moment from 'moment'
export default {
    props:['dataName', 'dataPrice', 'dataDuration'],
    data () {
        return {
            dialog: false, 
            valid: true,
            snackbar: false,
            timeout: 5000,
            book: [],
            arrayDay: '',
            period: '',

            date: '',
            time: '',
            name: '',
            email: '',
            mobile: '',
            colors: ['blue', 'indigo', 'purple', 'red', 'green', 'orange', 'grey']

        }
    },

    methods: {
        confirmBook(){
            console.log('time', this.time)
                this.$store.dispatch('booking/confirmBooking', {
                date: this.date,
                time: this.time,
                start: this.date + " " + this.time, 
                end: this.finish,
                service: this.dataName,
                name: this.name,
                email: this.email,
                mobile: this.mobile,
                color: this.colors[Math.floor(Math.random() * 6) + 0],
                duration: this.dataDuration,
                price: this.dataPrice
,
            }).then(()=>{ 
                console.log('잘 도착함')
                this.snackbar = true 
                this.$emit('bookingEmit', false)
            
            }).catch(()=>{console.log('failure')})
            this.dialog = false
            this.date= ''
            this.time= ''
            this.name= ''
            this.email= ''
            this.mobile= ''
            
        },
        validate () {
        if(this.$refs.form.validate()){
            this.dialog=true
        }
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
                console.log('data', data)
                if(typeof data === 'object'){
                    console.log('yes data exist')

                this.book = data.book // initial 
                this.arrayDay = data.arrayDay
                this.period = data.period
                
                }
        },
        finish(){
            const date = this.date
            const time = this.time
            const dateTime = moment(this.date + " " + this.time).add(this.dataDuration, 'minutes').format('YYYY-MM-DD HH:mm')
            // const finish = moment(date).add(this.dataDuration, 'minutes').format("HH:hh")
            // const res = String(this.date + " " +finish)
            return String(dateTime)

            // return moment("2021-11-18"+this.date).add(this.dataDuration, 'minutes').format('HH:mm')
        },
        min(){
            // const firstBook = this.book?this.book[0]:''
            // const firstDay = moment(firstBook.date).format('YYYY-MM-DD')
            const firstDay = moment().format('YYYY-MM-DD')

            return firstDay
        },
        max(){
            const lastBook = this.book?this.book[this.book.length-1]:''
            const lastDay = moment(lastBook.date).format('YYYY-MM-DD')
            return lastDay
        },
        booking_time(){
            const date = this.date
            var result = this.book.filter(e=> e.date == date)
            return result  
        },
        
    },

    watch:{
      time(){
            console.log('watch', this.time)
            const duration = this.$store.state.booking.bookingData.duration //45
            console.log('duration', duration)
            const serviceTime = this.dataDuration  //120
            console.log('duration', serviceTime)
            const date = this.date  // "2021-01-01"
            console.log('date', date)
            const time = this.time?this.time:""  // "09:00"
            console.log('time', time)

            const rate = Math.floor(serviceTime/duration)   // 3

            const book = this.book
            if(!book) return
            console.log('thisbook', this.book)
            
            const i = book.findIndex(e=>e.date===date)
            if(i<0) return

            const j = book[i].time.findIndex(e=>e.hour === time)===-1?'':book[i].time.findIndex(e=>e.hour === time) 
            console.log('j',j)
            const lastArray = book[i].time.length  - 1
            console.log('lastArray', lastArray)


            const current = book[i].time
            console.log(current, i, j)
            console.log('current', current[j+0].booking)

            if((j+rate)>lastArray){
                alert('종료시간이라 시간이 모자랄 수가 있습니다. . 부킹하시고 안되면 저희가 다시 연락드리겠습니다.')
                return
            }else{
                for(var a=0;a<rate;a++){
                    if(current[j+ a].booking === false || current[j+ a].booking === undefined){
                        alert('중간에 예약시간이 겹쳐서 부킹을 할수가 없습니다. 부킹은 하시고 저희가 다시 연락드리겠습니다.')

                    }
            }

            }
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