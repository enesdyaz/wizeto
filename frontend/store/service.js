
export const state = () => ({
    service: []
})



export const mutations = {
    ADD_CATEGORY(state, payload){
        console.log('ADD_CATEGORY', payload)
        if(state.service === null || undefined){
            state.service = []
        }
        state.service.unshift(payload)
    },
    DELETE_CATEGORY(state, payload){
        const index = state.service.findIndex(e=>e._id === payload)
        state.service.splice(index, 1)
    },
    UPDATE_CATEGORY(state, payload){
        console.log('UPDATE_CATEGORU의 페이로는', payload)
        const index = state.service.findIndex(e=>e._id === payload.id)
        state.service[index].category = payload.category
    },
    CATEGORY_TOGGLE(state, payload){
        const index = state.service.findIndex(e=>e._id === payload.id)
        state.service[index].toggle = true
    },


    
    ADD_SERVICE(state, payload){

        const index = state.service.findIndex(v => v._id == payload.categoryId)
        console.log('index', index)
        if(!state.service[index].service){
            state.service[index].service = []
        }
        state.service[index].service.unshift(payload)
    },
    DELETE_SERVICE(state, payload){
        console.log('DELETE PALYLOAD', payload)
        const i = state.service.findIndex(e=>e._id === payload.category_id)
        console.log('DELETE i', i)
        const j = state.service[i].item.findIndex(e=>e.serviceId === payload.service_id)
        console.log('DELETE j', j)
        state.service[i].item.splice(j, 1)
    },
    UPDATE_SERVICE(state, payload){

        const i = state.service.findIndex(e=>e._id === payload.parent_id)
        const j = state.service[i].service.findIndex(e=>e.serviceId === payload.id)
        console.log('UPDATE_SERVICE', i, j)
        state.service[i].service[j] = payload
        
    },


    FETCH_DATA(state, payload){
        state.service = payload
    }
}

export const actions= {
    addCategory({commit}, payload){
        this.$axios.post('/service', payload, {withCredentials: true})
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
    updateCategory({commit}, payload){
        this.$axios.put(`/service/update/${payload.id}`, payload, {withCredentials: true})
        .then((res)=>{
            commit('UPDATE_CATEGORY', payload)
        })
        .catch((err)=>{console.log(err)})
    },




    addService({commit, dispatch}, payload){
        console.log('addService', payload)
        this.$axios.put(`/service/${payload.categoryId}`, payload, {withCredentials: true})
        .then((res)=>{
            dispatch('fetchData')
        })
        .catch((err)=>{console.log(err)})
    },

    deleteService({dispatch}, payload){
        this.$axios.put(`/service/delete/${payload.sid}`, payload, {withCredentials: true})
        .then((res)=>{
            dispatch('fetchData')
        })
        .catch((err)=>{console.log(err)})
    },




    updateService({commit, dispatch}, payload){
        console.log('updateService', payload.parent_id)
        this.$axios.put(`/service/update/${payload.parent_id}`, payload, {withCredentials: true})
        .then((res)=>{
            // commit('UPDATE_SERVICE', payload)
            dispatch('fetchData')
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