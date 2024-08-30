import Mock from 'mockjs'
import { defineMock } from 'vite-plugin-mock-dev-server'

const obj = Mock.mock({
  'list|9': [
    {
      'id': '@id',
      'storeName|1': [
        "味觉探索者美食坊",
        "四季轩精品餐厅",
        "云端雅致茶餐厅",
        "香遇江南小馆",
        "海之味海鲜大排档",
        "素食天堂绿意阁",
        "燃面工坊传统面食",
        "晨光咖啡与烘焙屋",
        "辣么爱吃川菜馆",
        "环球食尚料理汇"
      ],
      'deskId|+1': 1,
      'orderTime': '@now',
      "status|1": ["空闲中"],
    }
  ]
})

const obj2 = Mock.mock({
  'list|10': [
    {
      'id': '@id',
      'storeName|1': [
        "味觉探索者美食坊",
        "四季轩精品餐厅",
        "云端雅致茶餐厅",
        "香遇江南小馆",
        "海之味海鲜大排档",
        "素食天堂绿意阁",
        "燃面工坊传统面食",
        "晨光咖啡与烘焙屋",
        "辣么爱吃川菜馆",
        "环球食尚料理汇"
      ],
      'deskId|+1': 10,
      'orderTime': '@now',
      "status|1": ["就餐中"],
    }
  ]
})

const obj3 = Mock.mock({
  'list|2': [
    {
      'id': '@id',
      'storeName|1': [
        "味觉探索者美食坊",
        "四季轩精品餐厅",
        "云端雅致茶餐厅",
        "香遇江南小馆",
        "海之味海鲜大排档",
        "素食天堂绿意阁",
        "燃面工坊传统面食",
        "晨光咖啡与烘焙屋",
        "辣么爱吃川菜馆",
        "环球食尚料理汇"
      ],
      'deskId|+1': 10,
      'peopleNum|1': [2,3,4],
      'orderTime': '@now', // 订单时间
      'menuCount': '@integer(1, 10)', // 菜单数量
    }
  ]
})
export default defineMock([{
  url: '/api/order/getOrderList',
  // method: 'GET',
  validator: {
    query: { type: 'a' }
  },
  body: {
    code: 0,
    data: obj.list
  }
},
{
  url: '/api/order/getOrderList',
  // method: 'GET',
  validator: {
    query: { type: 'b' }
  },
  body: {
    code: 0,
    data: obj2.list
  }
},
{
  url: '/api/order/getLastOrderList',
  body: {
    code: 0,
    data: obj3.list
  }
}
])