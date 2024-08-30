import Mock from 'mockjs'
import { defineMock } from 'vite-plugin-mock-dev-server'
const obj = Mock.mock({
    'list|5': [
      {
        "img|1":[
            'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0322%2Fea4a8d07j00rrwwha003ic000u000u0m.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
            'https://nimg.ws.126.net/?url=http%3A%2F%2Fdingyue.ws.126.net%2F2023%2F0322%2F3c6294b5j00rrwwha001ic000hs00n7m.jpg&thumbnail=660x2147483647&quality=80&type=jpg',
            'https://img20.360buyimg.com/img/s130x130_jfs/t1/246075/2/8362/116453/663db9cdF3cbaa7e8/444f4123e2c38bd5.jpg!cc_130x130.avif',
            'https://nhsoft-persistent-1251937768.cos.ap-shanghai.myqcloud.com/mars-file/804419898788601856/12cbec09-faef-4e74-8862-5e825d22514e/%E5%AE%AB%E5%BB%B7%E7%B3%AF%E9%A6%99%E6%9F%A0%E6%AA%AC%E8%8C%B6.jpg',
            'https://nhsoft-persistent-1251937768.cos.ap-shanghai.myqcloud.com/mars-file/804419898788601856/21a57f44-555a-4095-a927-4826bc9d25e4/%E5%B8%83%E8%95%BE.jpg'
        ],
        "productName|1":['通心粉','烤茄子夹肉','烤土豆片','烤牛排','香辣烤鱿鱼'],
        "price|20-10":1,
        count:'2',
        status:'0',
      }
    ]
  })
export default defineMock([
    {
        url: '/api/order/goodsDetails',
        method: ['POST'],
        validator: { 
            body: { 
                orderId: 1 
            }
        },
        body: {
          code: 0,
          data: obj.list
        }
    },
    {
        url: '/api/order/orderDetails', // 订单信息
        method: ['POST'],
        body: {
          code: 0,
          data: [
            ['桌位号','TableNumber', 'Y21'],
            ['订单号','OrderID', '32156412132'],
            ['商品总数','TotalItems', 3],
            ['支付时间','PaymentTime','2024-06-13 9:55:23'],
            ['取餐号','PickupNumber', 'Y265'],
            ['就餐人数','DinersCount', 3],
            ['订单状态','OrderStatus', '取餐中'],
            ['商品总价','TotalPrice', '63'],
            ['实际支付','ActualPayment','50'],
            ['创建时间','CreationTime', '2024-06-13 9:35:23'],
            ['支付方式','PaymentMethod', '微信支付'],
        ]
        }
    }
])