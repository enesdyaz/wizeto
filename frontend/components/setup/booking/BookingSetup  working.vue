<template>
<!-- Registration Form -->
<div>

        <div class='left'>
            <v-date-picker 
            :first-day-of-week="1" v-model="date"  :allowed-dates="allowedDates" class="mt-4" :min="this.today"
            :max="this.max" color="blue-grey" @change='onChange()' ></v-date-picker>
        </div>



        <div class='right'>
             <div>
                    <v-btn class= 'body-2' color='blue-grey' style='margin-left: -30px;' text><v-icon >mdi-chevron-right</v-icon>Calendar Setup</v-btn>
            </div>

            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Booking Available</th> 
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Interval</th> 
                </tr>
                <tr>
                    <td><select v-model='period' required style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="number" min='1'>
                            <option value="7" selected>weekly</option>    
                            <option value="14">Fornightly</option>    
                            <option value="31">Monthly</option>    
                            <option value="183">Half yearly</option>    
                            <option value="365">Yearly</option>    
                        
                        </select></td>
        
                    <td><select v-model='duration' style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="text" >
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
            </table>
            
            <table style='font-size: 0.8rem;width: 98%;margin-bottom: 10px;'>
            
                <tr style='text-align: left;'>
                    <th style='padding-left: 6px;'>M</th> 
                    <th style='padding-left: 6px;'>T</th> 
                    <th style='padding-left: 6px;'>W</th> 
                    <th style='padding-left: 6px;'>T</th> 
                    <th style='padding-left: 6px;'>F</th> 
                    <th style='padding-left: 6px;'>S</th> 
                    <th style='padding-left: 6px;'>S</th> 
                </tr>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="1"></v-checkbox></td>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="2"></v-checkbox></td>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="3"></v-checkbox></td>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="4"></v-checkbox></td>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="5"></v-checkbox></td>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="6"></v-checkbox></td>
                    <td><v-checkbox style='float: left; padding: 0;margin: 0;' dense multiple v-model="arrayDay"  value="0"></v-checkbox></td>

                <tr>

                    
                </tr>
            </table>

            <table style='font-size: 0.8rem;width: 48%;margin-bottom: 10px;float: left;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Start Time</th> 
                </tr>
                <tr>
                    <td><input v-model='start_time' required  style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="time" ></td>
                </tr>
            </table>

            <table style='font-size: 0.8rem;width: 48%;margin-bottom: 10px;float: left;'>
                <tr style='text-align: left;'>
                    <th> <v-icon style='font-size: 1rem;'>mdi-chevron-down</v-icon>Fininsh Time</th> 
                </tr>
                <tr>
                    <td><input v-model='finish_time' required  style='border: 1px solid grey; width: 99%; padding-left: 10px;' type="time" ></td>
                </tr>
            </table> 
            <div>
                <v-btn text x-small @click='onClick()'>SHOW</v-btn>
            </div>

        </div>  <!-- end_ left box-->





        <br>
     
        <div v-if='date' style='clear: both;'>
            <v-btn class= 'body-2' color='blue-grey' style='margin-left: -30px;margin-top: 33px;' text><v-icon >mdi-chevron-down</v-icon>Available Time</v-btn>
            <v-chip-group v-for="(d, i) in book" :key="i">
                <div style='width: 70px; margin-right: 10px;'>
                    <div class='caption' :class="[ new Date(d.date).getDay() == 6 ? 'sat' :  new Date(d.date).getDay() == 0 ? 'sun' : 'else' ]" style='border-radius: 5px; margin-top: 5px; margin-right: 5px;font-size: 1rem;text-align: center;'>  {{changeDay(d.date)}} 
                    </div>
                </div>



                <v-chip color='blue-grey lighten-4' close-icon='mdi-circle' close @click:close="close(a.hour)" outlined small label v-for="(a, i) in d.time" :key='i' @click='a.booking = !a.booking'>

                    <div v-if='chipCondition(d.date)' :class="{chip:a.booking}">{{a.hour}}</div>
                    <div v-else >Closed</div>

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
    duration:'',
    arrayDay: [],
    start_time: '',
    finish_time: '',

    book: [ {date: '1981-07-17', time: [{hour: '00:00', booking: false}]}], // initial 

    
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
            console.log(res_day)
            return res_day;
        },

        getFullData(selectedDate){
            const setFirstTime = this.start_time
            const setFinishTime = this.finish_time
            const setInterval = this.duration
            
            var date = new Date(selectedDate+" "+setFirstTime)
            var finish = new Date(selectedDate+" "+setFinishTime)

            var timeObject = {date: selectedDate, time: []}

            for(var i=0;i<this.book.length;i++){

                    for( date ; date<=finish ; date.setMinutes(date.getMinutes()+Number(setInterval))) {
                    var h = date.getHours()
                    var m = date.getMinutes()
                    var hours = h >= 10 ? h : '0' + h
                    var minutes = m >= 10 ? m : '0' + m;
                    timeObject.time.push({hour: hours+":"+minutes, booking: true})
                
                }         
            }

            return timeObject    
        },

        onClick(){
            var dateArray = this.getDateRangeData(this.period)  // 2020-10-26, 2020-10,27...
            var bookArray = []
            for(var i=0; i< dateArray.length; i++){
                var dateTimeArray = this.getFullData(dateArray[i])
                bookArray.push(dateTimeArray)
            }
            this.book = bookArray
            
            console.log('bookArray', bookArray)
            this.chipCondition()
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
        close(selected){  // chip에서 O 선택하면 모든 시간이 동일하게 true/false 되는 함수
            
            for(let i=0; i<this.book.length; i++){
                let res = this.book[i].time.find(e=>e.hour === selected ? e.booking = !e.booking : '' )
            }
            
        },
        chipCondition(){
            this.ArrayDay.forEach(e=>e === this.book)
        }

    },



    computed: {
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

        max(){
            var t = new Date()
            t.setDate(t.getDate()+Number(this.period))  // this.period was string so the years was ramdomly changed.
                var m = t.getMonth()+1
                var m = m >= 10 ? m : '0' + m

                var d = t.getDate()
                var d = d >= 10 ? d : '0' + d;

                
            return t.getFullYear()+"-"+m+"-"+d
            }
            
        }
    
    
    
}
</script>




<style lang="scss">
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