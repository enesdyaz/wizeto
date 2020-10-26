<template>
<!-- Booking Registration Form -->
<div style='padding: 5%;'>
    <div style='text-align: center;'>
            <v-btn class=' subtitle-2' text color='blue-grey' >
                <v-icon class='body-1 pr-2'>mdi-plus</v-icon> Setting up Your Booking 
            </v-btn>
    </div>
    <br>
    <div>
        <table class='body-1'>  
            <tr>
                <th>Available</th> 
                <td><select v-model='period' required  style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="number" min='1'>
                            <option value="7" selected>weekly</option>    
                            <option value="14">Fornightly</option>    
                            <option value="30">Monthly</option>    
                            <option value="90">3 Months</option>    
                            <option value="180">half yearly</option>    
                        </select></td>
            </tr>

            <tr>
                <th>
                    Interval
                </th>
                <td>
                    <select v-model='duration' style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="text" required>
                        <option value="0" selected>none</option>    
                        <option value="10">10 min</option>    
                        <option value="15">15 min</option>    
                        <option value="30">30 min</option>    
                        <option value="45">45 min</option>    
                        <option value="60">1 hr</option>    
                        <option value="90">1.5 hr</option>    
                        <option value="120">2 hr</option>    
                        <option value="150">2.5 hr</option>    
                        <option value="180">3 hr</option>    
                        <option value="240">4 hr</option>    
                        <option value="300">5 hr</option>    
                        
                        </select>
                </td>
            </tr>

            <tr>
                <th>Day Avaliable</th>
                <td class='d-flex'>
                    <v-checkbox  multiple persistent-hint hint='Mon'  v-model="arrayDay"  value="1"></v-checkbox>
                    <v-checkbox  multiple persistent-hint hint='Tue'  v-model="arrayDay"  value="2"></v-checkbox>
                    <v-checkbox  multiple persistent-hint hint='Wed'  v-model="arrayDay"  value="3"></v-checkbox>
                    <v-checkbox  multiple persistent-hint hint='Thu'  v-model="arrayDay"  value="4"></v-checkbox>
                    <v-checkbox  multiple persistent-hint hint='Fri'  v-model="arrayDay"  value="5"></v-checkbox>
                    <v-checkbox  multiple persistent-hint hint='Sat'  v-model="arrayDay"  value="6" color='indigo'></v-checkbox>
                    <v-checkbox  multiple persistent-hint hint='Sun'  v-model="arrayDay"  value="0" color='red'></v-checkbox>
                </td>
            </tr>
            <br>
            <tr>
                <th>Start Time</th>
                <td >
                    <input v-model='start_time'  style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="time" required>
                </td>
            </tr>
            <tr>
                <th>Finish Time</th>
                <td >
                    <input v-model='finish_time'  style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="time" required>
                </td>
            </tr>
            <tr>
                <th>
                </th>
                <td>
                    <v-btn class='mt-4' color='indigo' dark small @click='onSave()'>SAVE</v-btn>
                    <!-- snackbar ( popping up a window ) --> 
                    <v-snackbar v-model="snackbar" :timeout="timeout"> {{ text }}
                        <template v-slot:action="{ attrs }">
                            <v-btn color="blue" text  v-bind="attrs" @click="snackbar = false" > Close </v-btn>
                        </template>
                    </v-snackbar>
                </td>
            </tr>
        
        </table>

    </div>   <!-- end of Booking Form -->



<!-- Registered Booking Display-->

    <div v-if='date' style='clear: both;'>
            <v-btn class= 'body-2' color='blue-grey' style='margin-left: -30px;margin-top: 33px;' text><v-icon >mdi-chevron-down</v-icon>Available Time</v-btn>
            <v-chip-group v-for="(d, i) in book" :key="i">
                <div style='width: 70px; margin-right: 10px;'>
                    <div class='caption' :class="[ new Date(d.date).getDay() == 6 ? 'sat' :  new Date(d.date).getDay() == 0 ? 'sun' : 'else' ]" style='border-radius: 5px; margin-top: 5px; margin-right: 5px;font-size: 1rem;text-align: center;'>  {{changeDay(d.date)}} 
                    </div>
                </div>

                <v-chip color='blue-grey lighten-4' close-icon='mdi-circle' close @click:close="close(a.hour)" outlined small label v-for="(a, i) in d.time" :key='i' @click='chipBookingToggle(d.date, a.hour)'>
                    <div v-if='d.condition' :class="{chip:a.booking}">{{a.hour}}</div>
                    <div v-else >Close</div>

                </v-chip>
            </v-chip-group> 

    </div> 
 
        
</div>
</template>

