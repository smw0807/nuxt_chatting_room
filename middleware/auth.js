export default async function ( {$cookiz, store }) {
  try {
    const access = $cookiz.get('accessToken');
    const refresh = $cookiz.get('refreshToken');

    //accessToken 있으면 검증
    if (access) 
      await store.dispatch('user/verifyToken');
    
    //accessToken 만료로 재발급 받아야할 때
    if (!access)
      await store.dispatch('user/refreshToken');
    
    //refreshToken 없으면 로그아웃
    if (!refresh) 
      store.dispatch('user/signout');
    
  } catch (err) {
    console.error('middleware auth Error : ', err);
  }
}