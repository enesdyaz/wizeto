
export const state = () => ({
    service: []
})

export const getters = {
    
}

export const mutations = {
    ADD_CATEGORY(state, payload){
        console.log('ADD_CATEGORY', payload)
        state.service.unshift(payload)

    },
    ADD_SERVICE(state, payload){
        const index = state.service.findIndex(v => v._id == payload.categoryId)
        console.log(index)
        console.log(state.service[index])
    },
    FETCH_DATA(state, payload){
        state.service = payload
    }
}

export const actions= {
    addCategory({commit}, payload){
        this.$axios.post('/service', {
            category: payload ,
        }, {withCredentials: true})
        .then((res)=>{
            console.log(res.data)
            commit('ADD_CATEGORY', res.data)
        })
        .catch((err)=>{console.log(err)})
    },


    addService({dispatch}, payload){
        console.log('addService', payload)
        this.$axios.put(`/service/${payload.categoryId}`, payload, {withCredentials: true})
        .then((res)=>{
            console.log('addServiceResponse', res.data)
            dispatch('fetchData', res.data)
        })
        .catch((err)=>{console.log(err)})
    },


    fetchData({commit}){
        this.$axios.get('/service', {withCredentials:true})
        .then((res)=>{
            commit('FETCH_DATA', res.data)
        })
    },
    fetchServiceData({commit}, payload){
        this.$axios.get(`/service/${payload}`, {withCredentials:true})
        .then((res)=>{
            console.log('fetchServiceData', res.data)
            // commit('FETCH_DATA', res.data)
        })
        .catch((err)=>{console.log(err)})
    },

    
}