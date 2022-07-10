<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="list"
      :loading="loading"
      :page.sync="page"
      :item-per-page="itemsPerPage"
      @page-count="pageCount = $event"
      no-data-text="생성된 방이 없습니다."
      hide-default-footer
      >
      <template v-slot:[`item`]="{item, index}">
        <tr class="text-center">
          <td>{{list.length - index}}</td>
          <td>
            <div v-if="item.password === '' || item.password === null">
              {{item.title}}
            </div>
            <div v-else>
              {{item.title}} <v-icon small>mdi-lock</v-icon> 
            </div>
          </td>
          <td>
            <join :roomInfo="item" />
          </td>
          <td>{{item.max}}</td>
          <td>{{item.owner}}</td>
          <td>{{item.createdDate | ft_date}}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import join from './join-room-button';
export default {
  components: {
    join
  },
  data() {
    return {
      loading: false,
      headers: [
        { text: 'No.', value: '_id', align: 'center', width: '10%', sortable: false},
        { text: '방제목', value: 'title', align: 'center' },
        { text: '-', value: 'max', align: 'center', width: '15%'},
        { text: '허용인원', value: 'max', align: 'center', width: '15%'},
        { text: '생성자', value: 'owner', align: 'center', width: '20%'},
        { text: '생성일', value: 'createdDate', align: 'center', width: '10%'},
      ],
      page: 1,
      pageCount: 0,
      itemsPerPage: 10,
    }
  },
  computed: {
    list() { //방 리스트 정보
      return this.$store.getters['room/list'];
    },
    user() { //현재 로그인 한 사용자 정보
      return this.$store.getters['user/info'];
    }
  },
  created() {
    this.getList();
  },
  filters: {
    ft_date(v) {
      return moment(v).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        await this.$store.dispatch('room/list', {}) 
      } catch (err) {
        console.error(err);
      }
      this.loading = false;
    },
  }
}
</script>

<style>

</style>