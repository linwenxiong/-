import { ref  } from 'vue'
const lastDrawerVisible = ref<boolean>(false);
const showLastRightDialog = () => {
    lastDrawerVisible.value = true
}

export function useLostOrderModel(data) {
    
  return   { lastDrawerVisible, showLastRightDialog }
}