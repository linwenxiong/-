import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const menuList = ref([{
    title: '',
    url: ''
  }])
  const collapsed = ref(false)
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  const navTabs = ref([{
    name: '商品品质管理',
    path: '/aaaa',
  },{
    name: '商品效期监控',
    path: '/bb',
  }])
  return { menuList, navTabs, collapsed, count, doubleCount, increment }
})
