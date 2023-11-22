<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
// import Logo from "../../assets/login/login_test.jpg";
import PcPosition from "../../assets/login/pc-position.png";
import CodePosition from "../../assets/login/code-position.jpg";
// import WechatLogo from "../../assets/login/wechat-logo.jpg";
import PhoneLogo from "../../assets/login/p-phone.png";
import WxScan from "../../components/WxScan.vue";
import { notification, Form } from "ant-design-vue";
import { mobileLogin, login } from "../../services/user";
import router from "../../router";
import $localStorage from "../../hooks/localStorage";
import { useCountDown, useSendCode, useGetVerifiCode } from "../../hooks/common";

const useForm = Form.useForm;
const show = ref(false);
const activeKey = ref("password");
const formState = reactive({
  layout: "horizontal",
  mobile: "",
  code: "",
  password: "",
});
const { isSendCode, changeSt } = useSendCode();
const countDown = useCountDown(changeSt);
const { getVerifiCode } = useGetVerifiCode(formState, () => {
  changeSt(true);
  countDown.countDown();
});

function change(boo) {
  if (typeof boo == "booelan") {
    show.value;
    return;
  } else {
    show.value = !show.value;
  }
}

const checkLogin = async function (type) {
  if (type == "password") {
    validate()
      .then(async (res) => {
        try {
          const data = await login({
            mobile: formState.mobile,
            password: formState.password,
          });
          if (data?.code == 0) {
            notification.success({
              description: "登录成功",
            });
            $localStorage.setItem("access_token", data?.data?.access_token);
            $localStorage.setItem("refresh_token", data?.data?.refresh_token);
            $localStorage.setItem("isLogin", true);
            setTimeout(() => {
              router.push({ name: "userinfo" });
            }, 400);
          }
        } catch (err) {
          alert(err);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }

  if (type == "verfiCode") {
    validatep()
      .then(async (res) => {
        try {
          const data = await mobileLogin({
            mobile: formState.mobile,
            code: formState.code,
          });
          if (data?.code == 0) {
            notification.success({
              description: "登录成功",
            });
            $localStorage.setItem("access_token", data?.data?.access_token);
            $localStorage.setItem("refresh_token", data?.data?.refresh_token);
            $localStorage.setItem("isLogin", true);
            setTimeout(() => {
              router.push({ name: "userinfo" });
            }, 400);
          }
        } catch (err) {
          alert(err);
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
};

const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive({
    mobile: [
      {
        required: true,
        message: "请输入手机号",
        pattern: /^1[3456789]\d{9}$/,
      },
    ],
    password: [
      {
        required: true,
        message: "请输入密码",
      },
    ],
  })
);

const {
  resetFields: resetFieldsp,
  validate: validatep,
  validateInfos: validateInfosp,
} = useForm(
  formState,
  reactive({
    mobile: [
      {
        required: true,
        message: "请输入手机号",
        pattern: /^1[3456789]\d{9}$/,
      },
    ],
    code: [
      {
        required: true,
        message: "请输入验证码",
      },
    ],
  })
);
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
        <img :src="CodePosition" class="login-type" @click="change" />
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="password" tab="密码登录">
            <a-form :layout="formState.layout" :model="formState">
              <a-form-item v-bind="validateInfos.mobile">
                <a-input
                  v-model:value="formState.mobile"
                  placeholder="请输入手机号"
                />
              </a-form-item>
              <a-form-item v-bind="validateInfos.password">
                <a-input
                  v-model:value="formState.password"
                  placeholder="请输入密码"
                />
              </a-form-item>
              <a-button
                type="primary"
                class="btn-login b-submit"
                @click="checkLogin('password')"
                >登录</a-button
              >
            </a-form>
          </a-tab-pane>
          <a-tab-pane key="verfiCode" tab="验证码登录">
            <a-form :layout="formState.layout" :model="formState">
              <a-form-item v-bind="validateInfosp.mobile">
                <a-input
                  v-model:value="formState.mobile"
                  placeholder="请输入手机号"
                />
              </a-form-item>
              <a-form-item style="height: 54px">
                <div class="code-content">
                  <a-form-item v-bind="validateInfosp.code" class="f-fl">
                    <a-input
                      style="width: 180px"
                      v-model:value="formState.code"
                      placeholder="验证码"
                      class="t-gaincode f-fl"
                    />
                  </a-form-item>
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
                      >重新获取({{ countDown.count }})s</span
                    >
                  </a-button>
                </div>
              </a-form-item>
              <a-button
                type="primary"
                class="btn-login b-submit"
                @click="checkLogin('verfiCode')"
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
  box-shadow: 0px 6px 16px -8px rgba(0, 0, 0, 0.08);
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
  height: auto !important;
  min-height: 100%;
}
#app {
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
