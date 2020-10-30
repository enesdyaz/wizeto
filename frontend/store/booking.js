
export const state = () => ({
    bookingData: []
})

export const mutations = {
   
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
        state.bookingData.arrayDay = payload
    }

   

}

export const actions= {
    addBooking({commit}, payload){         // from category(Parent)
        commit('ADD_BOOKING', payload)
    },
    updateBooking({commit}, payload){         // from category(Parent)
        commit('UPDATE_BOOKING', payload)
    },
    resetBooking({commit}){
        commit('RESET_BOOKING')
    },

    closeCols({commit}, hour){
        commit('CLOSE_COLS', hour)
    },

    chipBookingToggle({commit}, payload){
        commit('CHIP_BOOKING_TOGGLE', payload)
    },

    arrayDayChanged({commit}, payload){
        commit('ARRAY_DAY_CHANGED', payload)
    },

}