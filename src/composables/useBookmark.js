import { onMounted, ref } from 'vue'
import { request } from '@/api'

const bookmarks = ref([])

export function useBookmark() {
  const list = () => {
    return request('get', '/api/bookmark/').then((res) => {
      bookmarks.value = res.data
    })
  }

  onMounted(list)

  const open = (url) => {
    window.location.href = url
  }

  const createFromPage = () => {
    return request('post', '/api/bookmark/new', {
      url: window.location.href,
    }).then(() => {
      list()
    })
  }

  return {
    bookmarks,
    list,
    open,
    createFromPage,
  }
}
