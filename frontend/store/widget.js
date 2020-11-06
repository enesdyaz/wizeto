
export const state = () => ({
    main: '',
    card: '',
    card2: '',
    card3: '',

})

export const mutations = {
    //main
    ADD_MAIN(state, payload){
        console.log('mutations_main', state.main)
        state.main = payload
    },

    //card
    ADD_CARD(state, payload){
        console.log('mutations_card', payload)
        state.card = payload
    },
    ADD_CARD2(state, payload){
        console.log('mutations_card', payload)
        state.card2 = payload
    },
    ADD_CARD3(state, payload){
        console.log('mutations_card', payload)
        state.card3 = payload
    },

    REMOVE_CARD(state, payload){
        state.card=''
    },
    REMOVE_CARD2(state, payload){
        state.card2=''
    },
    REMOVE_CARD3(state, payload){
        state.card3=''
    }
}

export const actions= {
    //main
    addMain({commit}, payload){
        console.log('actions_main', payload)
        commit('ADD_MAIN', payload)
    },

    //card
    addCard({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD', payload)
    },
    addCard2({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD2', payload)
    },
    addCard3({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD3', payload)
    },

    removeCard({commit}, payload){
        commit('REMOVE_CARD', payload)
    },
    removeCard2({commit}, payload){
        commit('REMOVE_CARD2', payload)
    },
    removeCard3({commit}, payload){
        commit('REMOVE_CARD3', payload)
    },



}