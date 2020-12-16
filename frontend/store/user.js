export const state = () => ({
    me: ''
})

export const mutations = {
    SET_ME(state, payload){
        state.me = payload
    }
}


export const actions = {
    signup({commit}, payload){
        this.$axios.post(`/user/signup`, {
            username: payload.username,
            email: payload.email,
            password: payload.password
        }, {withCredentials: true})
        .then((res)=>{
            commit('SET_ME', res.data)
        }).catch((err)=>{
            console.error(err.body)
        })
    },

    login({commit}, payload){
        this.$axios.post(`${baseUrl}/user/login`, {
            email: payload.email,
            password: payload.password
        }, {withCredentials: true})
        .then((res)=>{
            commit('SET_ME', res.data)
        }).catch((err)=>{
            console.log(err)
        })
    },


    logout({commit}){
        this.$axios.post(`${baseUrl}/user/logout`, {}, {withCredentials: true})
        .then((res)=>{
            commit('SET_ME', null)
        }).catch((err)=>{
            console.log(err)
        })
    },




}


