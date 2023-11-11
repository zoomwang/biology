<script setup>
import { ref, computed, defineComponent, reactive } from "vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
const show = ref(true);
const activeKey = ref("1");
const formState = reactive({
  layout: "horizontal",
  fieldA: "",
  fieldB: "",
});
const modelRef = reactive({
  name: "",
  sub: {
    name: "",
  },
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
    name: [
      {
        required: true,
        message: "Please input name",
      },
    ],
    "sub.name": [
      {
        required: true,
        message: "Please input sub name",
      },
    ],
  })
);
</script>

<template>
  <div class="container">
    <h3 style="text-align: center">找回密码</h3>
    <a-form class="find-password" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="手机号" v-bind="validateInfos.name">
        <a-input v-model:value="modelRef.name" placeholder="请输入您注册时的手机号码" />
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos['sub.name']">
        <a-input class="f-fl" style="width: 280px" v-model:value="modelRef.sub.name" placeholder="请输入验证码" />
        <a-button class="f-fr">获取手机验证码</a-button>
      </a-form-item>
      <a-form-item label="新密码" v-bind="validateInfos['sub.name']">
        <a-input v-model:value="modelRef.sub.name" placeholder="请填写您的新密码" />
      </a-form-item>
      <a-form-item label="确认密码" v-bind="validateInfos['sub.name']">
        <a-input v-model:value="modelRef.sub.name" placeholder="请输入您的新密码" />
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