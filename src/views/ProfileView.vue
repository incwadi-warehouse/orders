<script>
import AuthPassword from '@/components/auth/Password.vue'
import ProfileLocale from '@/components/profile/Locale.vue'
import ProfileTheme from '@/components/profile/Theme.vue'

export default {
  name: 'profile-view',
  components: {
    AuthPassword,
    ProfileLocale,
    ProfileTheme,
  },
  props: {
    auth: Object,
  },
  head: {
    title: 'Profile',
  },
}
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('profile') }}</h1>
    </b-container>

    <b-container size="m">
      <auth-password />
    </b-container>

    <b-container size="m">
      <profile-locale />
    </b-container>

    <b-container size="m">
      <profile-theme />
    </b-container>
  </article>
</template>
