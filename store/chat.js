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
  users( { commit }, params) { //접속한 채팅방 접속자들 정보
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/chat/chatUsers', params);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
}