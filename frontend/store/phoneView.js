
export const state = () => ({
    view: ''

})

export const mutations = {
    CHANGE_VIEW(state, payload){
        state.view = payload
    }
}

// Draggable array 저장/
export const actions= {
    changeView({commit}, payload){
        commit('CHANGE_VIEW', payload)
    }
}