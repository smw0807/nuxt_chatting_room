/**
 * 채팅방 내부 채팅 관련 스토어
 */

export const state = () => {
  return {
    title: '', //채팅방 제목
    drawer: false, //접속중 사용자 네비게이션 드로우
    users: [], //방에 접속중인 사람들
  }
}

export const mutations = {
  title(state, payload) {
    state.title = payload;
  },
  drawer(state, payload) {
    state.drawer = payload;
  },
  users(state, payload) {
    state.users = payload;
  }, 
  
}

export const getters = {
  title(state) {
    return state.title;
  },
  drawer(state) {
    return state.drawer;
  },
  users(state) {
    return state.users;
  },
  
}

export const actions = {
  sendMessage({}, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/chat/sendMessage', params);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  }
}