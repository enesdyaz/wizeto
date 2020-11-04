export const state = () => ({
    mainPosts: [],

    hasMorePosts: true,  // infinite scrolling. 더 있으면 true, 이제 더 없으면 false로 바뀜
})

const limit = 10;

export const mutations = {
    ADD_MAIN_POST(state, payload){
        state.mainPosts.unshift(payload)  // 새로운 글 맨 앞으로 추가
    },
    REMOVE_MAIN_POST(state, payload){
        const index = state.mainPosts.findIndex(v=>v.id === payload.id)
        state.mainPosts.splice(index, 1)
    },
    ADD_COMMENT(state, payload){
        const index = state.mainPosts.findIndex(v => v.id === payload.PostId)
        console.log(index, payload.PostId, state.mainPosts)

        state.mainPosts[index].Comments.unshift(payload)  // 그 게시글에 댓글에 추가 (미리 comments를 만들어 놓음)
    },
    LOAD_POSTS(state){
        // 백엔드 없이 배열 만들기
        const fakePosts = Array(31).fill().map( v => ({
            id: parseInt(Math.random()*10000),
            user:{
                id: 1,
                nickName: 'harry'
            },
            content: `hello ${Math.random()}`,
            comment: [],
            images: []
        }))
        state.mainPosts = state.mainPosts.concat(fakePosts)   // mainPost에 배열 10개 넣기
        state.hasMorePosts = fakePosts.length === limit;   // infinite scrolling,  4 === 10 : false
    }
}

export const actions = {
    add({commit}, payload){
        commit('ADD_MAIN_POST', payload)
    },
    remove({commit}, payload){
        commit('REMOVE_MAIN_POST', payload)
    },
    addComment({commit}, payload){
        commit('ADD_COMMENT', payload)
    },


    // infinite Scrolling
    loadPosts({commit, state}, payload){
        if(state.hasMorePosts){
            commit('LOAD_POSTS', payload)
        }
        
    }

}