<script setup>
// import { isLogged, logout } from "../services/user";
import { ref, computed, defineComponent, reactive } from "vue";
import { useRoute } from "vue-router";
import { onMounted, onUpdated, watch} from "vue";
import { DownOutlined } from '@ant-design/icons-vue';
import router from '../router';
import { useStorage } from "../hooks/useStorage";
import { notification } from "ant-design-vue";

const key = useStorage("isLogin");
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
const route = useRoute();
const islogged= ref(false);
watch(key, async (newdata, olddata) => {
  if (newdata == true) {
    islogged.value = true;
  } else {
    islogged.value = false;
  }
  console.log('localStorage.isLogin==', localStorage.isLogin)
})

const setLogout = async function () {
  localStorage.clear();
  notification.success({
    description: '退出成功',
  });
  setTimeout(() => {
    router.push({name: "login"});
  }, 400)
}

const toPublishPrestore = () => {
  router.push({name: "publishPrestore"});
}

const toPublish = () => {
  router.push({name: "publishPrestore"});
}

const toDemand = () => {
  router.push({name: "publishDemand"});
}

</script>

<template>
  <div class="login-component d-flex" v-if="!route?.fullPath.includes('home')">
    <a-button type="primary" class="预存" @click="toPublishPrestore">预存</a-button>
    <a-button class="" @click="toDemand">发布需求</a-button>
    <div class="new-login" v-if="!islogged">
      <a href="/home/login">登录</a> |
      <a href="/home/register" class="schoolRegister">注册</a>
    </div>
    <div class="login" v-else>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          王荣荣
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu class="menu">
            <a-menu-item>
              <a href="javascript:;">个人中心</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">我的发票</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">我的积分</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">邀请好友</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">优惠券管理</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="setLogout">退出</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped>
.login-component{
  align-content: center;
  justify-content:end
}
.header_middle .new-login{
		display: inline-block;
		margin-left: 10px;
		height: 45px;
		line-height: 45px;
		font-size: 0;
	}
  .new-login{
    padding-top: 6px;
  }
	.new-login a{
		font-size: 16px;
		font-family: PingFang-SC-Bold, PingFang-SC;
		color: rgba(0, 0, 0, 0.85)!important;
		padding: 0 12px;
		height: 18px;
	}
  .login-component button{
    display: block;
    width: 100px;
    height: 40px;
  }
  .login-component button.ant-btn-default{
    margin: 0 10px 0 10px;
  }
  .login-component .login{
    margin-right: 10px;
    margin-top: 10px
  }
  /* .login a{
    
  } */
  .menu a{
    color: #000!important;
  }
	.header_middle .new-login a:first-child{
		border-right: 1px solid #D9D9D9;
	}
	.header_middle .new-login a:last-child{
		padding-right: 0;
	}
</style>
