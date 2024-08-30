<template>

    <a-tabs @change="tabPaneChange">
        <a-tab-pane key="1"  tab="最近订单" >
            <div class="order-list-box">
                <a-card :title="`订单号：${item.id}`" v-for="(item, index) in lastDataList" :key="index" 
                    style="width: 350px; text-align: center;">
                    <div class="lin-ant-card-body back-blue">
                        <p class="lin-ant-card-row01">堂食</p>
                        <p class="lin-ant-card-row04">
                            桌号:Y{{item.deskId}} ，人数: {{ item.peopleNum }} 人
                        </p>
                        <p class="lin-ant-card-row05">多个菜单，请看详情</p>
                        <div class="lin-ant-card-button-box">
                            <a-button type="primary" style="margin-right: 10px" @click="showLastRightDialog()">详情</a-button>
                            <a-button type="primary" @click="billingVisible = true">出单</a-button>
                        </div>
                    </div>
                    <p class="lin-ant-card-footer">下单时间：{{ item.orderTime }}</p>
                </a-card>
            </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="台面数据" force-render>
            <a-radio-group v-model:value="orderStatus" button-style="solid" @change="orderStatusChange">
                <a-radio-button value="a">空闲中</a-radio-button>
                <a-radio-button value="b">就餐中</a-radio-button>
            </a-radio-group>
            <div class="order-list-box">
                <a-card :title="item.storeName" v-for="(item, index) in desktopDataList" :key="index">
                    <template #extra><a href="#" @click="showDesktopRightDialog">详情</a></template>
                    <div class="lin-ant-card-body" :class="[orderStatus === 'a' ? 'back-green' : 'back-red']">
                        <p class="lin-ant-card-row01">Y{{ item.deskId }}</p>
                        <p class="lin-ant-card-row02">{{ item.status }}</p>
                        <p class="lin-ant-card-row03">下单时间：{{ item.orderTime }}</p>
                    </div>
                </a-card>
            </div>
        </a-tab-pane>
    </a-tabs>


    <a-drawer v-model:visible="desktopDrawerVisible" title="订单" width="1200" :closable="false"
        :footer-style="{ textAlign: 'right' }">
        <a-table :columns="columns" :data-source="detailInfo">
            <template #bodyCell="{ column }">
                <template v-if="column.dataIndex === 'operate'">
                    <a @click="showChildrenDrawer">订单详情</a>
                </template>
            </template>
        </a-table>

        <a-drawer v-model:visible="childrenDrawer" title="订单详情" width="600" :closable="false">
            <h2 class="drawer-title">商品明细</h2>
            <div class="order-drawer-box">
                <h3 class="order-drawer-title">首次点菜</h3>
                <a-table :columns="productColumns" :data-source="productInfo">
                    <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'img'">
                            <img style="display: block; width: 50px; height: 50px;" :src="text" alt="">
                        </template>
                    </template>
                </a-table>
            </div>
            <div class="order-drawer-box">
                <h3 class="order-drawer-title">第一次加菜</h3>
                <a-table :columns="productColumns" :data-source="productInfo">
                    <template #bodyCell="{ column, text }">
                        <template v-if="column.dataIndex === 'img'">
                            <img style="display: block; width: 50px; height: 50px;" :src="text" alt="">
                        </template>
                    </template>
                </a-table>
            </div>
            <h2 class="drawer-title">订单信息</h2>
            <div class="order-info-box">
                <div class="order-info-box__item" v-for="item, index in orderInfos" :key="index">
                    <label class="order-info-box__label">{{ item[0] }}</label> {{ item[2] }}
                </div>
            </div>
        </a-drawer>
    </a-drawer>

    <a-modal v-model:visible="billingVisible" title="打印小票" @ok="billingHandleOk">
        <div class="billing-item">
            <label class="label">订单号：</label>
            465445435891321231234
        </div>
        <div class="billing-item">
            <label class="label">桌号：</label>Y19
        </div>
    </a-modal>

    <a-drawer
        v-model:visible="lastDrawerVisible" 
        title="订单" width="1000" 
        :closable="false"
        :footer-style="{ textAlign: 'right' }">
        <last-drawer :goodsInfo="goodsInfo" :orderInfo="orderInfo"></last-drawer>
    </a-drawer>
