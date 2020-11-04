export const state = () => ({
    service_category: [],
    service_items:[]
})

export const mutations = {
    addCategory(state, text) {
        // condition - if there is same data, the data cound't be added
        let condition = state.service_category.map(function(e){ return e.name}).indexOf(text)
        if(condition < 0){
            state.service_category.push({name:text, done: false})
        }else{return}
    },
    removeCategory(state, payload){
        console.log(payload)
        state.service_category.splice(state.service_category.indexOf(payload), 1)
    },

    addData(state, text) {
        state.service_items.push({
            id: text[0].service_id,
            name: text[0].service_name,
            price: text[0].service_price,
            duration: text[0].service_duration,
            category: text[0].service_category,
            description: text[0].service_description,
            image: text[0].service_image
        })
    },

    deleteData(state, id){
        const data = state.service_items.findIndex(v => v.id == id)
        console.log(data)
        state.service_items.splice(data, 1); 
    },

    updateData(state, text){
        console.log(text[0].service_id)
        var data = []
        const index = state.service_items.findIndex(v => v.id == text[0].service_id);
        state.service_items.map(function(e){
            if(e.id == text[0].service_id){
                e.name = text[0].service_name
                e.price = text[0].service_price
                e.duration = text[0].service_duration
                e.category = text[0].service_category
                e.description = text[0].service_description
                e.image = text[0].service_image
            }
        })
    },

    remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
    },
    
    toggle(state, todo) {
    todo.done = !todo.done
    }
}

export const actions = {
    editData({commit}, id){
        commit('EDIT_TODO', id)
    },
}


