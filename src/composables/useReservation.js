import { onMounted, ref } from '@vue/composition-api'
import { request } from '@/api'

const reservations = ref(null)

export function useReservation() {
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

  const create = (data) => {
    return request('post', '/api/reservation/new', data).then(() => {
      list()
    })
  }

  const update = (data) => {
    return request('put', '/api/reservation/' + data.id, {
      collection: data.collection,
      notes: data.notes,
      books: data.books,
      salutation: data.salutation,
      firstname: data.firstname,
      surname: data.surname,
      mail: data.mail,
      phone: data.phone,
    })
  }

  const remove = (id) => {
    return request('delete', '/api/reservation/' + id).then(() => {
      list()
    })
  }

  return {
    reservations,
    reservation,
    isLoading,
    list,
    create,
    update,
    remove,
  }
}
