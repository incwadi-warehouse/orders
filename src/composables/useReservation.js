import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'
import useToast from '@baldeweg/components/src/composables/useToast'
import i18n from '@/i18n.js'

const reservations = ref(null)

export function useReservation() {
  const { add } = useToast()

  const reservation = ref(null)
  const isLoading = ref(false)

  const list = () => {
    isLoading.value = true

    return request('get', '/api/reservation/list').then((res) => {
      reservations.value = res.data
      isLoading.value = false
    })
  }

  onMounted(list)

  const show = (id) => {
    return request('get', '/api/reservation/' + id).then((res) => {
      reservation.value = res.data
    })
  }

  const create = () => {
    return request('post', '/api/reservation/new', {
      collection: reservation.value.collection,
      notes: reservation.value.notes,
      books: reservation.value.books,
      salutation: reservation.value.salutation,
      firstname: reservation.value.firstname,
      surname: reservation.value.surname,
      mail: reservation.value.mail,
      phone: reservation.value.phone,
    }).then(() => {
      list()
      reservation.value = null
    })
  }

  const update = (collectionTimestamp) => {
    return request('put', '/api/reservation/' + reservation.value.id, {
      collection: collectionTimestamp,
      notes: reservation.value.notes,
      books: flatten(reservation.value.books),
      salutation: reservation.value.salutation,
      firstname: reservation.value.firstname,
      surname: reservation.value.surname,
      mail: reservation.value.mail,
      phone: reservation.value.phone,
    })
      .then(() => {
        add({
          type: 'success',
          body: i18n.t('updated'),
        })
      })
      .catch(() => {
        add({
          type: 'error',
          body: i18n.t('error'),
        })
      })
  }

  const remove = (id) => {
    return request('delete', '/api/reservation/' + id).then(() => {
      list()
    })
  }

  const flatten = (data) => {
    let books = []

    data.forEach((element) => {
      books.push(element.id)
    })

    return books.join(',')
  }

  return {
    reservations,
    reservation,
    isLoading,
    list,
    create,
    show,
    update,
    remove,
  }
}
