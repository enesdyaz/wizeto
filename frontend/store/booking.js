export const state = () => ({
    bookingData: ''
})

export const mutations = {
   
    // Parent Data from category form //
    ADD_BOOKING(state, payload){    
        state.bookingData = payload
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
    }

   

}

export const actions= {
    addBooking({commit}, payload){         // from category(Parent)
        commit('ADD_BOOKING', payload)
    },

    closeCols({commit}, hour){
        commit('CLOSE_COLS', hour)
    },

    chipBookingToggle({commit}, payload){
        commit('CHIP_BOOKING_TOGGLE', payload)
    }

}