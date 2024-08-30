<template>
  <a-config-provider :locale="zhCN">
    <RouterView />


  </a-config-provider>
</template>
<script>
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { defineComponent } from "vue";
export default defineComponent({
  setup() {
    if(true) {
      return {
      zhCN,
    };
    }else {
      console.log('123')
    }
 
  },
});
</script>
<style lang="less">
</style>
