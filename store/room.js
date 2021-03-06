/**
 * 채팅방 관련 스토어
 */

export const state = () => {
  return {
    list: [],
    info: null, //접속한 방 정보
  }
}

export const mutations = {
  list(state, payload) {
    state.list = payload;
  },
  info(state, payload) {
    state.info = payload;
  },
}

export const getters = {
  list(state) {
    return state.list;
  },
  info(state) {
    return state.info;
  }
}

export const actions = {
  list({ commit }, params) { //채팅방 리스트 불러오기
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
  create({ commit }, params) { //채팅방 만들기
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/room/create', params);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
  connection( {commit }, params) { //채팅방 접속
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.get('/api/room/join/' + params.id);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
}