<script setup>
import { useReservation } from '@/composables/useReservation.js'
import { computed, ref } from 'vue'

const { reservation, create } = useReservation()

const collectionDate = ref(null)
const collectionTime = ref('00:00')

const collectionTimestamp = computed(() => {
  if (null === collectionDate.value || null === collectionTime.value) return

  let date = new Date(collectionDate.value + ' ' + collectionTime.value + 'Z')

  return date.getTime() / 1000
})

reservation.value = {
  notes: null,
  books: '',
  collection: collectionTimestamp.value,
  salutation: null,
  firstname: null,
  surname: null,
  mail: null,
  phone: null,
}
</script>

<template>
  <article>
    <b-alert type="warning">
      <p>{{ $t('deprecated_reservation_without_books') }}</p>
    </b-alert>

    <b-form @submit.prevent="create">
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

      <b-form-group v-if="collectionDate">
        <b-form-item>
          <b-form-label for="time">
            {{ $t('time') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="time" id="time" v-model="collectionTime" />
        </b-form-item>
      </b-form-group>

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
          <b-button design="primary">{{ $t('save') }}</b-button>
        </b-form-item>
      </b-form-group>
    </b-form>
  </article>
</template>
