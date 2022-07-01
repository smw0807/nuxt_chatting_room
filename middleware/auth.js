export default async function ( {$cookiz, store }) {
  try {
    const access = $cookiz.get('accessToken');
    const refresh = $cookiz.get('refreshToken');
    const user = store.getters['user/info'];

    //토큰, 유저정보 둘다 있으면 토큰 검증
    if (access && user) 
      await store.dispatch('user/verifyToken');
    
    //새로고침 등의 이유로 쿠키에 토큰은 있는데, 스토어에 데이터가 없을 경우.
    if (access && !user)
      await store.dispatch('user/getInfo');
    
    //accessToken 만료로 재발급 받아야할 때
    if (!access && refresh)
      await store.dispatch('user/refreshToken');
    
    //refreshToken 없으면 로그아웃
    if (!refresh) 
      store.dispatch('user/signout');
    
  } catch (err) {
    console.error('middleware auth Error : ', err);
  }
}