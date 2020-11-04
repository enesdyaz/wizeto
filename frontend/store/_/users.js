export const state = () => ({
    me: null,

    followingList: [{id: 1, nickName: 'SNSD'}, {id: 2, nickName: 'EXO'}, {id: 3, nickName: 'BlackPink'},],
    followerList: [{id: 1, nickName: 'harry'},{id: 2, nickName: 'jane'},{id: 3, nickName: 'jayden'},{id: 4, nickName: 'henry'}],
})


export const mutations = {  // 동기적 작업은 여기에 넣어주세요
    SETME(state, payload){
        state.me = payload;
    },
    CHANGE_NICKNAME(state, payload){
        state.me.NickName = payload.NickName
    },


    ADD_FOLLOWING(state, payload){
        state.followingList.push(payload)
    },
    ADD_FOLLOWER(state, payload){
        state.followerList.push(payload)

    },
    REMOVE_FOLLOWING(state, payload){
        const index = state.followingList.findIndex(v => v.id === payload.id)
        state.followingList.splice(index, 1)
    },
    REMOVE_FOLLOWER(state, payload){
        const index = state.followerList.findIndex(v => v.id === payload.id)
        state.followerList.splice(index, 1)
    },

}


export const actions = {  // context안에는 {dispatch, , commit, state, rootState, getters, rootGetters}
    signUp({commit}, payload){
        console.log(payload)
        this.$axios.post('http://localhost:3001/user', {
            email: payload.email,
            nickName: payload.nickName,
            password: payload.password    
        }, { withCredentials: true }).then((res)=>{
            console.log(res)
            commit('SETME', res.data);
        }).catch((err)=>{console.log(err)})
      
    },  

    logIn({commit}, payload){
        this.$axios.post('http://localhost:3001/user/login', {
            email: payload.email,
            password: payload.password    
        }, { withCredentials: true }).then((res)=>{
            console.log(res)
            commit('SETME', res.data);
        }).catch((err)=>{console.log(err)})
     
    },

    logOut({commit}){
        this.$axios.post('http://localhost:3001/user/logout', {}, {withCredentials: true})
        .then((data)=>{
            console.log(data)
            console.log('logout was good')
            commit('SETME', null);
        }).catch((err)=>{console.log(err)})
     
    },
    changeNickname({commit}, payload){
        commit('CHANGE_NICKNAME', payload)
    },


    addFollowing({commit}, payload){
        commit('ADD_FOLLOWING', payload)
    },
    addFollower({commit}, payload){
        commit('ADD_FOLLOWER', payload)
    },
    removeFollowing({commit}, payload){
        commit('REMOVE_FOLLOWING', payload)
    },
    removeFollower({commit}, payload){
        commit('REMOVE_FOLLOWER', payload)
    },


}  // 비동기는 여기에 넣어주세요