/**
 * 채팅방 관련 스토어
 */

export const state = () => {
  return {
    list: [],
  }
}

export const mutations = {
  list(state, payload) {
    state.list = payload;
  },
}

export const getters = {
  list(state) {
    return state.list;
  },
}

export const actions = {
  list({ commit }, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/room/list', params);
        console.log('rs : ', rs);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
  create({ commit }, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/room/create', params);
        console.log('rs : ', rs);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  }
}