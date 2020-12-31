
export const state = () => ({
    service: []
})



export const mutations = {
    ADD_CATEGORY(state, payload){
        console.log('ADD_CATEGORY', payload)
        state.service.unshift(payload)
    },
    DELETE_CATEGORY(state, payload){
        const index = state.service.findIndex(e=>e._id === payload)
        state.service.splice(index, 1)
    },
    
    ADD_SERVICE(state, payload){
        console.log('ADD_SERVICE_DATA', payload)
        const index = state.service.findIndex(v => v._id == payload.categoryId)

        console.log('index', index)
        if(!state.service[index].service){
            console.log('아무것도 없어요 서비스 안에는~~ 만들어랏')
            state.service[index].service = []
        }
   
        state.service[index].service.unshift(payload)
        
        
    },
    DELETE_SERVICE(state, payload){
        const i = state.service.findIndex(e=>e._id === payload.category_id)
        const j = state.service[i].service.findIndex(e=>e.serviceId === payload.service_id)
        state.service[i].service.splice(j, 1)
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
            commit('ADD_CATEGORY', res.data)
        })
        .catch((err)=>{console.log(err)})
    },

    deleteCategory({commit}, payload){
        this.$axios.delete(`/service/${payload}`, {
        }, {withCredentials: true})
        .then((res)=>{
            commit('DELETE_CATEGORY', payload)
        })
        .catch((err)=>{console.log(err)})
    },



    addService({commit, dispatch}, payload){
        this.$axios.put(`/service/${payload.categoryId}`, payload, {withCredentials: true})
        .then((res)=>{
            dispatch('fetchData')
        })
        .catch((err)=>{console.log(err)})
    },

    deleteService({commit}, payload){
        this.$axios.put(`/service/delete/${payload.category_id}`, payload, {withCredentials: true})
        .then((res)=>{
            commit('DELETE_SERVICE', payload)
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
            commit('FETCH_DATA', res.data)
        })
        .catch((err)=>{console.log(err)})
    },

    
}