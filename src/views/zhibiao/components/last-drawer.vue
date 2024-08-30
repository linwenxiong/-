<template> 
  
    <h2 class="drawer-title">商品明细</h2>
        <div class="order-drawer-box">
            <h3 class="order-drawer-title">首次点菜</h3>
            <a-table :columns="productColumns" :data-source="goodsInfo">
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex === 'img'">
                        <img style="display: block; width: 50px; height: 50px;" :src="text" alt="">
                    </template>
                </template>
            </a-table>
        </div>
        <!-- <div class="order-drawer-box">
            <h3 class="order-drawer-title">第一次加菜</h3>
            <a-table :columns="productColumns" :data-source="productInfo">
                <template #bodyCell="{ column, text }">
                    <template v-if="column.dataIndex === 'img'">
                        <img style="display: block; width: 50px; height: 50px;" :src="text" alt="">
                    </template>
                </template>
            </a-table>
        </div> -->
        <h2 class="drawer-title">订单信息</h2>
        <div class="order-info-box">
            <div class="order-info-box__item" v-for="item, index in orderInfo" :key="index">
                <label class="order-info-box__label">{{ item[0] }}</label> {{ item[2] }}
            </div>
        </div>
 
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { productColumns } from '../constants'
const props = defineProps({
    goodsInfo: {
        type: Array,
        default: () => []
    },
    orderInfo: {
        type: Array as PropType<any>,
        default: () => []
    }
})
</script>