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
        if (rs.data.ok) {
          commit('list', rs.data.result);
        } else { 
          commit('list', []);
          console.error(rs.data.msg);
          console.error(rs.data.result);
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    })
  },
  create({ commit }, params) {
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/room/create', params);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  }
}