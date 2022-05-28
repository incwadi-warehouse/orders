<script>
import { useReservation } from '@/composables/useReservation.js'
import { computed, ref, watchEffect } from '@vue/composition-api'
import dayjs from 'dayjs'

export default {
  name: 'reservation-show',
  props: {
    reservationId: String,
  },
  setup(props) {
    const catalog = process.env.VUE_APP_CATALOG

    const { reservation, show, update, remove } = useReservation()

    show(props.reservationId)

    const collectionDate = ref(null)
    const collectionTime = ref('00:00')

    watchEffect(() => {
      if (reservation.value === null || reservation.value.collection === null)
        return

      let date = new Date(reservation.value.collection * 1000)

      let month = formatNumber(date.getMonth() + 1)
      let day = formatNumber(date.getDate())
      collectionDate.value = date.getFullYear() + '-' + month + '-' + day

      let hours = formatNumber(date.getHours())
      let minutes = formatNumber(date.getMinutes())
      collectionTime.value = hours + ':' + minutes
    })

    const collectionTimestamp = computed(() => {
      let date = new Date(
        collectionDate.value + ' ' + collectionTime.value + 'Z'
      )

      return date.getTime() / 1000 || 0
    })

    const diff = computed(() => {
      const duration = dayjs().diff(dayjs.unix(reservation.value.createdAt))

      return Math.round(duration / 1000 / 86400)
    })

    const toLocaleDateString = (data) => {
      let date = new Date(data * 1000)

      return date.toLocaleString()
    }

    const formatNumber = (number) => {
      if (number <= 9) {
        return '0' + number
      }
      return number
    }

    return {
      catalog,
      reservation,
      collectionDate,
      collectionTime,
      collectionTimestamp,
      toLocaleDateString,
      diff,
      update,
      remove,
    }
  },
}
</script>

<template>
  <div class="reservation" v-if="reservation">
    <p>
      {{ $t('createdAt') }}: {{ toLocaleDateString(reservation.createdAt) }}
    </p>

    <b-alert type="error" v-if="diff > 14">{{
      $t('old_reservation', { days: diff })
    }}</b-alert>

    <ul>
      <li v-for="book in reservation.books" :key="book.id">
        <a :href="catalog + '/search/book/' + book.id">
          {{ book.title }} - {{ book.genre.name }} - {{ book.author.surname }},
          {{ book.author.firstname }}
          <span v-if="book.sold"> - {{ $t('sold') }}</span>
          <span v-if="book.removed"> - {{ $t('removed') }}</span>
        </a>
      </li>
    </ul>

    <b-form @submit.prevent="update">
      <b-form-group>
        <b-form-item>
          <b-form-label for="date">
            {{ $t('date') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="date" v-model="collectionDate" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="time">
            {{ $t('time') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="time" id="time" v-model="collectionTime" />
        </b-form-item>
      </b-form-group>

      <b-form-input
        type="hidden"
        id="collection"
        v-model="collectionTimestamp"
      />

      <b-form-group>
        <b-form-item>
          <b-form-label for="salutation">
            {{ $t('salutation') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-select
            :items="[
              { key: 'm', value: $t('mr') },
              { key: 'f', value: $t('mrs') },
              { key: 'd', value: $t('none_divers') },
            ]"
            id="salutation"
            v-model="reservation.salutation"
          />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="firstname">
            {{ $t('firstname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="text"
            id="firstname"
            v-model="reservation.firstname"
          />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="surname">
            {{ $t('surname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input
            type="text"
            id="surname"
            v-model="reservation.surname"
          />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="mail">
            {{ $t('mail') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="email" id="mail" v-model="reservation.mail" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="phone">
            {{ $t('phone') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="tel" id="phone" v-model="reservation.phone" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea id="notes" v-model="reservation.notes" />
        </b-form-item>
      </b-form-group>

      <b-form-group buttons>
        <b-form-item>
          <b-button
            type="button"
            design="outline_danger"
            @click="remove(reservation.id)"
            :style="{ marginRight: '10px' }"
          >
            {{ $t('delete') }}
          </b-button>
          <b-button design="outline">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </div>
</template>

<style scoped>
.reservation {
  border-bottom: 1px solid var(--color-neutral-02);
}
</style>