</template>

<script setup lang="ts">
import { ref  } from 'vue'
import { message,notification } from 'ant-design-vue'; 
import { apiGetOrderList, apiGetLastOrderList, apiGetOrderGoodsDetails, apiGetOrderDetails } from '../../api'
import { orderList, storeList, detailInfo, productInfo, orderInfos } from '../../mock/model/order'
import { TypeOrderDataList, TypeLastOrderDataList } from '../../interface'
import { columns, productColumns } from './constants'
import LastDrawer from './components/last-drawer.vue'

const orderStatus = ref('a')
const desktopDrawerVisible = ref<boolean>(false);
const lastDrawerVisible = ref<boolean>(false);
const billingVisible = ref<boolean>(false);
const childrenDrawer = ref<boolean>(false);
const desktopDataList = ref<TypeOrderDataList[]>([]);
const lastDataList = ref<TypeLastOrderDataList[]>([]);
const goodsInfo = ref<any[]>([]);
const orderInfo = ref<any[]>([]);

const orderStatusChange = async () => {
    const { data } = await apiGetOrderList({
        type: orderStatus.value
    })
    desktopDataList.value = data
}

const showDesktopRightDialog = () => {
    desktopDrawerVisible.value = true
}
const showLastRightDialog = async () => {
    lastDrawerVisible.value = true
    getGoodsInfo()
    getOrderDetails()
}

const showChildrenDrawer = () => {
    childrenDrawer.value = true
}
const billingHandleOk = () => {
    const hide = message.loading('正在出单', 0);
     setTimeout(hide, 2500);
    notification['success']({
        message: '出单成功',
        description: '订单号：465445435891321231234',
      });
    billingVisible.value = false
}

const tabPaneChange = async (e)=>{
    if(e === '1') {
        getLastOrderList()
        return
    }
    orderStatusChange()
}

// =================api========================
const getGoodsInfo = async () => {
    const {data} = await apiGetOrderGoodsDetails({
        orderId: 1
    })
    goodsInfo.value = data
}

const getOrderDetails = async ()=>{
   const { data } = await apiGetOrderDetails({})
    orderInfo.value = data
}

const getLastOrderList = async ()=> {
    const { data } =  await apiGetLastOrderList({})
    lastDataList.value = data
}
// ---------------init
getLastOrderList() 

 

</script>

<style lang="less">
.lin-ant-card-footer {
    font-size: 16px;
    line-height: 55px;
}
.order-list-box {
    display: flex;
    // justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;


    .ant-card {
        width: 23%;
        margin-right: 15px;
        margin-bottom: 15px;
    }
    .lin-ant-card-row05 {
        font-weight: bold;
        font-size: 19px;
        margin-bottom: 10px;
    }
    .lin-ant-card-row04 {
        font-weight: normal;
        font-size: 19px;
        padding: 10px 0;
    }
    .lin-ant-card-row03 {
        font-size: 16px;
    }

    .lin-ant-card-row02 {
        padding: 15px 0;
        font-weight: bold;
        font-size: 30px;
    }

    .lin-ant-card-row01 {
        font-weight: bold;
        font-size: 30px;
    }

    .ant-card-bordered {
        border: 1px solid #e5e5e5;
    }

    .lin-ant-card-body {
        padding: 20px 24px;

    }
    .back-blue {
        background: #003564;
        color: #ffff;
    }
    .back-green {
        background: #2a8d57;
        color: #ffff;
    }

    .back-red {
        background: #b90000;
        color: #ffff;
    }

    .ant-card-body {
        padding: 0;

    }

}

.order-drawer-box {

    .order-drawer-title {
        text-align: center;
        font-weight: bold;
    }
}

.order-info-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &__item {
        color: rgb(3, 3, 3);
        width: 50%;
        line-height: 35px;
        font-size: 14px;
    }

    &__label {
        margin-right: 5px;
    }
}

.drawer-title {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 700;
}
.billing-item {
    margin-bottom: 15px;
    font-size: 16px;
    .label {
        display: inline-block;
        width: 90px;
        margin-right: 5px;
        text-align: right;
    }
}
</style>