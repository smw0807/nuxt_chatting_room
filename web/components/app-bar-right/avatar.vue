<template>
  <div>
    
    <v-avatar v-if="user.image !== ''"
      color="white"
      size="48"
      >
      <img :src="'/userProfiles/' + user.image" style="max-width:35px; max-height:35px;"/>
    </v-avatar>

    <v-avatar v-else
      color="blue lighter-4"
      size="48"
      >
      <v-icon dark >
        mdi-account-circle
      </v-icon>
    </v-avatar>

  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters['user/info'];
    }
  },
}
</script>

<style>

</style>