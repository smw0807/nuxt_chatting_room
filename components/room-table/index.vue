<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="list"
      :loading="loading"
      no-data-text="생성된 방이 없습니다."
      hide-default-footer
    >

    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      headers: [
        { text: 'No.', value: '_id', align: 'center', width: '10%'},
        { text: '방제목', value: 'title', align: 'center', width: '45%'},
        { text: '참가인원', value: 'max', align: 'center', width: '15%'},
        { text: '생성자', value: 'owner', align: 'center', width: '20%'},
        { text: '생성일', value: 'createdDate', align: 'center', width: '10%'},
      ]
    }
  },
  computed: {
    list() {
      return this.$store.getters['room/list'];
    }
  }
}
</script>

<style>

</style>