export const state = () => ({
    category: []
})

export const mutations = {
    ADD_PARENT(state, payload){
        state.category.unshift(payload)
    },
    ADD_CHILD(state, payload){
        state.category[payload.index].child.unshift(payload)
    },
    TOGGLE(state, payload){
        const index = state.category.findIndex(function (v){return v.id === payload})
        state.category[index].toggle = !state.category[index].toggle 
    },
    DELETE_CATEGORY(state, payload){
        const index = state.category.findIndex(function (v){return v.id === payload})
        state.category.splice(index, 1)
    },
    ADD_CHILD_DATA(state, payload){
        const index = state.category.findIndex(function (v){return v.id === payload.id})
    },

    // Parent Data from category form //
    ADD_PARENT_DATA(state, payload){
        const index = state.category.findIndex(function (v){return v.id === payload.parentId})
        state.category[index].content.push(payload)
    },
    DELETE_PARENT_DATA(state, payload){
        const parent_id = state.category.findIndex(e=>e.id === payload.parent_id)
        const content_id = state.category.find(e=>e.id === payload.parent_id).content.findIndex(f=>f.id === payload.id)
        state.category[parent_id].content.splice(content_id, 1)
    },
    UPDATE_PARENT_DATA(state, payload){
        const parent_id = state.category.findIndex(e=>e.id === payload.parent_id)
        const content_id = state.category.find(e=>e.id === payload.parent_id).content.findIndex(f=>f.id === payload.id)


        state.category[parent_id].content[content_id].name = payload.name
        state.category[parent_id].content[content_id].description = payload.description
        state.category[parent_id].content[content_id].price = payload.price
        state.category[parent_id].content[content_id].duration = payload.duration
        state.category[parent_id].content[content_id].image = payload.image
    },

    REMOVE_CATEGORY(state, payload){
        const index = state.category.findIndex(v=>v.id === payload)
        state.category.splice(index, 1)
    }


}

export const actions= {
    addParent({commit}, payload){         // from category(Parent)
        commit('ADD_PARENT', payload)
    },
    addChild({commit}, payload){      // from category(child)
        commit('ADD_CHILD', payload)
    },
    toggle({commit}, payload){          // admin toggle
        commit('TOGGLE', payload)
    },
    delete({commit}, payload){          // admin only / remove Parent 
        commit('DELETE_CATEGORY', payload)
    },
    addChildData({commit}, payload){  // from Form
        commit('ADD_CHILD_DATA', payload)
    },


    addParentData({commit}, payload){  // from Form
        commit('ADD_PARENT_DATA', payload)
    },
    deleteParentData({commit}, payload){
        commit('DELETE_PARENT_DATA', payload)
    },
    updateParentData({commit}, payload){
        commit('UPDATE_PARENT_DATA', payload)
    },
    
    removeCategory({commit}, payload){
        commit('REMOVE_CATEGORY', payload)
    }
}