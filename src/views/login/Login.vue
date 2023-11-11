<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, defineComponent, reactive } from "vue";
import Logo from "../../assets/login/login_test.jpg";
import PcPosition from "../../assets/login/pc-position.png";
import CodePosition from "../../assets/login/code-position.jpeg";
import WechatLogo from "../../assets/login/wechat-logo.jpg";
const show = ref(true);
const activeKey = ref("1");
function change(boo) {
  console.log(show);
  if (typeof boo == "booelan") {
    show.value;
    return;
  } else {
    show.value = !show.value;
  }
}
const formState = reactive({
  layout: "horizontal",
  fieldA: "",
  fieldB: "",
});
const formItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      }
    : {};
});
const buttonItemLayout = computed(() => {
  const { layout } = formState;
  return layout === "horizontal"
    ? {
        wrapperCol: {
          span: 14,
          offset: 4,
        },
      }
    : {};
});
</script>

<template>
  <div class="container login">
    <div class="wechatLogin public-login" v-show="show">
      <!-- 微信扫码登录 -->
      <div class="title">微信登录</div>
      <img :src="PcPosition" class="login-type" @click="change" />
      <div class="erCode">
        <img />
      </div>
      <div class="t-center t-title">
        微信扫码<span class="t-time c-blue">1</span>秒登录
      </div>
      <div class="t-center green">
        <a
          @click="
            () => {
              change(false);
            }
          "
          >手机号登录</a
        >｜
        <a>立即注册</a>
      </div>
    </div>
    <div class="main-content">
      <div class="public-login phone-login" v-show="!show">
        <img :src="CodePosition" class="login-type" @click="change" />
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="密码登录">
            <a-form
              :layout="formState.layout"
              :model="formState"
              v-bind="formItemLayout"
            >
              <a-form-item>
                <a-input
                  v-model:value="formState.fieldA"
                  placeholder="请输入手机号"
                />
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model:value="formState.fieldB"
                  placeholder="请输入密码"
                />
              </a-form-item>
              <a-button type="primary" class="btn-login b-submit"
                >登录</a-button
              >
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="验证码登录">
            <a-form
              :layout="formState.layout"
              :model="formState"
              v-bind="formItemLayout"
            >
              <a-form-item>
                <a-input
                  v-model:value="formState.fieldA"
                  placeholder="请输入手机号"
                />
              </a-form-item>
              <a-form-item>
                <div class="code-content clear">
                  <a-input
                    style="width: 210px"
                    v-model:value="formState.fieldB"
                    placeholder="验证码"
                    class="t-gaincode f-fl"
                  />
                  <a-button class="b-base b-gaincode f-fl">获取验证码</a-button>
                </div>
              </a-form-item>
              <a-button type="primary" class="btn-login b-submit"
                >登录</a-button
              >
            </a-form>
          </a-tab-pane>
        </a-tabs>
        <div class="login-tip" style="overflow: hidden;">
          <div class="t-left f-fl">还没账号？<a href="/home/register">立即注册</a></div>
          <div class="f-fr"><a href="/home/find-password">忘记密码？</a></div>
        </div>
        <div class="weichat-tip" style="margin-top:20px">
          <div class="t-grey">—— 第三方账号登录 ——</div>
          <img
            @click="
              () => {
                change(false);
              }
            "
            :src="WechatLogo"
            class="i-weichat"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.main-content {
  margin: 30px auto 0 auto;
}
.tabs-extra-demo-button {
  margin-right: 16px;
}

.ant-row-rtl .tabs-extra-demo-button {
  margin-right: 0;
  margin-left: 16px;
}
.phone-login {
  padding: 40px 40px 20px 40px;
  text-align: center;
  position: relative;
  width: 400px;
}
.ant-tabs-tab-btn {
  cursor: pointer;
  font-size: 16px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.85);
}
.login .ant-input {
  position: relative;
  width: 315px;
  height: 54px;
  line-height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.15);
}

.btn-login.b-submit {
  font-weight: bold;
  margin-left: 0;
  width: 315px;
}
.container {
  margin: 0 auto;
}
body {
  background: url("../../assets/login/bgLogin.jpg") no-repeat;
  background-size: 100% 100%;
}
.container .public-login {
  position: relative;
  width: 400px;
  margin: 50px auto 40px;
  background: #fff;
}
.wechatLogin {
  padding: 40px 40px 20px 40px;
  text-align: center;
  .title {
    font-size: 18px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.85);
    text-align: left;
    margin-bottom: 30px;
  }
}
.login-type {
  position: absolute;
  top: 0;
  right: 0;
  width: 82px;
  height: 82px;
  cursor: pointer;
}
.erCode {
  width: 250px;
  height: 250px;
  padding: 10px;
  margin: 0 auto;
  background: url(../../assets/login/bg-code.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 50px;
  margin-bottom: 20px;
  position: relative;
}
.wechatLogin .t-title {
  color: #444;
  padding-bottom: 20px;
  span {
    font-weight: bold;
    font-size: 16px;
    padding: 0 3px;
  }
}
.t-gaincode {
  // display: flex;
  // float: left;
  width: 205px;
  // margin-right: 20px;
}
.code-content {
  width: 400px;
}
.login .b-gaincode {
  // float: right;
  width: 100px;
  height: 54px;
  line-height: 34px;
  left: -85px;
  // margin-left: 20px;
  color: rgba(0, 0, 0, 0.45);
}
.weichat-tip {
  padding: 5px 0;
}
.i-weichat {
  width: 42px;
  height: 42px;
  margin-top: 5px;
  cursor: pointer;
}
</style>