# 설명
채팅방 리스트 및 채팅 메세지를 처리하는 소켓서버

# 실행방법

## 1. 노트 패키지 설치
`cd server`   
`npm install`   

## 2. .env 생성
server 디렉터리 안에 .env 파일생성 후 아래 내용 작성
```
### server ###
server_protocol=
server_host=
server_port=

### MongoDB ###
#몽고디비 URL
mongo_url=
mongo_db=

### token ### (web 쪽 env와 맞춰줘야함)
#accessToken 유효시간
access_time=
#accessToken 키값
access_key=

#refreshToken 유효시간
refresh_time=
#refreshToken 키값
refresh_key=
```
예)
```
server_protocol=http
server_host=0.0.0.0 or localhost
server_port=5000
mongo_url=mongodb+srv://[id]:[passwd]@[name].ybmbj.mongodb.net/?retryWrites=true&w=majority
mongo_db=dbName
access_time=1h
access_key=1q2w3e4r!
refresh_time=24h
refresh_key=1q2w3e4r@
```

## 3. 실행
`npm start`