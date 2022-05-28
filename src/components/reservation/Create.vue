<template>
  <article>
    <b-form @submit.prevent="create">
      <b-form-group>
        <b-form-item>
          <b-form-label for="date">
            {{ $t('date') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="date" id="date" v-model="state.date" />
        </b-form-item>
      </b-form-group>

      <b-form-group v-if="state.date">
        <b-form-item>
          <b-form-label for="time">
            {{ $t('time') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="time" id="time" v-model="state.time" />
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
            v-model="state.salutation"
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
          <b-form-input type="text" id="firstname" v-model="state.firstname" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="surname">
            {{ $t('surname') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="text" id="surname" v-model="state.surname" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="mail">
            {{ $t('mail') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="email" id="mail" v-model="state.mail" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="phone">
            {{ $t('phone') }}
          </b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-input type="tel" id="phone" v-model="state.phone" />
        </b-form-item>
      </b-form-group>

      <b-form-group>
        <b-form-item>
          <b-form-label for="notes">{{ $t('notes') }}</b-form-label>
        </b-form-item>
        <b-form-item>
          <b-form-textarea id="notes" v-model="state.notes" />
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

<script>
import { computed, reactive } from '@vue/composition-api'

export default {
  name: 'reservation-create',
  setup(props, { emit }) {
    const state = reactive({
      date: null,
      time: '00:00',
      notes: null,
      books: computed(() => {
        return ''
      }),
      collection: computed(() => {
        if (null === state.date || null === state.time) return
        let date = new Date(state.date + ' ' + state.time + 'Z')
        return date.getTime() / 1000
      }),
      salutation: null,
      firstname: null,
      surname: null,
      mail: null,
      phone: null,
    })

    const create = () => {
      emit('create', {
        collection: state.collection,
        notes: state.notes,
        books: state.books,
        salutation: state.salutation,
        firstname: state.firstname,
        surname: state.surname,
        mail: state.mail,
        phone: state.phone,
      })
      emit('created')
      state.date = null
      state.time = null
      state.notes = null
      state.salutation = null
      state.firstname = null
      state.surname = null
      state.mail = null
      state.phone = null
    }

    return {
      state,
      create,
    }
  },
}
</script>
