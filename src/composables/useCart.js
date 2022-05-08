import { onMounted, reactive } from '@vue/composition-api'

export default function useCart() {
  const state = reactive({
    cart: JSON.parse(localStorage.getItem('cart')),
  })

  const list = () => {
    state.cart = JSON.parse(localStorage.getItem('cart'))
  }

  const clean = () => {
    localStorage.removeItem('cart')
    list()
  }

  onMounted(list)

  return { state, list, clean }
}
