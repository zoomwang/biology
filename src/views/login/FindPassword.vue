<script setup>
import { ref, reactive } from "vue";
import { notification, Form } from "ant-design-vue";
import { resetPassword } from "../../services/user";
import { useCountDown, useSendCode, useGetVerifiCode } from "../../hooks/common";

const useForm = Form.useForm;
const show = ref(true);
const { isSendCode, changeSt } = useSendCode();
const countDown = useCountDown(changeSt);
const formState = reactive({
  layout: "horizontal",
  code: "",
  mobile: "",
  oldPassword: "",
  newPassword: ""
});

const { getVerifiCode } = useGetVerifiCode(formState, () => {
  changeSt(true);
  countDown.countDown();
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
            description: "修改密码成功",
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
    <a-form class="find-password" style="width:980px;margin: 0 auto;" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="手机号" v-bind="validateInfos.mobile">
        <a-input v-model:value="formState.mobile" placeholder="请输入您注册时的手机号码" />
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos.code">
        <a-input class="f-fl" style="width: 270px" v-model:value="formState.code" placeholder="请输入验证码" />
        <a-button style="width:130px" class="f-fr" @click="getVerifiCode" :disabled="isSendCode">
          <span class="s-gauncode" v-if="!isSendCode"
            >获取验证码</span
          >
          <span class="t-countdown" v-else
            >重新获取({{ countDown.count }})s</span
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
        <a-button class="b-base" style="width: 400px;margin: 0 auto;float: none;" type="primary" @click.prevent="onSubmit">更新密码</a-button>
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