<template>
  <a-layout-header style="background: #fff; padding: 0">
      <div>
          <menu-unfold-outlined v-if="collapsed" class="trigger" @click="() => (menuStore.collapsed = !menuStore.collapsed)" />
          <menu-fold-outlined v-else class="trigger" @click="() => (menuStore.collapsed = !menuStore.collapsed)" />
          <a-breadcrumb class="admin-mianbao-box">
              <a-breadcrumb-item v-for="menu, index in headerMenu" :key="index">{{menu}}</a-breadcrumb-item>
          </a-breadcrumb>
          <div class="nav-header-avatar" style="cursor: pointer;">
            <a-popover title=" ">
              <template #content>
                <p style="cursor: pointer;" @click="exit">退出</p>
              </template>
              <a-avatar size="large" style="color: #fff; background-color: #fff">
                <template #icon>
                  <img src="@/assets/logo.png" alt="" srcset="">
                </template>
              </a-avatar>
              <span class="admin-username"> {{userName}} </span>
              <down-outlined />
            </a-popover>
          </div>
      </div>

      <div class="tabs-box">
          <a-tag class="tabs-item"
          v-for="tab, index in headerTabs" :key="index" 
          :color="`${index == current ? '#108ee9': 'blue' }`" 
          :closable="index != current" 
           @click="tabClick(tab.path)" 
           @close.prevent="tabClose(index)">{{tab.title}}</a-tag>
      </div>
      
  </a-layout-header>
</template>
<script>
import { defineComponent, ref, watchEffect, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import {
  DownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
} from '@ant-design/icons-vue';
import { useMenuStore } from '@/stores'
import { useStore } from '@/stores/modules/app'

export default defineComponent({
  components: {
    DownOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  },
  setup() {
    const router  = useRouter()
    const menuStore = useMenuStore()
    const collapsed = ref(false)
    const appStore = useStore()
    const userName = ref('加载中')
    const tabClick = function(path) {
      router.push(path)
    }
    const tabClose = function(index) {
      appStore.deteleHeaderTabs(index)
    }
    const headerMenu = ref([])

    onMounted(() => {
      userName.value = localStorage.getItem('userName') || '兴勤'
    })
    
    watchEffect(() => {
      // 获取相关联的路由
      const { matched } = router.currentRoute.value
      headerMenu.value = matched.map(( item ) => {
        return item.meta.title
      })
    })
    const exit = function() {
      localStorage.removeItem('token')
      router.replace('/login')
    }
    return {
      userName,
      headerTabs: computed(() => appStore.headerTabs),
      current: computed(() => appStore.currentTabs),
      headerMenu,
      menuStore,
      collapsed,
      tabClick,
      tabClose,
      exit
    }
  }
})
</script>
<style scoped lang="less">
.nav-header-avatar {
  float: right;
  overflow: hidden;
  margin: 15px 30px;
  font-size: 14px;
  font-weight: bold;
  position: relative;
}
.admin-username {
  padding: 0 9px;
  font-weight: bold;
}
</style>