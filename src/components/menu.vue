<template>
  <div class="menu-wrappy">

    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
      <a-sub-menu :title="item.meta.title" v-for="item, key in menus" :key="item.name">
        <template #icon>
          <ShoppingFilled v-if="key === 0" />
          <TrophyFilled v-if="key === 1" />
          <ProjectFilled v-if="key === 2" />
          <CarFilled v-if="key === 3" />
        </template>
        <a-menu-item class="menu-title" v-for="sitm in item.children" :key="sitm.name"
          @click="handleClickMenu(sitm.path, sitm.meta.title, item.name, sitm.name)">
          <span>{{ sitm.meta.title }}</span>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores/modules/app'
import { ShoppingFilled, TrophyFilled, ProjectFilled, CarFilled } from '@ant-design/icons-vue';
export default defineComponent({
  name: 'LMenu',
  props: {
    menuList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ShoppingFilled,
    TrophyFilled,
    ProjectFilled,
    CarFilled
  },
  setup() {
    const selectedKeys = ref([]) // 二级导航
    const openKeys = ref([]) // 一级导航
    const router = useRouter()
    const appStore = useStore()
    function initTabs() {
      const { meta, path } = router.currentRoute.value
      appStore.setHeaderTabs(path, meta.title)
    }
    initTabs()
    function handleClickMenu(path, title, parentName, childrenName) {
      appStore.setHeaderTabs(path, title)
      // appStore.setMenuKey(parentName, childrenName)
      router.push(path)
    }
    const { options: { routes } } = router
    const menus = routes.filter((item) => {
      return item.meta && item.meta.isMenu
    })

    watch(() => [appStore.menuSelectedKeys, appStore.menuOpenKeys], (val) => {
      const [child, parent] = val
      openKeys.value = parent // 一级
      selectedKeys.value = child // 二级
    }, { immediate: true })

    return {
      menus,
      selectedKeys,
      openKeys,
      handleClickMenu
    }
  }
})
</script>

<style scoped lang="less">
::v-deep(.menu-title) span {
  font-size: 13px;
  color: #fff;
}

.menu-wrappy {
  ::v-deep(.ant-menu .ant-menu-item) {
    height: 28px;
    margin-bottom: 0px;
    margin-top: 0px;
  }
}
</style>
