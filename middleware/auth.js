export default async function ( {$cookiz, store }) {
  try {
    console.log('auth!!!!!!');
    /** 
     * 쿠키 토큰 체크
     * 유저 정보 체크 (스토어 user/info)
     * 
     * 토큰, 유저정보 둘다 있을 때
     * 토큰 정보 있고 유저정보 없을때
     * 토큰 만료 후 유저 정보 있을 때
     * 튜큰, 유저정보 둘다 없을 때
     */
    const access = $cookiz.get('accessToken');
    const refresh = $cookiz.get('refreshToken');
    const user = store.getters['user/info'];
    console.log('access : ', access);
    console.log('refresh : ', refresh);
    console.log(user);

    //토큰, 유저정보 둘다 있으면 토큰 검증
    if (access && user) {
      console.log('둘다 있음');
      const rs = await store.dispatch('user/verifyToken');
      console.log(rs);
    }
    if (access && !user) {
      /**
       * 새로 고침등의 이유로 토큰은 있는데 스토어에 유저 정보가 없을 경우.
       * 토큰 검증해서 이상이 없으면 다시 유저정보를 가져옴
       */
      const rs = await store.dispatch('user/getInfo');
      if (rs.data.ok) {
        store.commit('user/info', rs.data.result);
      } else {
        store.commit('user/info', null);
      }
      console.log('getInfo : ', rs);
    }
    if (!refresh) {
      console.log('refresh 없음');
    }
  } catch (err) {
    console.error('middleware auth Error : ', err);
  }
  



}