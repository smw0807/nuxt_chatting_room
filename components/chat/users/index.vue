<template>
  <div>
     <v-navigation-drawer
      app
      clipped
      height="100%"
      >

      <v-list
        class="pl-14"
        shaped
      >
        <v-list-item
          v-for="(user, idx) in users"
          :key="idx"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{user.nickName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    users(v) {
      console.log('users : ' , v);
    }
  },
}
</script>

<style>

</style>