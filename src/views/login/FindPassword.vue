<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
import config from "../../utils/config";
import { notification, Form } from "ant-design-vue";
import { sendSysCode, resetPassword } from "../../services/user";

const useForm = Form.useForm;
const show = ref(true);
const countdown = ref(config.timeCount);
const isSendCode = ref(false);

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
      countdown.value = config.timeCount;
      sendCode(false);
    }
    --countdown.value;
  }, 1000)
}
async function getVerifiCode() {
  const pattern =/^1[3456789]\d{1}$/; 
  if (!formState.mobile || pattern.test(formState.mobile)) {
    notification.error({
      message: '',
      description: '请填写正确的手机号',
    });
    return;
  }
  try {
    const res = await sendSysCode({
      mobile: formState.mobile
    });
    if (res?.code == 0) {
      countDown();
    }
  } catch(err) {
    alert(err);
  }
}
const formState = reactive({
  layout: "horizontal",
  code: "",
  mobile: "",
  oldPassword: "",
  newPassword: ""
});

const onSubmit = () => {
  if (formState.oldPassword != formState.newPassword) {
    notification.error({
      description: '密码不一致，请确认',
    });
    return;
  }
  validate()
    .then(async(res) => {
      try {
        const data = await resetPassword({
          mobile: formState.mobile,
          newPassword: formState.newPassword,
          code: formState.code 
        });
        if (data?.code == 0) {
          notification.success({
            description: "修改密码成功成功",
          });
          setTimeout(() => {
            router.push({name: "login"});
          }, 400);
          
        }
      } catch(err) {
        alert(err);
      }
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const reset = () => {
  resetFields();
};

const { resetFields, validate, validateInfos } = useForm(
  formState,
  reactive({
    mobile: [
      {
        required: true,
        message: "请输入手机号",
        pattern: /^1[3456789]\d{9}$/
      },
    ],
    code: [
      {
        required: true,
        message: "请输入验证码",
      },
    ],
    oldPassword: [
      {
        required: true,
        message: "请输入新密码",
      },
    ],
    newPassword: [
      {
        required: true,
        message: "请确认正确新密码",
      },
    ],
  })
);
</script>

<template>
  <div class="container">
    <h3 style="text-align: center">找回密码</h3>
    <a-form class="find-password" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="手机号" v-bind="validateInfos.mobile">
        <a-input v-model:value="formState.mobile" placeholder="请输入您注册时的手机号码" />
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos.code">
        <a-input class="f-fl" style="width: 282px" v-model:value="formState.code" placeholder="请输入验证码" />
        <a-button style="width:130px" class="f-fr" @click="getVerifiCode" :disabled="isSendCode">
          <span class="s-gauncode" v-if="!isSendCode"
            >获取验证码</span
          >
          <span class="t-countdown" v-else
            >重新获取({{ countdown }})s</span
          >
        </a-button>
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos.oldPassword">
        <a-input v-model:value="formState.oldPassword" placeholder="请填写您的新密码" />
      </a-form-item>
      <a-form-item label="确认密码" v-bind="validateInfos.newPassword">
        <a-input v-model:value="formState.newPassword" placeholder="请输入您的新密码" />
      </a-form-item>
      <!-- <a-form-item> -->
        <a-button class="b-base" style="width: 407px;" type="primary" @click.prevent="onSubmit">更新密码</a-button>
      <!-- </a-form-item> -->
    </a-form>
  </div>
</template>
<style lang="scss">
.container {
  margin: 40px auto !important;
  border: 1px solid #dedede;
  min-height: 470px;
  padding: 45px 0;
  .find-password{
    padding: 0 240px;
  }
}
</style>