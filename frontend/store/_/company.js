export const state = () => ({
    companyInfo: '',
})

export const mutations = {
    ADD_DATA(state, payload){
        state.companyInfo = payload
    }
}

export const actions = {
    addData({commit}, payload){
        commit('ADD_DATA', payload)
    }
}