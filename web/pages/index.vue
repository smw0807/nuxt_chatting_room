<template>
  <v-layout column>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <v-card class="mx-auto px-3" outlined max-width="1500">
          <v-card-title>
            채팅방 목록
            <v-spacer />
            <createRoom
              v-show="cUuserInfo"
              :open="isCreateRoomOpen"
              @inputData="createRoom"
              @close="createRoomClose"
            />
            <v-btn
              color="primary"
              dark
              outlined
              @click="isCreateRoomOpen = true"
            >
              방 만들기
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-card-text>
            <room-table />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import createRoom from "@/components/create-room";
import roomTable from "@/components/room-list";
/**
 * todo
 * 1. 방 리스트 props로 넘기기
 * 1-1. 방 리스트 컴포넌트에서 store 요청 로직 pages 쪽으로 빼기
 */
export default {
  components: {
    createRoom,
    roomTable,
  },
  name: "IndexPage",
  data() {
    return {
      isCreateRoomOpen: false,
      socket: null,
    };
  },
  mounted() {
    this.connectRoom();
  },
  computed: {
    cUuserInfo() {
      return this.$store.getters["user/info"];
    },
  },
  methods: {
    connectRoom() {
      if (!this.socket) {
        //채팅방 소켓 연결
        this.socket = this.$nuxtSocket({
          name: "main",
          channel: "/room",
          persist: true,
          emitTimeout: 1000,
        });
      }
      //방 리스트 가져오기
      this.socket.on("loadRoom", async () => {
        await this.$store.dispatch("room/list", {});
      });
    },
    async createRoom(v) {
      const rs = await this.$store.dispatch("room/create", v);
      if (rs.data.ok) {
        this.isCreateRoomOpen = false;
        this.$router.push("/chat/" + rs.data.result._id);
      } else {
        await this.$refs.dialog.open({
          mode: "alert",
          type: "error",
          title: "방 생성 실패",
          text: err.message,
        });
      }
    },
    createRoomClose(v) {
      this.isCreateRoomOpen = v;
    },
  },
};
</script>
