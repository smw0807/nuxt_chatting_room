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
    return Promise.reject(error);
  })
}