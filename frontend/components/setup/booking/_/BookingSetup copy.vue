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
        <form @submit.prevent="onClick">
        <table class='body-1' >  
            <tr>
                <th>Available</th> 
                <td :class='{disable: disabled}'>
                    <select v-model='period' :disabled='disabled' style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="number" min='1' required>
                            <option value="1" selected>This Week</option>    
                            <option value="2">Next Week</option>    
                            <option value="3">3 Weeks</option>    
                            <option value="4">4 Weeks</option>    
                            <option value="8">8 Weeks</option>    
                    </select>
                </td>
            </tr>

            <tr>
                <th>
                    Interval
                </th>
                <td :class='{disable: disabled}'>
                    <select v-model='duration' :disabled='disabled' style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="text" required>
                        <option value="10">10 min</option>    
                        <option value="15">15 min</option>    
                        <option value="30">30 min</option>    
                        <option value="45">45 min</option>    
                        <option value="60">1 hr</option>    
                        <option value="90">1.5 hr</option>    
                        <option value="120">2 hr</option>    
                        <option value="150">2.5 hr</option>    
                        <option value="180">3 hr</option>    
                    </select>
                </td>
            </tr>
            <br>
            <tr>
                <th>Start Time</th>
                <td :class='{disable: disabled}'> 
                    <input v-model='start_time'  :disabled='disabled' placeholder='ex. 0900'  maxlength = '4' min="0000" max="2359"  type="number" required
                    style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;'>
                </td>
            </tr>
            <tr>
                <th>Finish Time</th>
                <td :class='{disable: disabled}'>
                    <input v-model='finish_time' :disabled='disabled' placeholder='ex. 1700' maxlength = '4' min="0000" max="2359" type="number" required 
                    style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' >
                </td>
            </tr>
            <tr>
                <th>Max Num of Booking</th>
                <td :class='{disable: disabled}'>
                    <select v-model='maxNumber' :disabled='disabled' style='font-size: 0.8rem; border: 1px solid grey; width: 90%; padding-left: 10px;' type="text" required>
                        <option value="1">1 (default)</option>    
                        <option value="2">2</option>    
                        <option value="3">3</option>    
                        <option value="4">4</option>    
                        <option value="5">5</option>    
                        <option value="6">6</option>    
                        <option value="7">7</option>    
                        <option value="8">8</option>    
                        <option value="9">9</option>    
                        <option value="10">10</option>    
                    </select>
                </td>
            </tr>
            <br>
            <tr >
                <th>
                    Working Day
                </th>
                <td>
                    <input style='border: 1px solid red;' id='mon' multiple v-model="arrayDay" type="checkbox" value='1' >
                    <label for="mon" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Mon</label>

                    <input style='border: 1px solid red;' id='Tue' multiple v-model="arrayDay" type="checkbox" value='2' >
                    <label for="Tue" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Tue</label>

                    <input style='border: 1px solid red;' id='Wed' multiple v-model="arrayDay" type="checkbox" value='3' >
                    <label for="Wed" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Wed</label>

                    <input style='border: 1px solid red;' id='Thu' multiple v-model="arrayDay" type="checkbox" value='4' >
                    <label for="Thu" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Thu</label>

                    <input style='border: 1px solid red;' id='Fri' multiple v-model="arrayDay" type="checkbox" value='5' >
                    <label for="Fri" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Fri</label>

                    <input style='border: 1px solid red;' id='Sat' multiple v-model="arrayDay" type="checkbox" value='6' >
                    <label for="Sat" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Sat</label>

                    <input style='border: 1px solid red;' id='Sun' multiple v-model="arrayDay" type="checkbox" value='0' >
                    <label for="Sun" style='font-size: 0.7rem; margin: -3px;padding-right: 6px;'>Sun</label>
                </td>
            </tr>
        
            <tr>
                <th>
                </th>
                <td>
                    <v-btn class='mt-4' color='indigo' dark small type='submit'>SAVE</v-btn>
                    <!-- snackbar ( popping up a window ) --> 
                    <v-snackbar top v-model="snackbar" :timeout="timeout"> {{ text }}
                        <template v-slot:action="{ attrs }">
                            <v-btn color="blue" text  v-bind="attrs" @click="snackbar = false" > Close </v-btn>
                        </template>
                    </v-snackbar>
                </td>
            </tr>
        </table>
        </form>
    </div>   <!-- end of Booking Form -->



