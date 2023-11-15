<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
import WechatLogo from "../../assets/login/wechat-logo.jpg";
import Phone from "../../assets/phone.webp";
import WxScan from "../../components/WxScan.vue";
import { notification } from 'ant-design-vue';

const activeKey = ref("1");
// import TheWelcome from '@/components/Wx.vue';
const formState = reactive({
  layout: "horizontal",
  fieldA: "",
  fieldB: "",
});
const show = ref(true);
// data(){
//   return{

//   }
// };
// const expired = ref(false);
// const wxUrl = ref("");
function change(boo) {
  console.log(show);
  if (typeof boo == "booelan") {
    show.value;
    return;
  } else {
    show.value = !show.value;
  }
}
function getVerifiCode() {
  if (!formState.phone) {
    notification.error({
      message: '错误',
      description: '请填写手机号',
    });
  }
}
function getCode(){
  
}
// function getWxUrl() {
//   return `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=gQF47zwAAAAAAAAAAS5odHRwOi8vd2VpeGluLnFxLmNvbS9xLzAyZkF0dnB3cERkUjQxbXkxZ2hCY0gAAgTyPFBlAwSwBAAA`
// }
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
  <main class="container register-container">
    <div class="register-account" v-show="show">
      <div class="h2 t-center">注册账号</div>
      <div class="h3 t-center t-grey">第一步 验证手机号</div>
      <a-form
        class="f-form"
        :model="formState"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <div class="register-form-item">
          <div class="l-item clear">
            <div class="t-item f-fl"><span class="t-red">*</span>手机号：</div>
            <a-form-item class="f-fl">
              <!-- <a-select
                v-model:value="value2"
                style="width: 120px; margin-right: 10px"
              >
                <a-select-option value="lucy">Lucy</a-select-option>
              </a-select> -->
              <a-input
                style="width: 403px"
                v-model:value="formState.fieldA"
                placeholder="请输入手机号"
              />
            </a-form-item>
          </div>
          <div class="l-item">
            <div class="t-item f-fl"><span class="t-red">*</span> 验证码：</div>
            <a-form-item>
              <div class="code-content clear">
                <a-input
                  style="width: 265px !important"
                  v-model:value="formState.fieldB"
                  placeholder="请填写验证码"
                  class="t-gaincode f-fl"
                />
                <a-button
                  @click="getVerifiCode"
                  type="primary"
                  ghost
                  class="b-base b-gaincode f-fl"
                  style="width: 120px; text-align: center; padding: 0;"
                   v-bind:disabled="dis" >
                  <span class="s-gauncode" v-if="show">获取验证码</span>
                  <span class="t-countdown" v-else>重新获取()s</span>
                  </a-button
                >
                <!-- <div class="t-againcode b-base f-fl" style="width: 120px; text-align: center; padding: 0">
                  重新获取（<span class="t-countdown">0</span>S）
                </div> -->
              </div>
            </a-form-item>
          </div>
        </div>
        <div class="register-tip" style="width: 400px">
          <div style="overflow: hidden">
            <a-checkbox class="f-fl" v-model:checked="checked"> </a-checkbox>
            <span class="readme" style="text-align: left">
              <span style="margin-left: 10px">我已阅读并同意</span>
              <a>《科学指南针服务协议》、</a><a>《隐私政策》、</a>
              <a style="margin-left: 20px">《科学指南针售后协议》</a></span
            >
          </div>

          <div style="height: 42px; margin-left: 15px; margin-top: 10px">
            <a-button class="b-base b-next" type="primary">下一步</a-button>
          </div>
          <div style="margin-top: 20px; text-align: right">
            已有账号，<a href="/home/login">马上登录</a>
          </div>
          <div class="weichat-tip">
            <a-divider>微信扫码快速注册</a-divider>
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
      </a-form>
    </div>
    <div class="wechatLogin public-login" v-show="!show">
      <!-- 微信扫码注册 -->
      <div class="title">微信注册</div>
      <div style="position: absolute; top: 42px; right: 40px; text-align: right">
        已有账号，<a href="/home/login">马上登录</a>
      </div>
      <!-- <img :src="PcPosition" class="login-type" @click="change" /> -->
      <WxScan></WxScan>
      <div class="t-center t-title">微信扫码快速注册</div>
      <div class="t-center c-blue">
        <a-divider>手机号注册</a-divider>
        <!-- <div class="t-grey">微信扫码快速注册</div> -->
        <a class="phone-login">
          <img
            @click="
              () => {
                change(false);
              }
            "
            :src="Phone"
            class="i-weichat"
          />
        </a>
      </div>
    </div>
  </main>
</template>
<style scoped lang="scss">
.phone-login {
  width: 42px;
  height: 42px;
  padding: 0;
  text-align: center;
  vertical-align: middle;
  display: block;
  border-radius: 50%;
  margin: 0 auto;
  // background-color: #1677ff
}
.readme {
  overflow: hidden;
  a,
  span {
    float: left;
  }
  // .last{
  //   float: left;
  // }
}
.register-tip {
  margin-left: 90px;
  .b-next {
    width: 100%;
    height: 42px;
    line-height: 32px;
    margin-top: 10px;
  }
  .ant-checkbox-wrapper {
    .ant-checkbox {
      position: relative;
      top: -10px !important;
    }
    vertical-align: top;
  }
}
.f-form {
  width: 600px;
  margin: 0 auto;
  .register-form-item {
    margin-left: 25px;
  }
}
// .register-account
.container .register-account {
  width: 930px;
  margin: 130px auto;
  background: #fff;
  margin: 60px auto;
  box-shadow: 0px 4px 8px 0px rgba(86, 190, 178, 0.19);
  border-radius: 10px;
  padding-bottom: 20px;
}
.container,
.register-form-item {
  width: 980px;
  margin: 30px auto 35px auto;
  text-align: center;
}
.h2 {
  height: 45px;
  background: #1677ff;
  border-radius: 10px 10px 0px 0px;
  text-align: center;
  line-height: 45px;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
}
.h3 {
  margin-top: 30px;
  margin-bottom: 26px;
  line-height: 17px;
  font-size: 16px;
  font-family: PingFang-SC-Bold, PingFang-SC;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.75);
}
.t-item {
  line-height: 32px;
  padding-right: 10px;
  font-size: 14px;
}
.register-form-item input,
.register-form-item button {
  height: 36px;
  line-height: 36px;
  padding: 0 0 0 12px;
  // font-size: 14px;
}
.i-weichat {
  width: 42px;
  height: 42px;
  margin-top: 5px;
  cursor: pointer;
}
.erCode{
.wx-scan{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .m-mask{
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.9);
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    .c-white{
      margin-bottom: 10px;
    }
  }
}
.weichat-tip {
  position: relative;
  margin: 40px auto;
}
.t-againcode{
  height: 36px;
    line-height: 36px;
    padding: 0 0 0 12px;
  color: #1677ff;
  border: 1px solid #1677ff;
    // box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
}
</style>
