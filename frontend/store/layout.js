
export const state = () => ({
    navItem: ''

})

export const mutations = {
    navItem(state, payload){
        state.navItem = payload
    }
}

export const actions= {
    changeView({commit}, payload){
        commit('CHANGE_VIEW', payload)
    }
}