<script>
import moment from 'moment'
export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),  // picking a date
        period: '',
        duration: '',
        arrayDay: [],
        start_time: '',
        finish_time: '',
        book: [ {date: '1981-07-17', day: 5,  time: [{hour: '00:00', booking: false}]}], // initial 
        // display
        min: moment().format('YYYY[-]MM[-]DD'),

        // snackbar
        snackbar: false,
        text: 'Your data have been securely saved',
        timeout: 3000,
    }),

    methods: {
        allowedDates(val){
            var date = new Date(val).getDay()
            for (var i = 0; i < this.arrayDay.length; i++) {
                if (this.arrayDay[i] == date){
                    this.booking = val
                    return val
                } 
            }
        },
 
        getDateRangeData(param){  //param1은 시작일, param2는 종료일이다.
            var selectedDate = moment().add(+param, 'days').format("YYYY-MM-DD")
            var res_day = [];
            var ss_day = new Date();
            var ee_day = new Date(selectedDate);    	
                while(ss_day.getTime() <= ee_day.getTime()){
                    var _mon_ = (ss_day.getMonth()+1);
                    _mon_ = _mon_ < 10 ? '0'+_mon_ : _mon_;
                    var _day_ = ss_day.getDate();
                    _day_ = _day_ < 10 ? '0'+_day_ : _day_;
                    res_day.push(ss_day.getFullYear() + '-' + _mon_ + '-' +  _day_);
                    ss_day.setDate(ss_day.getDate() + 1);
            }
            return res_day;
        },

        getFullData(selectedDate){
            const setFirstTime = this.start_time
            const setFinishTime = this.finish_time
            const setInterval = this.duration
            var day = new Date(selectedDate).getDay()
            var date = new Date(selectedDate+" "+setFirstTime)
            var finish = new Date(selectedDate+" "+setFinishTime)

            var timeObject = {date: selectedDate, day: day, condition: false, time: []}

            for(var i=0;i<this.book.length;i++){
                    for( date ; date<=finish ; date.setMinutes(date.getMinutes()+Number(setInterval))) {
                    var h = date.getHours()
                    var m = date.getMinutes()
                    var hours = h >= 10 ? h : '0' + h
                    var minutes = m >= 10 ? m : '0' + m;
                    timeObject.time.push({hour: hours+":"+minutes, booking: true, count: 1})
                
                }         
            }
            return timeObject    
        },
        extract(num){  // book에서 mon, tue, wed 체크 된 것을 찾아서 해당 condition값을 true로 만들어줌 -
            this.book.filter(f=>f.day===Number(num)).map(m=>m.condition=true)
        },
        onClick(){
            var dateArray = this.getDateRangeData(this.period)  // this.period -> 변경된 2020-10-26, 2020-10,27...  현재일부터 this.period기간 까지 날짜를 만듦
            var bookArray = []  
            for(var i=0; i< dateArray.length; i++){
                var dateTimeArray = this.getFullData(dateArray[i]) // this.interval, this.start_time, this.finish_time -> 변경된 timeObject에 시간을 interval로 계산하여 다 넣음.
                bookArray.push(dateTimeArray)
            }
            this.book = bookArray    // this.book에 넣음  // 신규건
            this.arrayDay.forEach(e=>this.extract(e))   // this.arrayDay 변화된 폼의 월, 화, 수, 목, 금.. 을 체크한대로 데이터에 매칭 시킴
        },

        onSave(){
            console.log(this.book.length)
            if(1 >= this.book.length){
                this.onClick()
            }

            this.$store.dispatch('booking/addBooking', {
                id: Date.now(),
                date: this.date,  // picking a date
                period: this.period,
                duration: this.duration,
                arrayDay: this.arrayDay,
                start_time: this.start_time,
                finish_time: this.finish_time,
                book: this.book,
            }).then(()=>{ 
                this.snackbar = true;
                console.log('saved')}
                ).catch(()=>{console.log('error')})
        },


        changeDay(day){ // array 를 요일로 만들기
            var week = ['(S)', '(M)', '(T)', '(W)', '(T)', '(F)', '(S)'];
            var dayOfWeek = moment(day).format('DD[/]MM')+" "+week[new Date(day).getDay()];
            return dayOfWeek;
        },
        satSunCheck(day){
            var dayOfWeek = new Date(day).getDay()
            if(dayOfWeek == 5){
            }
        },
        close(hour){  // chip에서 O 선택하면 모든 시간이 동일하게 true/false 되는 함수
        this.$store.dispatch('booking/closeCols', hour)
       
        },
        chipBookingToggle(date, hour){
            this.$store.dispatch('booking/chipBookingToggle', {date: date, hour: hour})
        },
    },
    created(){
        this.bookingData
    },

    computed: {
        max(){
            return moment().add(this.period, 'day').format('YYYY[-]MM[-]DD')
        },
        bookingData(){
            const data = this.$store.state.booking.bookingData

                if(typeof data === 'object'){

                this.period= data.period
                this.duration =  data.duration
                this.arrayDay =  data.arrayDay
                this.start_time= data.start_time
                this.finish_time = data.finish_time
                this.book = data.book // initial 
                }
                

        },
        booking_time(){
            const d = this.date
            var result = this.book.filter(e=> e.date == d)
            return result  
        },
        today(){
            var t = new Date()
            var m = t.getMonth()+1
            var m = m >= 10 ? m : '0' + m
            var d = t.getDate()
            var d = d >= 10 ? d : '0' + d;
            var today = t.getFullYear()+"-"+m+"-"+d
            return today
        },
    }
        
}
</script>




<style lang="scss" scoped>

table{
    border-collapse: collapse;
    width: 100%;
    tr{
        th{ width: 30%;
            font-size: 0.7rem;
            font-weight: 500;

        }
        td{ width: 70%;}
    }
}

.sat{ color: #1A67C0; border: 1px solid #1A67C0}
.sun{  color: #E91F62; border: 1px solid #E91F62}
.else{ color: #fff; background: #607D8A}
.left{
    width: 50%;
    float: left;
}
.right{
    margin-left: 5%;
    margin-top: 120px;
    width: 40%;
    float: left;
}
.card{
    margin: 0 auto;
    background: red;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.window_close{
    height: 15px;
    width: 15px;
    background-color: rgb(179, 68, 68);
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    right: 10px;
    top: 8px;

}
.image {
    width: 100%;
    display: block;
    margin-bottom: 10px;
}

.chip{
    
    color: rgb(96,125,138);
    font-weight: bold;
}


</style>