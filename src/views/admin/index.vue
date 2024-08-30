<template>
  <a-layout class="admin-wrappy">
    <a-layout-sider v-model:collapsed="menuStore.collapsed" :trigger="null" collapsible theme="dark">
      <div class="logo" @click="goLogin">
        <img src="@/assets/logo.png" alt="">
        兴勤辅助管理系统
      </div>
      <Menu />
    </a-layout-sider>

    <a-layout>
      <NavHeader />
      <a-layout-content ref="layout"
        :style="{ margin: '24px 16px', padding: '0 24px', background: '#fff', overflow: 'auto' }">
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </a-layout-content>
    </a-layout>

  </a-layout>
</template>
<script lang="js">
import {
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue';
import { defineComponent, ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import Menu from '@/components/menu.vue'
import NavHeader from '@/components/nav-header.vue'
import { useMenuStore, useStore, usePublicStore } from '@/stores'

export default defineComponent({
  name: 'Admin',
  components: {
    NavHeader,
    Menu,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
  },
  setup() {
    const whiteList = ref('QualityManage')
    const layout = ref(null)
    const publicStore = usePublicStore()
    onMounted(() => {
      console.log('setle')
      publicStore.setLayoutHeight(layout.value.$el.clientHeight)
    })
    const router = useRouter()
    const menuStore = useMenuStore()
    const appStore = useStore()
    const collapsed = ref(false)

    // 路由发生变化总部
    watch(() => [router.currentRoute.value.path, appStore.headerTabs], (value) => {
      // 监听路由地址 通过地址遍历匹配tab标签
      const [path, tabArr] = value // 返回一个数组，得到监听的两个对象的值
      const current = tabArr.findIndex((item) => {
        return item.path === path
      })
      appStore.setCurrent(current)
      // 处理左侧菜单逻辑
      const { matched } = router.currentRoute.value
      const [parent, child] = matched
      // if (child) {
      appStore.setMenuKey(parent.name, child.name)
      // }
    }, { immediate: true })

    return {
      whiteList,
      layout,
      goLogin: function () {
        // router.push('/login')
      },
      menuStore,
      collapsed,
    };
  },
});
</script>
<style lang="less">
.admin-wrappy {
  .ant-layout-header {
    height: 100px;
  }

  .tabs-box {
    height: 35px;
    line-height: 35px;
    padding-left: 25px;

    .tabs-item {
      cursor: pointer;
    }
  }

  .logo {
    color: #fff;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    font-size: 16px;

    img {
      width: 30px;
      height: 30px;
    }
  }
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}



.site-layout .site-layout-background {
  background: #fff;
}

.admin-mianbao-box {
  display: inline-block;
}
</style>