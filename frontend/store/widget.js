
export const state = () => ({
 main: '',

})

export const mutations = {
   ADD_MAIN(state, payload){
    console.log('mutations', state.main)
    state.main = payload
   }
}

export const actions= {
    addMain({commit}, payload){
        console.log('actions', payload)
        commit('ADD_MAIN', payload)
    }
}