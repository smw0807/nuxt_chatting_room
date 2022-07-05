/**
 * 채팅방 내부 채팅 관련 스토어
 */

export const state = () => {
  return {
    // title: null, //채팅방 제목
    title: '방 제목이야.', //채팅방 제목
    // info: null, //방 정보
    info: {
      _id: '62c2c453956ce9f87dae7296',
      title: "bbbbbb",
      password: "123123",
      owner: "minu",
      max: 2,
      createdDate: '2022-07-04T10:43:31.760+00:00'
    }
  }
}

export const mutations = {
  title(state, payload) {
    state.title = payload;
  },
  info(state, payload) {
    state.info = payload;
  },
}

export const getters = {
  title(state) {
    return state.title;
  },
  info(state) {
    return state.info;
  }
}

export const actions = {
  connection( {commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const rs = await this.$axios.get('/api/room/' + params.id);
        console.log('rs : ', rs);
        resolve(true);
      } catch (err) {
        reject(err);
      }
    })
  }
}