<!-- Registered Booking Display-->
    <div>
            <v-btn class= 'body-2' color='blue-grey' style=' margin-left: -30px;margin-top: 33px;' text><v-icon >mdi-chevron-down</v-icon>Available Time</v-btn>
            <div style='display: inline-block;float: right;'>
            </div>

            <v-chip-group v-for="(d, i) in book" :key="i">
        
                <div style='width: 70px; margin-right: 10px;'>
                    <div class='caption' :class="[ new Date(d.date).getDay() == 6 ? 'sat' :  new Date(d.date).getDay() == 0 ? 'sun' : 'else' ]" style='border-radius: 5px; margin-top: 5px; margin-right: 5px;font-size: 1rem;text-align: center;'>  
                        {{changeDay(d.date)}} 
                    </div>
                </div>

                <v-chip color='blue-grey lighten-4' close-icon='mdi-circle' close @click:close="close(a.hour)" outlined small label v-for="(a, i) in d.time" :key='i' @click='chipBookingToggle(d.date, a.hour)'>
                    <div v-if='d.condition' :class="{chip:a.booking}">{{a.hour}}</div>
                    <div v-else >Close</div>

                </v-chip>
            </v-chip-group> 

            
            <div style='float: right'>
                <v-btn class='mt-4' color='blue-grey' @click ='onReset()' dark small>RESET</v-btn>
            </div>

    </div> 
    <br><br><br><br><br><br>
 
        
</div>
</template>

