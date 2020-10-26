<template>
    <div>
        <v-stepper v-model="e6" vertical>
            <v-stepper-step :complete="e6 > 1" step="1" editable>
                <div v-if='!date'>
                    Select the date
                </div>
                <div v-else>
                    Date: {{date}}
                </div>
                <small></small>
            </v-stepper-step>
            <v-stepper-content step="1">
<!-- calendar -->
                <v-date-picker 
                :first-day-of-week="1" v-model="date"  class="mt-4" :allowed-dates="allowedDates" :min='min' :max='this.max' color="blue-grey" ></v-date-picker>

                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>



            <v-stepper-step :complete="e6 > 2" step="2" editable>
                  <div v-if='!chipSelection'>
                    Select Available Time
                </div>
                <div v-else>
                    Time: {{chipSelection}}
                </div>
            </v-stepper-step>

            <v-stepper-content step="2">
                <div v-if='date' style='clear: both;overflow:auto;'>
                    <v-chip-group style=' padding: 5%' column v-for="(d, i) in booking_time" :key="i" v-model='chipSelection' active-class="deep-purple--text font-weight-bold" >

                        <div v-for="(a, i) in d.time" :key='i' >
                            <v-chip v-if='a.booking' color='blue-grey' outlined small label :value='a.hour'>
                                {{a.hour}}
                            </v-chip>
                        </div>
                    </v-chip-group> 
                </div>


                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
                <v-btn text>Cancel</v-btn>
            </v-stepper-content>



            <v-stepper-step :complete="e6 > 3" step="3" editable>Select an ad format and name ad unit</v-stepper-step>

            <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-12" height="200px"></v-card>
            <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
            <v-btn text>Cancel</v-btn>
            </v-stepper-content>

        </v-stepper>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    layout: 'adminLayout',
    data () {
        return {
            e6: 1, 
            date: '',
            min: moment().format('YYYY[-]MM[-]DD'),
            book: [],
            arrayDay: '',
            period: '',

            chipSelection: ''

        }
    },

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
</style>