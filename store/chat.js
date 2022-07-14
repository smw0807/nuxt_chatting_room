/**
 * 채팅방 내부 채팅 관련 스토어
 */

export const state = () => {
  return {
    title: '', //채팅방 제목
    users: [], //방에 접속중인 사람들
  }
}

export const mutations = {
  title(state, payload) {
    state.title = payload;
  },
  users(state, payload) {
    state.users = payload;
  }, 
  
}

export const getters = {
  title(state) {
    return state.title;
  },
  users(state) {
    return state.users;
  },
  
}

export const actions = {
}