<script>
import moment from 'moment'
moment.locale('en-au')
export default {
    data: () => ({
        date: new Date().toISOString().substr(0, 10),  // picking a date
        period: '',
        duration: '',
        arrayDay: [],
        start_time: '',
        finish_time: '',
        maxNumber: 1,   

        book: [], // MONGO DB 연결 파일
        // display
        min: moment().format('YYYY[-]MM[-]DD'),
        // snackbar
        snackbar: false,
        text: 'Your data have been securely saved. To change the date information, set it up again pressing the reset button which is located down at the bottom',
        timeout: 6000,
        disabled: false,
    }),

    methods: {
        //1. DATE 만들기
        getInitialDate(){  
            const current = moment().week()  
            var input = moment().day("Sunday").week(current+Number(this.period))
            const diff = input.diff(moment(),'days') + 2
                let dates = [] 
                for (let i = 0; i < diff; i++) {
                    dates.push(moment(new Date()).add(i, 'days').format('YYYY-MM-DD'))
                }
            return dates
        },


        intervalDate(param){  //param1은 시작일, param2는 종료일이다.
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

        //2. TIME 만들어 DATE에 집어넣기 
        getBookingData(selectedDate){
            
            var first = String(this.start_time).substring(0,2)
            var second = String(this.start_time).substring(2,4)
            var firstLetter = first + ":" + second
            const setFirstTime = firstLetter

            var third = String(this.finish_time).substring(0,2)
            var fourth = String(this.finish_time).substring(2,4)
            var secondLetter = third + ":" + fourth
            const setFinishTime = secondLetter
           
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
                    timeObject.time.push({hour: hours+":"+minutes, booking: true, count: this.maxNumber, customerId: '', })
                
                }         
            }
            return timeObject    
        },
        makeArray(){
            
        },


        bookingInterval(number){   // 자동으로 날짜를 추가로 입력해주는 기능
        // 변수지정
            // 1. 마지막 부킹날짜 다음날 구하기
            const lastBook = this.book[this.book.length-1]
            const firstDay = moment(lastBook.date).add(1, 'days').format('YYYY-MM-DD')

            // 2. 현재날짜와 현재 주차 구하기
            console.log('period', this.period)
            const today = moment()
            const current = moment().week()

            // 3. 부킹 마지막주의 토요일 00:00:00 만들기
            var startDate = moment().day("Saturday").week(current+Number(this.period)-1)
            var start = moment(startDate).hours('00').minutes('00').seconds('00')
            console.log('startDate', start)   //23 Jan 2021  00:00:00

            // 4. 현재부터 마지막 주 토요일까지 초로 계산하기
            const diff = start.diff(moment(today),'seconds')


    // callback - 추가 Array 만들어서 book에 추가 입력시키기
            const makeArray = () => {
                 // 1. 부킹 마지막 다음 일주일 Array로 만들기
                        let dateArray = []
                        for (let i = 0; i < 7; i++) {
                            const setDate = moment(firstDay).add(i, 'days').format('YYYY-MM-DD')
                            dateArray.push(setDate)
                        }
                        console.log('dateArray', dateArray)

                        // 2. 시간 배열을 dateArray안에 집어넣고 book 에 날짜, 시간 배열을 집어넣기
                        let book = []
                        for(var j=0; j< dateArray.length; j++){
                            let timeArray = this.getBookingData(dateArray[j]) // 2. 30min 분 간격으로 날짜 아래에 입력하기 this.interval, this.start_time, this.finish_time -> 변경된 timeObject에 시간을 interval로 계산하여 다 넣음.
                            book.push(timeArray)
                        }

                        // 3. book에서 mon, tue, wed 체크 된 것을 찾아서 해당 condition값을 true로 만듦
                        const extract = (num) =>{  
                            book.filter(f=>f.day===Number(num)).map(m=>m.condition=true)
                        }
                        this.arrayDay.forEach(e=>extract(e))
                
                        // 4. 기존에 있던 데이터에 추가 입력하기
                        this.$store.dispatch('booking/setTimeoutBooking', book)
            }

    // autoArray 함수 - 일주일 마다 추가 Array 만들기     
            const autoArray = () => {
                console.log('autoArray 실행됨')
                makeArray()
                console.log('makeArray 실행됨')

                const tick = () => {
                    console.log('tick 실행됨')
                    let count = 0
                    setTimeout(()=>{
                        console.log('두번째 무한반복 settieout 실행됨')
                        this.makeArray()
                        console.log(count)
                        count++
                        tick()
                    },5000)
                }
                tick()
            }

    // 

            setTimeout(()=>{
                console.log('firstSetTimeout 실행됨')
                autoArray()
                
            }, 5000)
            
        },


        onClick(){
            console.log('onClick', this.book.length == 0)



            if(this.book.length === 0){
                this.book = [ {date: '1981-07-17', day: 5,  time: [{hour: '00:00', booking: false}]} ]
                var dateArray = this.getInitialDate()  // 1. fornightly 입력되면 14 - 2주 Date 데이터 만들기 this.period -> 변경된 2020-10-26, 2020-10,27...  현재일부터 this.period기간 까지 날짜를 만듦
                var bookArray = []

                for(var i=0; i< dateArray.length; i++){
                    var dateTimeArray = this.getBookingData(dateArray[i]) // 2. 30min 분 간격으로 날짜 아래에 입력하기 this.interval, this.start_time, this.finish_time -> 변경된 timeObject에 시간을 interval로 계산하여 다 넣음.
                    bookArray.push(dateTimeArray)
                }
                this.book = bookArray    // this.book에 넣음  // 신규건
                console.log('book', this.book)
                
                this.arrayDay.forEach(e=>this.extract(e))   // 3.  this.arrayDay 변화된 폼의 월, 화, 수, 목, 금.. 을 체크한대로 데이터에 매칭 시킴



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
                    this.disabled = true;
                    this.snackbar = true;
                    }
                    ).catch(()=>{console.log('error')})

                console.log('onClick end', this.book.length)
            }else{
                console.log('if... else, there is data')
         
                this.$store.dispatch('booking/updateBooking', {
                    date: this.date,  // picking a date
                    period: this.period,
                    duration: this.duration,
                    arrayDay: this.arrayDay,
                    start_time: this.start_time,
                    finish_time: this.finish_time,
                    book: this.book
                    
                }).then(()=>{ 
                    this.disabled = true;
                    this.snackbar = true;
                    console.log('saved')}
                    ).catch(()=>{console.log('error')})
            }
            this.bookingInterval(5)   // 자동으로 한주가 끝나면 다음주에 부킹이 추가로 나타나게 하기 

        
        },

        onReset(){
            this.$store.dispatch('booking/resetBooking'
                    // date: this.date,  // picking a date
                    // period: this.period,
                    // duration: this.duration,
                    // arrayDay: this.arrayDay,
                    // start_time: this.start_time,
                    // finish_time: this.finish_time,
                    // book: this.book
                    
                ).then(()=>{ 
                        this.disabled = false;
                        this.date = ''
                        this.period =''
                        this.duration = ''
                        this.arrayDay= []
                        this.start_time = ''
                        this.finish_time = ''
                        this.book = []
                    console.log('saved')}
                    ).catch(()=>{console.log('error')
                })
            
        },

        

        arrayDayChanged(){
            this.$store.dispatch('booking/arrayDayChanged', this.arrayDay)
        },
        extract(num){  // book에서 mon, tue, wed 체크 된 것을 찾아서 해당 condition값을 true로 만들어줌 -
            this.book.filter(f=>f.day===Number(num)).map(m=>m.condition=true)
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
    const data = this.$store.state.booking.bookingData
    console.log(data)

        if(data.length !== 0){

            console.log('created - data 1')
                this.period= data.period
                this.duration =  data.duration
                this.arrayDay =  data.arrayDay
                this.start_time= data.start_time
                this.finish_time = data.finish_time
                this.book = data.book 
                }else{
                    console.log('no data length')
                }
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
                console.log('computed', data.book)
                return data.book
                
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
    }, 

    watch:{
        arrayDay(){
            this.$store.dispatch('booking/arrayDayChanged', this.arrayDay)
        },
        start_time(){
            console.log('start time', this.start_time.length)
            if(this.start_time.length > 4){
            this.start_time = this.start_time.slice(0, 4);
            }
        },
        finish_time(){
            if(this.finish_time.length > 4){
            this.finish_time = this.finish_time.slice(0, 4);
            }
        }
    },
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
.disable{
    color: rgb(164, 178, 184);
}
</style>