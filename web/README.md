# 설명
NuxtJS를 이용한 채팅 웹 페이지

# 실행방법

## 1. 노드 패키지 설치
`cd web`   
`npm install`

## 2. .env 생성
```
### web ###
web_host=
web_port=

### token ### (server 쪽 env와 맞춰줘야함)
#accessToken 유효시간
access_time=
#accessToken 키값
access_key=

#refreshToken 유효시간
refresh_time=
#refreshToken 키값
refresh_key=

### proxy ###
api_host=
```   
예)
```
web_host=0.0.0.0
web_port=3000
access_time=1h
access_key=1q2w3e4r!!accesstoken
refresh_time=24h
refresh_key=1q2w3e4r@@refreshtoken
api_host=http://localhost:port or http://0.0.0.0:port
```

## 3. 싧행
```
# 개발모드 실행
npm run dev

# 빌드 및 실행
npm run build
npm run start
```
