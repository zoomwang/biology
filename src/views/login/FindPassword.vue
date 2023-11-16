<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
const show = ref(true);
const activeKey = ref("1");
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
      countdown.value = 6;
      sendCode(false);
    }
    --countdown.value;
  }, 1000)
}
const formState = reactive({
  layout: "horizontal",
  fieldA: "",
  fieldB: "",
});
const modelRef = reactive({
  verifi: "",
  phone: "",
  oldPassword: "",
  newPassword: ""
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

const onSubmit = () => {
  validate()
    .then((res) => {
      console.log(res, toRaw(modelRef));
    })
    .catch((err) => {
      console.log("error", err);
    });
};
const reset = () => {
  resetFields();
};

const { resetFields, validate, validateInfos } = useForm(
  modelRef,
  reactive({
    phone: [
      {
        required: true,
        message: "请输入手机号",
      },
    ],
    verifi: [
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
      <a-form-item label="手机号" v-bind="validateInfos.phone">
        <a-input v-model:value="modelRef.phone" placeholder="请输入您注册时的手机号码" />
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos.verifi">
        <a-input class="f-fl" style="width: 280px" v-model:value="modelRef.verifi" placeholder="请输入验证码" />
        <a-button style="width:130px" class="f-fr">
          <span class="s-gauncode" v-if="!isSendCode"
            >获取验证码</span
          >
          <span class="t-countdown" v-else
            >重新获取({{ countdown }})s</span
          >
        </a-button>
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos.oldPassword">
        <a-input v-model:value="modelRef.oldPassword" placeholder="请填写您的新密码" />
      </a-form-item>
      <a-form-item label="确认密码" v-bind="validateInfos.newPassword">
        <a-input v-model:value="modelRef.newPassword" placeholder="请输入您的新密码" />
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