/**
 * 사용자 관련 스토어
 * 
 * 쿠키
 * https://www.npmjs.com/package/cookie-universal-nuxt
 */

import { strTimeToSeconds } from '~/utils/converts'

export const state = () => {
  return {
    info: null,
    // info: {
    //   email: 'test@naver.com',
    //   name: 'minwoo',
    //   nickName: 'smw001',
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
  signin({ commit }, params) { //로그인
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/user/sign-in', params);
        if (rs.data.ok) {
          commit('info', rs.data.result.rtUser);
          const { access, refresh } = rs.data.result.token;
          this.$cookiz.set('accessToken', access, { path: '/', maxAge: strTimeToSeconds(this.$config.access_time) });
          this.$cookiz.set('refreshToken', refresh, { path: '/', maxAge: strTimeToSeconds(this.$config.refresh_time) });
        }
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
  signup({}, params) { //회원가입
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/user/sign-up', params);
        resolve(rs);
      } catch (err) {
        reject(err);
      }
    })
  },
  signout({ commit }) { //로그아웃
    commit('info', null);
    this.$cookiz.remove('accessToken');
    this.$cookiz.remove('refreshToken');
  },
  verifyToken({ commit }) { //토큰 검증
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/auth/verify');
        if (!rs.data.ok) {
          commit('info', null);
          this.$cookiz.remove('accessToken');
          this.$cookiz.remove('refreshToken');
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    })
  },
  refreshToken({ commit }) { //토큰 재발급
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/auth/refresh');
        if (rs.data.ok) {
          commit('info', rs.data.result.rtUser);
          const { access, refresh } = rs.data.result.token;
          this.$cookiz.set('accessToken', access, { path: '/', maxAge: strTimeToSeconds(this.$config.access_time) });
          this.$cookiz.set('refreshToken', refresh, { path: '/', maxAge: strTimeToSeconds(this.$config.refresh_time) });
          resolve(true);
        } else {
          commit('info', null);
          resolve(false);
        }
      } catch (err) {
        reject(err);
      }
    })
  },
  getInfo({ commit }) { //토큰으로 사용자 정보 가져오기 //userInfo가 null일 때만 사용?
    return new Promise( async (resolve, reject) => {
      try {
        const rs = await this.$axios.post('/api/user/getUser');
        if (rs.data.ok) {
          commit('info', rs.data.result);
        } else {
          commit('info', null);
          this.$cookiz.remove('accessToken');
          this.$cookiz.remove('refreshToken');
        }
        resolve(true);
      } catch (err) {
        reject(err);
      }
    })
  },
}