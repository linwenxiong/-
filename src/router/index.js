import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../views/admin/index.vue'
import Login from '../views/login/index.vue'
import List from '../views/list/index.vue'

import PatrolManage from '../views/patrol-manage/index.vue'

import QualityManage from '../views/quality-manage/index.vue'
import SkuManage from '../views/suk-manage/index.vue'

import PeriodValidity from '../views/list/index.vue'
import ZhiBiao from '../views/zhibiao/index.vue'

import MarketResearch from '../views/market-research/index.vue'
import GoodsFeedback from '../views/goods-feedback/index.vue'
import ShelfAnalysis from '../views/shelf-analysis/index.vue'


import PointManage from '../views/point-manage/index.vue'

// 大屏
import Dp from '../views/dp/index.vue'

import NotFound from '../views/notfound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dp',
      name: 'dp',
      component: Dp
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      // path: '/admin', 只是作为菜单父级头部标题获取
      name: 'product-manage',
      component: Admin,
      redirect: '/login',
      meta: { title: '商品管理', isMenu: true },
      children: [
        {
          path: '/pinzhi',
          name: 'QualityManage',
          component: QualityManage,
          meta: {
            title: '猪肉品质管理'
          }
        },
        {
          path: '/feedback',
          name: 'GoodsFeedback',
          component: GoodsFeedback,
          meta: {
            title: '货物异常统计'
          }
        },
        {
          path: '/shelf',
          name: 'ShelfAnalysis',
          component: ShelfAnalysis,
          meta: {
            title: '货架分析报表'
          }
        },
        // {
        //   path: '/version',
        //   name: 'ShelfVersion',
        //   component: ShelfVersion,
        //   meta: {
        //     title: '货架版本对比'
        //   }
        // },

        {
          path: '/youxiaoqi',
          name: 'PeriodValidity',
          component: PeriodValidity,
          meta: {
            title: '商品效期监控'
          }
        },
        {
          path: '/sku',
          name: 'Sku',
          component: SkuManage,
          meta: {
            title: '品类SKU数查询'
          }
        }
      ]
    },
    {
      name: 'yunYing-manage',
      component: Admin,
      meta: { title: '运营管理', isMenu: true },
      children: [
        {
          path: '/shidiao',
          name: 'MarketResearch',
          component: MarketResearch,
          meta: {
            title: '商品市调分析'
          }
        },
        {
          path: '/patrol',
          name: 'patrol',
          component: PatrolManage,
          meta: { title: '督导巡店管理' }
        },
        {
          path: '/point',
          name: 'Point',
          component: PointManage,
          meta: { title: '货架坐标管理' }
        },
        {
          path: '/zhibiao',
          name: 'zhiBiao',
          component: ZhiBiao,
          meta: { title: '点餐订单' }
        },

      ]
    },
    {
      name: 'project-manage',
      component: Admin,
      meta: { title: '项目管理', isMenu: true },
      children: [
        {
          path: '/address',
          name: 'address',
          component: List,
          meta: { title: '新店选址评估' }
        },
        {
          path: '/overall',
          name: 'overall',
          component: List,
          meta: { title: '项目总况查询' }
        }, {
          path: '/work',
          name: 'work',
          component: List,
          meta: { title: '事务办理查询' }
        },
      ]
    },
    {
      name: 'transport-manage',
      component: Admin,
      meta: { title: '运输管理', isMenu: true },
      children: [
        {
          path: '/carinfo',
          name: 'carinfo',
          component: List,
          meta: { title: '车辆信息查询' }
        },
        {
          path: '/yunwei',
          name: 'yunwei',
          component: List,
          meta: { title: '车辆运维查询' }
        }, {
          path: '/consump',
          name: 'consump',
          component: List,
          meta: { title: '车辆油耗查询' }
        }, {
          path: '/peisong',
          name: 'peisong',
          component: List,
          meta: { title: '配送装车查询' }
        }, {
          path: '/crfenxi',
          name: 'crfenxi',
          component: List,
          meta: { title: '车效及人效分析' }
        },
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ]
})
// 添加路由
export function initDynamicRouters() {
  // const menu = [
  //   {
  //     path: '/bbq',
  //     name: '评分管理'
  //   }
  // ]
  // menu.forEach((item) => {
  //   router.addRoute('Admin', componentyinshe[item.path])
  // })

}
export default router
