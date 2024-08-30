<template>
  <div class="login-wrappy" id="login">
    <div class="left-box">
      <div class="left-centen-box">
        <!-- <img class="left-box-logo" src="@/assets/xqlogo.png" alt=""> -->
        <img class="left-box-icons" src="@/assets/login-box-bg.svg" alt="">
        <h2 class="left-box-title">欢迎使用惠州兴勤辅助管理系统</h2>
        <!-- <h3 class="left-box-title">欢迎您的使用</h3> -->
      </div>
    </div>
    <div class="right-box">
      <div class="right-box-content">
        <img class="logo" src="@/assets/xqlogo.png" alt="">
        <div class="right-box-login">
          <h1>登录</h1>
          <a-input class="input-box" v-model:value="account" placeholder="请输入账号" />
          <a-input-password class="input-box" v-model:value="password" placeholder="密码" />
          <a-button class="btn" :loading="loading" @click="login">登录</a-button>
        </div>
      </div>

      <p class="copyright">Copyright 兴勤辅助管理系统 2023 </p>
    </div>
  </div>
</template>
<script>
import { useRouter, useRoute } from 'vue-router'
import { defineComponent, ref, onMounted } from 'vue';
import { useMenuStore } from '../../stores'
// import { datas } from '../../api/common'
// import { initDynamicRouters } from '@/router'
import { message } from 'ant-design-vue';
import { apiLogin } from '@/api'
import { usePermissionStore } from '../../stores'
export default defineComponent({
  setup() {
    const permission = usePermissionStore()
    const router = useRouter()
    const route = useRoute()
    const account = ref('')
    const password = ref('')
    const store = useMenuStore()
    const loading = ref(false)
    const login = async () => {
      if (!account.value || !password.value) {
        message.warning('请输入账号或密码');
        return
      }

      try {
        loading.value = true
        const res = await apiLogin({ account: account.value, password: password.value })
        loading.value = false
        if (res.code === 200) {
          message.success(res.message);
          const { data } = res
          localStorage.setItem('token', data.token)
          localStorage.setItem('userName', data.name)
          permission.$checkPermission()

          const { query: { url } } = route
          setTimeout(() => {
            if (url) {
              let u = decodeURIComponent(url)
              console.log(u)
              router.push(u)
              return
            }
            router.push('/pinzhi')
          }, 800)
          return
        }
        message.error(res.message);
      }
      catch (err) {
        message.error(err.message);
      }
      loading.value = false
      // store.$patch((state)=>{
      //   state.menuList = datas
      // })
      // initDynamicRouters()

    }
    onMounted(() => {
      const dom = document.getElementById('login')
      dom.addEventListener('keydown', (e) => {
        if (e.keyCode === 13 && !e.shiftKey) {
          login()
        }
      })
    })

    return {
      loading,
      store,
      login,
      account,
      password
    };
  },
});
</script>
<style lang="less">
.login-wrappy {
  flex: 1;
  display: flex;

  .left-box {
    flex: 1;
    background: #3c4183;

    .left-centen-box {
      width: 460px;
      margin: 0 auto;
    }

    .left-box-logo {
      width: 200px;
      display: block;
    }

    .left-box-icons {
      width: 400px;
      height: 206px;
      display: block;
      margin-top: 256px;
    }

    .left-box-title {
      color: #fff;
      margin-top: 25px;
      font-size: 26px;
    }
  }

  .right-box {
    flex: 1;
    position: relative;

    .copyright {
      font-size: 12px;
      position: absolute;
      bottom: 0;
      left: 45%;
      color: #9f9f9f;
    }

    .right-box-content {
      width: 435px;
      margin-top: 225px;
      margin-left: 60px;

      .logo {
        width: 165px;
        height: 65px;
        display: block;
        margin-left: 100px;
      }

      .right-box-login {
        padding-top: 30px;

        .input-box {
          margin-bottom: 16px;
          height: 38px;
        }

        .btn {
          display: block;
          width: 100%;
          background: #3c4183;
          color: #fff;
          height: 40px;
          font-size: 16px;
        }
      }

      h1 {
        font-weight: bold;
      }
    }
  }
}
</style>
  