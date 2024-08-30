import { defineStore } from 'pinia'
export const useStore = defineStore('app', {
    state: () => ({
      headerTabs: [],
      currentTabs: 0,
      menuSelectedKeys: [], // 二级导航
      menuOpenKeys: [] // 一级导航
    }),
    actions: {
      setMenuKey (parent, child) {
        this.menuOpenKeys = [parent]
        this.menuSelectedKeys = [child]
      },
      // 设置tab标签
      setHeaderTabs(path, title) {
        const exist = this.headerTabs.some((item) => {
            return item.path === path
        })
        if (!exist) {
            this.headerTabs.push({
                title,
                path,
            })
        }

      },
      // 删除
      deteleHeaderTabs(index) {
        console.log('删除了', index)
        this.headerTabs.splice(index, 1)
        console.log('新数组', this.headerTabs)
      },
      setCurrent(index) {
        this.currentTabs = index === -1 ? 0: index
      }
    },
    getters: {
        // 初始化tab的索引，不需要动态响应
        getTabCurrent: (state) => {
            return state.headerTabs    
        }
    }
  })