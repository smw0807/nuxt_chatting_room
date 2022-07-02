export default function({ $cookiz, $axios, store }) {
  //요청 부분
  $axios.onRequest(config => {
    config.timeout = 6000;
    config.headers['access-token'] = $cookiz.get('accessToken') || null;
    config.headers['refresh-token'] = $cookiz.get('refreshToken') || null;
    return config;
  })
  
  //응답 에러 부분
  $axios.onResponseError( error => {
    console.log('axios Error : ', error);
    if (!$cookiz.get('refreshToken'))
      store.commit('user/info', null);
  
    const errRes = error.response;
    console.log('1 : ', errRes);
    const errApi = error.response.config;
    console.log('2 : ', errApi);
    return Promise.reject(error);
  })
}