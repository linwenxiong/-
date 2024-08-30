import { defineStore } from 'pinia'
export const usePublicStore = defineStore('public', {
  state: () => ({
      layoutHeight: 0,
  }),
  getters: {
    getLayoutHeight: (state) => state.layoutHeight - 47 - 64 - 110
  },
  actions: {
    setLayoutHeight(h) {
      this.layoutHeight = h
    }
  }
})