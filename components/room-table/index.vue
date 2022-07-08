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
              {{item.title}} <v-icon small>mdi-lock</v-icon> 
            </div>
            <div v-else>
              {{item.title}}
            </div>
          </td>
          <td>
            <v-btn @click="join(item._id)" small class="info">들어가기</v-btn>
          </td>
          <td>{{item.max}}</td>
          <td>{{item.owner}}</td>
          <td>{{item.createdDate}}</td>
        </tr>
      </template>
    </v-data-table>
    <div class="text-center">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
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
    list() {
      return this.$store.getters['room/list'];
    }
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      try {
        //todo 빈 파라메터는 나중에 검색 기능 추가할 때 사용하기
        await this.$store.dispatch('room/list', {}) 
      } catch (err) {
        console.error(err);
      }
      this.loading = false;
    },
    join(id) {
      this.$router.push(`/chat/${id}`);
    }
  }
}
</script>

<style>

</style>