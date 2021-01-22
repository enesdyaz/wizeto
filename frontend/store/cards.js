
export const state = () => ({
    imagePaths: "",
    cardData: [],
    phoneView: []
})

export const getters = {
    card1(state){
        const card = state.cardData
        console.log('card', card)
        if(!card) return ""

        const index = card.findIndex(e=>e.page === 1)
        console.log(index)
        if(index <0) return ""
        console.log('card = ', card[index])

        return card[index]
    },
}


export const mutations = {

    IMAGE_PATH(state, payload) {
        console.log('IMAGE_PATH', payload)
        state.imagePaths = payload
    },
    REMOVE_IMAGE(state, payload){
        console.log('REMOVE_IMAGE', payload)
        state.imagePaths = ""
    },
    ADD_CARDS(state, payload){
        if(state.cardData.length === 0) state.cardData = []
        state.cardData.push(payload)
    },
    UPDATE_CARDS(state, payload){
        const index = state.cardData.findIndex(e=>e.page === payload.page)
        state.cardData.splice(index, 1)
        state.cardData.push(payload)
    },
    REMOVE_CARDS(state, payload){
        const index = state.cardData.findIndex(e=>e.page === payload)
        state.cardData.splice(index, 1)
    },

    FETCH_DATA(state, payload){
        console.log('FETCH_DATA', payload)
        state.cardData = payload.cards
        state.phoneView = payload.phoneView[0].components
    },
    UPDATE_PHONE_VIEW(state, payload){
        state.phoneView = payload.components
    }
}

export const actions= {
    uploadImages({ commit }, payload) {
        console.log(payload)
        this.$axios.post('/cards/uploadImage', payload, {
        withCredentials: true,
        })
        .then((res) => {
            commit('IMAGE_PATH', res.data);
        })
        .catch((err) => {
            console.error(err);
        });
    }, 

    addCards({commit}, payload){
        console.log('addCards', payload)
        this.$axios.post('cards/addCards', payload, {withCredentials:true})
        .then((res)=>{
            console.log('addCard', res.data)
            commit('ADD_CARDS', payload)
        })
    },

    updateCards({commit}, payload){
        this.$axios.put('cards/updateCards', payload, {withCredentials:true})
        .then((res)=>{
            console.log('updateCard', res.data)
            commit('UPDATE_CARDS', payload)
        })
        .catch((err)=>{console.log(err)})
    },

    fetchData({commit}){
        this.$axios.get('cards/fetchData', {withCredentials: true} )
        .then((res)=>{
            commit('FETCH_DATA', res.data)
        })
    },
    removeCards({commit}, payload){
        this.$axios.delete(`cards/removeCards/${payload}`, {withCredentials:true})
        .then((res)=>{
            commit('REMOVE_CARDS', payload)
        })
    },

    updatePhoneView({commit}, payload){
        this.$axios.put('cards/updatePhoneView', payload, {withCredentials:true})
        .then((res)=>{commit('UPDATE_PHONE_VIEW', res.data)})
        .catch((err)=>{console.log(err)})

    }



}