<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, defineComponent, reactive } from "vue";
import Logo from "../../assets/login/login_test.jpg";
import PcPosition from "../../assets/login/pc-position.png";
import CodePosition from "../../assets/login/code-position.jpeg";
import WechatLogo from "../../assets/login/wechat-logo.jpg";
import PhoneLogo from "../../assets/login/p-phone.png";
import WxScan from "../../components/WxScan.vue";
import { notification } from "ant-design-vue";
import config from "../../utils/config";
// import { useCountDown } from "../../hooks/common";

const show = ref(false);
const activeKey = ref("1");
const countdown = ref(config.timeCount);
const isSendCode = ref(false);
console.log(import.meta.env)

function change(boo) {
  if (typeof boo == "booelan") {
    show.value;
    return;
  } else {
    show.value = !show.value;
  }
}

function sendCode(boo) {
  if (typeof boo == "booelan") {
    isSendCode.value = boo;
    return;
  } else {
    isSendCode.value = !isSendCode.value;
  }
}

function countDown() {
  sendCode(true);
  let se = setInterval(() => {
    if (countdown.value <= 1) {
      clearInterval(se);
      countdown.value = 6;
      sendCode(false);
    }
    --countdown.value;
  }, 1000)
}

function getVerifiCode() {
  const pattern =/^1[3456789]\d{1}$/; 
  if (!formState.phone || pattern.test(formState.phone)) {
    notification.error({
      message: '',
      description: '请填写正确的手机号',
    });
    return;
  }
  // 请求接口判断是否已登录，是的话提示去登录

  // 请求后端接口逻辑
  countDown();
}
const formState = reactive({
  layout: "horizontal",
  phone: "",
  verifi: "",
  password: "",
});

const checkPasswordLogin = function () {
  if (!formState.phone) {
    notification.error({
      description: "请填写正确的手机号",
    });
  }

  if (!formState.password) {
    notification.error({
      message: "",
      description: "请填写正确的密码",
    });
  }

  //后端api逻辑
};

const checkVerfiLogin = function () {
  if (!formState.phone) {
    notification.error({
      message: "",
      description: "请填写正确的手机号",
    });
  }

  if (!formState.verifi) {
    notification.error({
      message: "",
      description: "请填写正确的验证码",
    });
  }

  //后端api逻辑
};

</script>

<template>
  <div class="container login">
    <div class="wechatLogin public-login" v-show="show">
      <!-- 微信扫码登录 -->
      <div class="title">微信登录</div>
      <img :src="PcPosition" class="login-type" @click="change" />
      <WxScan></WxScan>
      <div class="t-center t-title">
        微信扫码<span class="t-time c-blue">1</span>秒登录
      </div>
      <div class="t-center c-blue">
        <a
          @click="
            () => {
              change(false);
            }
          "
          >手机号登录</a
        >｜
        <a href="/home/register">立即注册</a>
      </div>
    </div>
    <!-- 微信扫码成功后提示 -->
    <div class="scan-success public-login wechatLogin" v-show="show">
      <div class="title">微信注册</div>
      <div class="wechatLogin-title1">请根据提示在手机上完成操作</div>
      <div class="i-img">
        <img :src="PhoneLogo" />
      </div>
      <div class="wechatLogin-title2">
        首次扫码需要绑定手机号，
        <br />下次扫码可实现1秒登录哦~
      </div>
      <div class="scan-again b-again">
        <a href="/home/registry">重新扫码</a>
      </div>
      <div class="register-again b-again">
        <a href="/home/registry">手机号注册</a>
      </div>
    </div>
    <div class="main-content">
      <div class="public-login phone-login" v-show="!show">
        <!-- <img :src="CodePosition" class="login-type" @click="change" /> -->
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="1" tab="密码登录">
            <a-form
              :layout="formState.layout"
              :model="formState"
            >
              <a-form-item>
                <a-input
                  v-model:value="formState.phone"
                  placeholder="请输入手机号"
                />
              </a-form-item>
              <a-form-item>
                <a-input
                  v-model:value="formState.password"
                  placeholder="请输入密码"
                />
              </a-form-item>
              <a-button
                type="primary"
                class="btn-login b-submit"
                @click="checkPasswordLogin"
                >登录</a-button
              >
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="2" tab="验证码登录">
            <a-form
              :layout="formState.layout"
              :model="formState"
            >
              <a-form-item>
                <a-input
                  v-model:value="formState.phone"
                  placeholder="请输入手机号"
                />
              </a-form-item>
              <a-form-item>
                <div class="code-content clear">
                  <a-input
                    style="width: 180px"
                    v-model:value="formState.verifi"
                    placeholder="验证码"
                    class="t-gaincode f-fl"
                  />
                  <a-button
                    type="primary"
                    ghost
                    :disabled="isSendCode"
                    class="b-base b-gaincode f-fl"
                    @click="getVerifiCode"
                  >
                    <span class="s-gauncode" v-if="!isSendCode"
                      >获取验证码</span
                    >
                    <span class="t-countdown" v-else
                      >重新获取({{ countdown }})s</span
                    >
                  </a-button>
                </div>
              </a-form-item>
              <a-button
                type="primary"
                class="btn-login b-submit"
                @click="checkVerfiLogin"
                >登录</a-button
              >
            </a-form>
          </a-tab-pane>
        </a-tabs>
        <div class="login-tip" style="overflow: hidden">
          <div class="t-left f-fl">
            还没账号？<a href="/home/register">立即注册</a>
          </div>
          <div class="f-fr"><a href="/home/find-password">忘记密码？</a></div>
        </div>
        <!-- <div class="weichat-tip" style="margin-top: 20px">
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
        </div> -->
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
  height: auto!important;
  min-height: 100%;
}
#app{
  height: auto;
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
  width: 205px;
}
.code-content {
  width: 400px;
}
.login .b-gaincode {
  width: 130px;
  height: 54px;
  line-height: 34px;
  left: -85px;
  // color: rgba(0, 0, 0, 0.45);
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
.scan-success {
  .wechatLogin-title1 {
    font-size: 16px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #555;
    margin-top: 35px;
  }
  .wechatLogin-title2 {
    width: 284px;
    padding: 12px 50px;
    margin: 0 auto;
    border: 1px solid #1677ff;
    border-bottom: 3px solid #1677ff;
    border-radius: 3px;
    margin-bottom: 36px;
    font-size: 13px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: #555;
    line-height: 24px;
  }
  .i-img {
    width: 88px;
    height: 121px;
    margin: 25px auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .b-again {
    margin: 0 auto;
    margin-top: 10px;
    color: #1677ff;
  }
}
</style>