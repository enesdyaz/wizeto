<template>
<div> 
    
<p>오늘은 2021-01-06</p>
<hr>

<p>오늘 날짜 구하기 {{today}}</p>
<p>오늘 지금 시간 구하기{{todayTime}} </p>
<hr>
<p>오늘 요일 구하기{{day}}</p>
<p>오늘 주차 구하기{{week}}</p>

<p>날짜 뺴기 {{minusDay(2) }}</p>
<p>날짜 더하기 {{addDay(2) }}</p>

<p>시간 더하기 {{addMinute(60)}}</p>
<p>시간 빼기{{minusMinute(60)}}</p>

<hr>
<p>오늘부터 1월 13일 까지 Array 구하기 {{dayArray(14)}}</p>

<p>오늘부터 2주 후까지 Array 구하기 {{weekArray(1)}}</p>
<p>08:00 부터 17:00 까지 30분 간격으로 Array 구하기 {{ timeArray("08:00", "16:00", 30)}}</p>


</div>
</template>

<script>
import moment from 'moment'

export default {
    computed:{
        today(){
            return moment().format("DD-MM-YYYY")
        },
        todayTime(){
            return moment().format('hh:mm A')
        },
        day(){
        return moment("01-06-2021").format('ddd');
        },
        week(){
            return moment("01-06-2021", "DD-MM-YYYY").week()
        },

        test(){
            return moment("01-05-2021", "DD-MM-YYYY")
        }
        
    },

    methods:{
        minusDay(number){
            const day = moment().subtract(number, 'days').format("MM-DD-YYYY")
            return day
        },
        addDay(number){
            const day = moment().add(number, 'days').format("MM-DD-YYYY")
            return day
        },
        addMinute(number){
            const day = moment().add(number, 'minutes').format('hh:mm A')
            return day
        },
        minusMinute(number){
            const day = moment().subtract(number, 'minutes').format('hh:mm A')
            return day
        },
        dayArray(number){     
            let dates = [] 
                for (let i = 0; i < number; i++) {
                dates.push(  {date: moment(new Date()).add(i, 'days').format('YYYY-MM-DD') , day: '', week: '', limit: '', time:[]  }  )
                }
            return dates
        },
        weekArray(number){     
            const current = moment().week()      
            var input = moment().day("Sunday").week(current+number)   
            const diff = input.diff(moment(),'days') + 2 
                let dates = [] 
                for (let i = 0; i < diff; i++) {
                    dates.push(  {date: moment(new Date()).add(i, 'days').format('YYYY-MM-DD') , day: '', week: '', limit: '', time:[]  }  )
                }
            return dates
        },
        timeArray(startTime, endTime, gap){   // start - 시작시간, end -  종료시간 number -30  30분 간격으로 시간 배열
            const start = moment(startTime, "HH:mm")
            const end = moment(endTime, "HH:mm")
            const diff = moment.duration(end.diff(start)).asMinutes()
            const num = gap-1
                let times = [];
                    for (let i = 0; i < diff; i++) {
                    times.push(
                        {time: moment(start, "HH:mm").add(i, 'minutes').format("HH:mm") , count: '' }
                        ) 
                    i = i + num;
                    }
            return times
        },
        extract(num){  // book에서 mon, tue, wed 체크 된 것을 찾아서 해당 condition값을 true로 만들어줌 -
            this.book.filter(f=>f.day===Number(num)).map(m=>m.condition=true)
        },
        closeCols(hour){  // chip에서 O 선택하면 모든 시간이 동일하게 true/false 되는 함수
        this.$store.dispatch('booking/closeCols', hour)
        },

    }
}
</script>

<style>

</style>