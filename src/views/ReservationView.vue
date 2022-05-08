<template>
  <article>
    <b-container size="m">
      <h1>{{ $t('reservation') }}</h1>
    </b-container>

    <b-container size="m">
      <h2>{{ $t('newReservation') }}</h2>
      <reservation-create
        :cart="cart.state.cart"
        @create="reservation.create($event)"
        @created="onCreated"
      />
    </b-container>

    <b-container size="m">
      <h2>{{ $t('reservedBooks') }}</h2>
      <b-spinner size="l" v-if="reservation.state.isLoading" />
      <div v-if="reservation.state.reservations">
        <reservation-show
          v-for="item in reservation.state.reservations"
          :key="item.id"
          :reservation="item"
          @update="reservation.update($event)"
          @remove="reservation.remove($event)"
        />
      </div>
    </b-container>

    <b-container size="m">
      <div v-html="$tc('reservationDesc')" />
    </b-container>
  </article>
</template>

<script>
import useReservation from '../composables/useReservation'
import useCart from '../composables/useCart'
import ReservationCreate from './../components/reservation/Create'
import { onMounted, toRefs } from '@vue/composition-api'
import ReservationShow from './../components/reservation/Show'

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
  setup(props) {
    const { me } = toRefs(props.auth.state)

    const cart = useCart()
    cart.list()

    const reservation = useReservation()

    const onCreated = () => {
      cart.clean()
      cart.list()
    }

    onMounted(() => {
      reservation.list()
    })

    return {
      reservation,
      onCreated,
      cart,
      me,
    }
  },
}
</script>
