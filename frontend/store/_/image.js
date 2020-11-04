export const state = () => ({
    imageData: '',
    carouselData:[]
})

export const mutations = {
    ADD_DATA(state, payload){
        state.imageData = payload
    },
    ADD_CAROUSEL_DATA(state, payload){
        state.carouselData = payload
    },
    DELETE_CAROUSEL_DATA(state, index){
        state.carouselData.carouselImage.splice(index, 1)
    }
}

export const actions = {
    addData({commit}, payload){
        commit('ADD_DATA', payload)
    },
    addCarouselData({commit}, payload){
        console.log(payload)
        commit('ADD_CAROUSEL_DATA', payload)
    },
    deleteCarouselData({commit}, index){
        console.log(index)
        commit('DELETE_CAROUSEL_DATA', index)
    }
    
}