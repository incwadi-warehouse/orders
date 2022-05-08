import { reactive } from '@vue/composition-api'
import { request } from '@/api'

export default function useReservation() {
  const base = '/api/reservation'

  const state = reactive({
    reservations: null,
    reservation: null,
    isLoading: false,
  })

  const list = () => {
    state.isLoading = true
    return request('get', base + '/list')
      .then((response) => {
        state.reservations = response.data
      })
      .finally(() => {
        state.isLoading = false
      })
  }

  const create = (data) => {
    return request('post', base + '/new', data).then(() => {
      list()
    })
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, {
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
    return request('delete', base + '/' + id).then(() => {
      list()
    })
  }

  return {
    state,
    list,
    remove,
    create,
    update,
  }
}
