
export const state = () => ({
    bookingData: '',  // available date and time
    book: []       // customer can make an appintment
})

export const getters = {
    getData(state){
        return state.bookingData.book
    },
}


export const mutations = {
    FETCH_DATA(state, payload){
        console.log('booking-mutation', payload[0])
        state.bookingData = payload[0]
    },
    FETCH_APPOINTMENT(state, payload){
        state.book = payload
    },

    // Parent Data from category form //
    ADD_BOOKING(state, payload){    
        state.bookingData = payload;

        // arrayDay-condition  (월화수목금토일, 체크시 같이 HTML도 같이 변경하게 함.)
       for(var i=0; i< state.bookingData.book.length; i++){
           state.bookingData.book[i].condition =  false
       }  // 전체를 다 false를 만든 후 
       // 해당 array에 해당하는 값을 찾아서 true로 만든다.
       state.bookingData.arrayDay.forEach(function (e){
        state.bookingData.book.filter(f=>f.day === Number(e)).map(m=>m.condition=true)
        })
    },
    UPDATE_BOOKING(state, payload){
        state.bookingData = payload;

        // arrayDay-condition  (월화수목금토일, 체크시 같이 HTML도 같이 변경하게 함.)
       for(var i=0; i< state.bookingData.book.length; i++){
        state.bookingData.book[i].condition =  false
        }  // 전체를 다 false를 만든 후 
        // 해당 array에 해당하는 값을 찾아서 true로 만든다.
        state.bookingData.arrayDay.forEach(function (e){
        state.bookingData.book.filter(f=>f.day === Number(e)).map(m=>m.condition=true)
        })
    },
    RESET_BOOKING(state){
        state.bookingData = []
    },

    CONFIRM_BOOKING(state, payload){
        console.log('서비스 시간 booking', payload.duration)
        console.log('10분 단위 duration', state.bookingData.duration)
        const serviceTime = payload.duration
        const bookingTime = state.bookingData.duration
        const rate = Math.ceil(serviceTime/bookingTime)
        console.log('rate는 몇일까?' , state.book)
        //  추가하고
        
        state.book.unshift(payload)
        console.log('state,bookingData', state.bookingData)
        // 빼고
        const index = state.bookingData.book.findIndex(e=>e.date === payload.date)
        console.log('찾았니 index', index)

        const time = state.bookingData.book[index].time
        const timeIndex = state.bookingData.book[index].time.findIndex(e=>e.hour === payload.time)

        //30분 단위로했을 때 1시간 30분 짜리 서비스  (3개 동시에 booking=false)
        for(var i=0; i< rate;i++){
            if(time[timeIndex + i].count === 1){
                time[timeIndex + i].booking=false
            }else{
                time[timeIndex + i].count--
            }
        }
    },

    CLOSE_COLS(state, hour){

        for(let i=0; i<state.bookingData.book.length; i++){
        state.bookingData.book[i].time.find(function(e){ if(e.hour === hour){  
        e.booking = !e.booking }})
        }
    },
    CHIP_BOOKING_TOGGLE(state, payload){
        for(let i=0; i<state.bookingData.book.length; i++){
            if(state.bookingData.book[i].date === payload.date){
                state.bookingData.book[i].time.find(function(e){
                    if(e.hour === payload.hour){
                        e.booking = !e.booking
                    }
                })
            
            }
            }
    },

    ARRAY_DAY_CHANGED(state, payload){
        if(state.bookingData === undefined || null) return
        state.bookingData.arrayDay = payload
    },

    SET_TIMEOUT_BOOKING(state, payload){
        for(let i=0;i<payload.length;i++){
            state.bookingData.book.push(payload[i])    
        }
        for(let i=0;i<7;i++){
            state.bookingData.book.shift()    
        }
    },
}

export const actions= {
    async fetchData({commit}, payload){
        const res = await this.$axios.get('/booking/', {widthCredentials: true})
        commit('FETCH_DATA', res.data)
    },
    fetchAppointment({commit}, payload){
        this.$axios.get('booking/getAppointment', {withCredentials: true})
        .then((res)=>{
            commit('FETCH_APPOINTMENT', res.data)
        })
        .catch((err)=>{ console.log(err)})
    },

    addBooking({commit}, payload){         
        this.$axios.post('/booking/addBooking', payload, {withCredentials: true})
        .then((res)=>{
            commit('ADD_BOOKING', res.data)
        })
        .catch((err)=>{ console.log(err)})
        
    },


    updateBooking({state, commit}, payload){         // from category(Parent)
        const statePayload = state.bookingData
        console.log('statePayload', statePayload)
        const res = this.$axios.put(`/booking/updateBooking/${statePayload._id}`, statePayload, {withCredentials:true})
        .then((res)=>{})
        
    },
    resetBooking({commit}){
        this.$axios.delete(`/booking`)
        commit('RESET_BOOKING')
    },
    
    confirmBooking({commit}, payload){
        this.$axios.post('/booking/addAppointment', payload, {withCredentials: true})
        .then((res)=>{
            commit('CONFIRM_BOOKING', res.data)
        })
    },

    closeCols({commit}, hour){
        commit('CLOSE_COLS', hour)
    },

    chipBookingToggle({commit}, payload){
        console.log('chpbookingtoggle', payload)
        commit('CHIP_BOOKING_TOGGLE', payload)
    },

    arrayDayChanged({commit}, payload){
        commit('ARRAY_DAY_CHANGED', payload)
    },


    //추가 자동 부킹
    
    setTimeoutBooking({commit}, payload){
        console.log('setTimeoutBooking', payload)
        commit('SET_TIMEOUT_BOOKING', payload)


    }


}