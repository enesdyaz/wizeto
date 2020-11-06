
export const state = () => ({
    main: '',
    card: ''

})

export const mutations = {
    ADD_MAIN(state, payload){
        console.log('mutations_main', state.main)
        state.main = payload
    },
    ADD_CARD(state, payload){
        console.log('mutations_card', payload)
        state.card = payload
    },
}

export const actions= {
    addMain({commit}, payload){
        console.log('actions_main', payload)
        commit('ADD_MAIN', payload)
    },
    addCard({commit}, payload){
        console.log('actions_card', payload)
        commit('ADD_CARD', payload)
    }
}