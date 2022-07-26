# nuxt_chatting_room
vue2 기반 nuxt와 socket.io nuxt-socket-io를 이용한 채팅방
# 만든 이유
항상 새로운 걸 습득하기 위해 공부하다 보면 꼭 아무리 봐도 머리속에 안들어오는 것들이 있는데, 그중 하나가 웹소켓이였음. <br>책을 통해 socket.io를 이용한 채팅방 구현을 따라 하면서 드디어 좀 이해가 좀 되길래 제대로 머리 속에 집어 넣기 위해선 이걸 이용해 다른걸 만들어 봐야할 것 같았음. <br>
개인 적으로 Vue가 재밌기도 했고 요근래 회사에서 Vue를 너무 못하다 보니 까먹을 것 같아서 Vue를 이용해 만들어보고 싶었고 NuxtJS가 편리해서 NuxtJs를 선택함.<br>
처음 목적은 간단하게 만드는 거였지만, 욕심이 생겨 기능을 하나하나 추가하다 보니 작업이 길어짐...<br>

블로그 : https://minu0807.tistory.com/137

# 사용한 것
Vue2, NuxtJS, Vuetify, Express, mongodb(mongoose), JWT, Socket.IO, nuxt-socket-io 등...

# 실행 방법
## npm install
nuxt_chatting_room 에서 `npm i` 그리고 server 디렉터리에서도 `npm i`로 npm 모두 설치.
## .env
nuxt_chatting_room, server 디렉터리에 각각 .env 파일 생성
### env 옵션
```
### web ###
host=
port=

### MongoDB ###
mongo_url=
mongo_db=

### token ###
access_time=
access_key=
refresh_time=
refresh_key=

### proxy ###
api_host=
```
양 쪽에 필요한 이유는 `npm run dev_all` 때문에 양쪽에 필요함.

### 명령어
```
# nuxt_chatting_room 실행 (개발모드)
npm run dev

# server 실행
cd server
npm start

# 웹, 서버 동시 실행 (개발모드로)
npm run dev_all

# 빌드 및 실행
npm run build
npm run start

cd server
npm start

# 빌드 및 동시 실행
npm run build
npm run start_all
```
