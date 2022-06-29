/**
 * 사용자 관련 스토어
 */

export const state = () => {
  return {
    info: null,
    // info: {
    //   email: 'test@naver.com',
    //   name: 'minwoo',
    //   nickName: 'smw001',
    //   gender: 'male',
    //   // image: null
    //   image:'v.png'
    // },
  }
}

export const mutations = {
  info(state, data) {
    state.info = data;
  }
}

export const getters = {
  info(state) {
    return state.info;
  }
}

export const actions = {
  login({ commit }, params) { //로그인
    return new Promise( async (resolve, reject) => {

    })
  },
  signup({ commit }, params) { //회원가입
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/user/sign-up', params);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
  verifyToken({ commit }, params) { //토큰 검증
    return new Promise( async (resolve, reject) => {

    })
  },
  refreshToken({ commit }, params) { //토큰 재발급
    return new Promise( async (resolve, reject) => {

    })
  },
  getInfo({ commit }, params) { //토큰으로 사용자 정보 가져오기 //userInfo가 null일 때만 사용?
    return new Promise( async (resolve, reject) => {

    })
  },
}