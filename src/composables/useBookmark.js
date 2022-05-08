import { onMounted, reactive } from '@vue/composition-api'
import { request } from '@/api'

export default function useBookmark() {
  const base = '/api/bookmark'

  const state = reactive({
    bookmarks: [],
  })

  const list = () => {
    return request('get', base + '/').then((response) => {
      state.bookmarks = response.data
    })
  }

  onMounted(list)

  const create = (data) => {
    return request('post', base + '/new', { url: data }).then(() => {
      list()
    })
  }

  const createFromPage = () => {
    return request('post', base + '/new', { url: window.location.href }).then(
      () => {
        list()
      }
    )
  }

  const open = (url) => {
    window.location.href = url
  }

  const update = (data) => {
    return request('put', base + '/' + data.id, {
      name: data.name,
      url: data.url,
    }).then(() => {
      list()
    })
  }

  const remove = (data) => {
    return request('delete', base + '/' + data.id).then(() => {
      list()
    })
  }

  return {
    state,
    list,
    create,
    createFromPage,
    open,
    remove,
    update,
  }
}
