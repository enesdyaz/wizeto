
export const state = () => ({
    service: [],
    imagePath: "",
})

export const getters = {
    booking_date(state){
        const data = state.service.service
        console.log('booking/state -> data', data)
        if(data === undefined || null) return
        
        var array = []
        for(var i=0;i<data.length;i++){
            array.push(data[i].item)            
        }
        const reducer = array.reduce((acc, cur)=> acc.concat(cur))
        const arr = new Array(reducer)
        console.log(arr)
        
        return reducer
    }
    
}

export const mutations = {
    ADD_CATEGORY(state, payload){
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
        const index = state.service.findIndex(e=>e._id === payload.id)
        state.service[index].category = payload.category
    },
    CATEGORY_TOGGLE(state, payload){
        const index = state.service.findIndex(e=>e._id === payload.id)
        state.service[index].toggle = true
    },


    
    ADD_SERVICE(state, payload){
        const index = state.service.findIndex(v => v._id == payload.categoryId)
        if(!state.service[index].service){
            state.service[index].service = []
            }
        state.service[index].service.unshift(payload)
    },
    DELETE_SERVICE(state, payload){
        const i = state.service.findIndex(e=>e._id === payload.category_id)
        const j = state.service[i].item.findIndex(e=>e.serviceId === payload.service_id)
        state.service[i].item.splice(j, 1)
    },
    UPDATE_SERVICE(state, payload){
        const i = state.service.findIndex(e=>e._id === payload.parent_id)
        const j = state.service[i].service.findIndex(e=>e.serviceId === payload.id)
        state.service[i].service[j] = payload
    },

    IMAGE_PATH(state, payload) {
        state.imagePath = state.imagePath.concat(payload);
    },
    DELETE_IMAGE(state){
        state.imagePath = ""
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
        this.$axios.put(`/service/${payload.id}`, payload, {withCredentials: true})
        .then((res)=>{
            commit('UPDATE_CATEGORY', payload)
        })
        .catch((err)=>{console.log(err)})
    },




    addService({commit, dispatch}, payload){
        this.$axios.put(`/service/addService/${payload.categoryId}`, payload, {withCredentials: true})
        .then((res)=>{
            dispatch('fetchData')
        })
        .catch((err)=>{console.log(err)})
    },
    deleteService({dispatch}, payload){
        this.$axios.put(`/service/deleteService/${payload.sid}`, payload, {withCredentials: true})
        .then((res)=>{
            dispatch('fetchData')
        })
        .catch((err)=>{console.log(err)})
    },
    async updateService({commit, dispatch}, payload){
        try{
            const update = await this.$axios.put(`/service/updateService/${payload.parent_id}`, payload, {withCredentials: true})
            console.log('updateService', update)
            dispatch('fetchData')
        }
        catch(err){console.log(err)}
            
        
    },



    uploadImages({ commit }, payload) {
        this.$axios.post('/service/uploadImage', payload, {
        withCredentials: true,
        })
        .then((res) => {
            console.log('uploadImage', res.data)
            commit('IMAGE_PATH', res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    },   
    

    fetchData({commit}){
        this.$axios.get('/service', {withCredentials:true})
        .then((res)=>{
            console.log('fetchData', res.data)
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

