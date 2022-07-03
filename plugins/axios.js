export default function({ $cookiz, $axios, store }) {
  //요청 부분
  $axios.onRequest(config => {
    config.timeout = 6000;
    config.headers['access-token'] = $cookiz.get('accessToken') || null;
    config.headers['refresh-token'] = $cookiz.get('refreshToken') || null;
    return config;
  })
  
  //응답 에러 부분
  $axios.onResponseError( async (error) => {
    if (!$cookiz.get('refreshToken'))
      store.commit('user/info', null);
  
    const errRes = error.response;
    const errApi = error.response.config;
    /**
     * accessToken 없을 경우 419 코드 받음.
     * refreshToken 검증 후 이상 없으면 재발급 받고 다시 진행
     */
    if (errRes.status === 419) { 
      const rs = await store.dispatch('user/refreshToken');
      if (rs) 
        return $axios(errApi);
      else {
        store.dispatch('user/signout');
      }
    }
    if (errRes.status === 401) //accessToken 조작 의심시 그냥 로그아웃
      store.dispatch('user/signout');
    
    return Promise.reject(error);
  })
}