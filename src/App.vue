<template>
  <b-app>
    <b-masthead>
      <b-masthead-item type="start" v-if="auth.state.isAuthenticated">
        <span @click="isDrawerActive = true">
          <b-icon type="hamburger" />
        </span>
      </b-masthead-item>

      <b-masthead-item type="center">
        <a :href="catalog">
          <logo v-if="hasLogo" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 200 200"
            class="logo"
            v-else
          >
            <path
              d="M 27.435547 9.8710938 C 17.706307 9.8710935 9.8710935 17.706307 9.8710938 27.435547 L 9.8710938 172.56445 C 9.8710935 182.29369 17.706307 190.12891 27.435547 190.12891 L 172.56445 190.12891 C 182.29369 190.12891 190.12891 182.29369 190.12891 172.56445 L 190.12891 27.435547 C 190.12891 17.706307 182.29369 9.8710938 172.56445 9.8710938 L 27.435547 9.8710938 z M 55 40 L 145 40 L 145 160 L 100 124 L 55 160 L 55 40 z "
            />
          </svg>
        </a>
      </b-masthead-item>

      <b-masthead-item type="end" v-if="auth.state.isAuthenticated">
        <b-dropdown position="bottom" class="action">
          <template #selector>
            <span @click.prevent>
              <b-icon type="profile" />
            </span>
          </template>
          <b-dropdown-item no-hover v-if="auth.state.me">
            {{ $t('hello') }}, {{ auth.state.me.username }}!
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item @click.prevent="$router.push({ name: 'profile' })">
            {{ $t('settings') }}
          </b-dropdown-item>
          <b-dropdown-item @click.prevent="auth.logout()">
            {{ $t('logout') }}
          </b-dropdown-item>
        </b-dropdown>

        <b-dropdown position="bottom" class="action">
          <template #selector>
            <span @click.prevent>
              <b-icon type="star" />
            </span>
          </template>
          <b-dropdown-item
            v-for="item in bookmark.state.bookmarks"
            :key="item.id"
            @click.prevent="bookmark.open(item.url)"
          >
            {{ item.name }}
          </b-dropdown-item>

          <b-dropdown-divider />

          <b-dropdown-item icon="plus" @click="bookmark.createFromPage()">
            {{ $t('addThisPage') }}
          </b-dropdown-item>
          <b-dropdown-item icon="star" @click="navigateToBookmarks">
            {{ $t('bookmarks') }}
          </b-dropdown-item>
        </b-dropdown>

        <span
          class="action"
          @click.prevent="$router.push({ name: 'reservation' })"
        >
          <b-badge
            :content="
              stateReservation.reservations &&
              stateReservation.reservations.length
            "
            hide-empty
          >
            <b-icon type="euro" />
          </b-badge>
        </span>
      </b-masthead-item>
    </b-masthead>

    <router-view :auth="auth" v-if="auth.state.isAuthenticated" />

    <b-container size="s" v-if="!auth.state.isAuthenticated">
      <h1>{{ $t('login') }}</h1>
      <auth-login />
    </b-container>

    <b-container size="m">
      <div v-html="about" />
    </b-container>

    <b-drawer
      :active="isDrawerActive"
      collapsable
      @open-menu="isDrawerActive = true"
      @close-menu="isDrawerActive = false"
    >
      <div :style="{ padding: '20px' }">
        <b-list divider>
          <template #title>
            <a :href="catalog + '/search'">
              {{ $t('search') }}
            </a>
          </template>
        </b-list>
        <b-list :route="{ name: 'reservation' }" divider>
          <template #title>
            {{ $t('reservation') }}
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="catalog + '/directory'">
              {{ $t('directory') }}
            </a>
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="settings + '/'">
              {{ $t('settings') }}
            </a>
          </template>
        </b-list>
        <b-list divider>
          <template #title>
            <a :href="find">
              {{ $t('find') }}
            </a>
          </template>
        </b-list>
      </div>
    </b-drawer>

    <div class="project">
      <a href="https://github.com/incwadi-warehouse/docu"
        >A baldeweg Open Source project</a
      >
    </div>

    <b-toast v-if="current" :type="current.type" :visible="true">{{
      current.body
    }}</b-toast>
  </b-app>
</template>

<script>
import Logo from './components/Logo'
import AuthLogin from '@/components/auth/Login'
import useAuth from '@/composables/useAuth'
import useBookmark from '@/composables/useBookmark'
import useToast from './../node_modules/@baldeweg/components/src/composables/useToast'
import useReservation from '@/composables/useReservation'
import router from '@/router'
import { onMounted, onUnmounted, ref } from '@vue/composition-api'

export default {
  name: 'app',
  components: {
    Logo,
    AuthLogin,
  },
  head: {
    title: 'Home',
    titleTemplate: (title) => {
      return title ? title + ' - ' + 'incwadi Warehouse' : 'incwadi Warehouse'
    },
  },
  setup() {
    const auth = useAuth()

    const find = process.env.VUE_APP_FIND

    const catalog = process.env.VUE_APP_CATALOG

    const settings = process.env.VUE_APP_SETTINGS

    const about = process.env.VUE_APP_ABOUT

    const hasLogo = process.env.VUE_APP_LOGO === 'false' ? false : true

    const isDrawerActive = ref(false)

    onMounted(() => {
      router.beforeEach((_to, _from, next) => {
        isDrawerActive.value = false
        next()
      })
    })

    const bookmark = useBookmark()

    let bookmarkInterval = null

    const refresh = () => {
      bookmarkInterval = setInterval(bookmark.list, 5000)
    }

    onMounted(refresh)

    onUnmounted(() => {
      clearInterval(bookmarkInterval)
    })

    const { current } = useToast()

    const { state: stateReservation, list: listReservations } = useReservation()

    listReservations()

    const reservationInterval = setInterval(listReservations, 5000)

    onUnmounted(() => {
      window.clearInterval(reservationInterval)
    })

    const navigateToBookmarks = () => {
      window.location = settings + '/bookmark'
    }

    return {
      auth,
      find,
      catalog,
      settings,
      about,
      hasLogo,
      isDrawerActive,
      bookmark,
      current,
      stateReservation,
      navigateToBookmarks,
    }
  },
}
</script>

<style scoped>
.logo {
  fill: var(--color-primary-10);
}
.action {
  float: right;
  margin-left: 20px;
}
.project {
  text-align: right;
  font-size: 0.6rem;
  margin: 0 20px;
}
.project a,
.project a:hover {
  color: var(--color-neutral-04);
}
</style>
