<script>
export default {
  name: 'logo',
  setup() {
    const logo =
      process.env.VUE_APP_LOGO !== 'false' ? process.env.VUE_APP_LOGO : null

    return { logo }
  },
}
</script>

<template>
  <img :src="logo" alt="incwadi" v-if="logo" />
</template>
