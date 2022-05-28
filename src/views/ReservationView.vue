<script>
import ReservationCreate from './../components/reservation/Create.vue'
import ReservationShow from './../components/reservation/Show.vue'
import { useReservation } from '../composables/useReservation.js'

export default {
  name: 'reservation-view',
  head: {
    title: 'Reservation',
  },
  components: {
    ReservationCreate,
    ReservationShow,
  },
  props: {
    auth: Object,
  },
  setup() {
    const { reservations, isLoading, create, update, remove } = useReservation()

    return {
      reservations,
      isLoading,
      create,
      update,
      remove,
    }
  },
}
</script>

<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('reservation') }}</h1>
    </b-container>

    <b-container size="m">
      <h2>{{ $t('newReservation') }}</h2>
      <reservation-create @create="create($event)" />
    </b-container>

    <b-container size="m">
      <h2>{{ $t('reservedBooks') }}</h2>
      <b-spinner size="l" v-if="isLoading" />
      <div v-if="reservations">
        <reservation-show
          v-for="item in reservations"
          :key="item.id"
          :reservation="item"
          @update="update($event)"
          @remove="remove($event)"
        />
      </div>
    </b-container>

    <b-container size="m">
      <div v-html="$tc('reservationDesc')" />
    </b-container>
  </article>
</template>
