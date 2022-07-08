/**
 * 채팅방 내부 채팅 관련 스토어
 */

export const state = () => {
  return {
    title: null, //채팅방 제목
    // title: '방 제목이야.', //채팅방 제목
  }
}

export const mutations = {
  title(state, payload) {
    state.title = payload;
  },
  
}

export const getters = {
  title(state) {
    return state.title;
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