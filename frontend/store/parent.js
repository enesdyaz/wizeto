export const state = () => ({
    category: [],
    categoryChild: []
})

export const mutations = {
    ADD_PARENT(state, payload){
        console.log(payload)
        state.category.unshift(payload)
    },
    ADD_CHILD(state, payload){
        console.log(payload)
        const index=state.category.findIndex(e=>e.id===payload.CategoryId)
        console.log(index)
        state.category[index].child[0].push(payload)

        
    },
    FETCH_DATA(state, payload){
        state.category = payload
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
    fetchData({commit}){
        this.$axios.get('/category/fetchData')
        .then((res)=>{
            console.log(res.data)
            commit('FETCH_DATA', res.data)
        })
    },
    addParent({commit}, payload){ 
        console.log('actions_addParent_payload', payload)
        this.$axios.post('category/addParent', {
            parent: payload.parent,
            child: [],
        }, {withCredentials:true})
        .then((res)=>{commit('ADD_PARENT', res.data)})
        .catch((err)=>{console.log(err)})

    },
    addChildData({commit}, payload){  // from Form
        commit('ADD_CHILD_DATA', payload)

        console.log('actions_addChild_payload', payload)

        this.$axios.post('category/addChild', {
            parentId: payload.parentId,
            name: payload.name,
            price: payload.price,
            duration: payload.duration,
            description: payload.description,
            image: payload.image,
        }, {withCredentials:true})
        .then((res)=>{commit('ADD_CHILD', res.data)})
        .catch((err)=>{console.log(err)})
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