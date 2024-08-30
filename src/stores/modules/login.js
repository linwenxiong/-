import { defineStore } from 'pinia'
export const LoginStore = defineStore('login', {
  state: () => {
    return {
      times: null
    }
  },
})