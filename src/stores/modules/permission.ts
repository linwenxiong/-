import { defineStore } from 'pinia'
import { apiGetUserRight } from '../../api'
export const usePermissionStore = defineStore('permission', {
  state: () => ({
    chenlie: []
  }),
  actions: {
    async $checkPermission() {
      const res = await apiGetUserRight({})
      const { data } = res
      localStorage.setItem('chenlie', JSON.stringify(data.chenlie))
    },
    getChenliePermission() {
      const _chenlie = localStorage.getItem('chenlie')
      // return state.chenlie //不需要响应性 所以不需要
      return JSON.parse(_chenlie || '[]')
    }
  },
  getters: {
    // getChenliePermission(state) {
    //   const _chenlie = localStorage.getItem('chenlie')
    //   state.chenlie = JSON.parse(_chenlie || '[]')
    //   // return state.chenlie //不需要响应性 所以不需要
    //   return JSON.parse(_chenlie || '[]')
    // }
  }
})