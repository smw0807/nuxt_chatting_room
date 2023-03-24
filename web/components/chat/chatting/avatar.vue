<template>
  <div>

    <v-avatar v-if="image !== ''"
      color="white"
      size="35"
      >
      <img :src="'/userProfiles/' + image" style="max-width:25px; max-height:25px;"/>
    </v-avatar>

    <v-avatar v-else
      color="blue lighter-4"
      size="35"
      >
      <v-icon dark >
        mdi-account-circle
      </v-icon>
    </v-avatar>
    
  </div>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      default: ''
    }
  },
}
</script>

<style>

</style>