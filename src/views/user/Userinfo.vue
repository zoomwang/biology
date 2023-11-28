<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent } from "vue";
import { isLogged } from "../../services/user";
import { identity } from "./config";
const formState = reactive({
  layout: "horizontal",
  identity: "2",
  no: "",
  name: "",
  month: "",
});

const onSubmit = () => {
  console.log(formState);
};

// try {
//   const data = isLogged();
// } catch(err) {
//   alert(err);
// }
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo d-form">
    <div class="l-item clear">
      <div class="t-label f-fl">登录账号：</div>
      <a-form-item class="f-fl">
        <a-input v-model:value="formState.no" placeholder="请输入手机号" />
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">姓名：</div>
      <a-form-item class="f-fl">
        <a-input v-model:value="formState.name" placeholder="请姓名" />
      </a-form-item>
    </div>
    <div class="l-item clear l-identity">
      <div class="t-label f-fl">身份：</div>
      <a-form-item class="f-fl">
        <a-radio-group name="identity" v-model:value="formState.identity">
          <a-radio
            v-for="item in identity"
            :value="item.value"
            :key="item.value"
            >{{ item.label }}</a-radio
          >
        </a-radio-group>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">邀请人手机号：</div>
      <a-form-item class="f-fl">
        <a-input v-model:value="formState.name" placeholder="请姓名" />
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">地区：</div>
      <a-form-item class="f-fl">
        <a-select v-model:value="value2">
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">高校：</div>
      <a-form-item class="f-fl">
        <a-select v-model:value="value2">
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">院系：</div>
      <a-form-item class="f-fl">
        <a-select v-model:value="value2">
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">所处阶段：</div>
      <a-form-item class="f-fl">
        <a-select v-model:value="value2">
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">请选择导师：</div>
      <a-form-item class="f-fl">
        <a-select v-model:value="value2">
          <a-select-option value="lucy">Lucy</a-select-option>
        </a-select>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">入学年份：</div>
      <a-form-item class="f-fl">
        <a-space direction="vertical">
          <a-month-picker
            style="width:300px"
            v-model:value="formState.month"
            placeholder="Select month"
          />
        </a-space>
      </a-form-item>
    </div>
    <div class="l-item clear">
      <div class="t-label f-fl">毕业年份：</div>
      <a-form-item class="f-fl">
        <a-space direction="vertical">
          <a-month-picker
            style="width:300px"
            v-model:value="formState.month"
            placeholder="Select month"
          />
        </a-space>
      </a-form-item>
    </div>
    <a-button type="primary" class="b-submit-button" @click.prevent="onSubmit"
      >提交</a-button
    >
  </div>
  <!-- </a-card> -->
  <!-- 用户注册资料 -->
  <div class="container-userinfo">
    <!-- <div class="h2">用户注册资料</div> -->
  </div>
</template>
<style lang="scss">
.userinfo {
  .ant-form-item {
    .ant-select {
      width: 600px !important;
    }
  }
}
.ant-form-item {
  width: 600px;
  text-align: left;
}
.userinfo {
  .ant-radio-wrapper {
    margin-top: 5px;
  }
  // .l-identity {
  //   margin-bottom: 10px;
  // }
}
</style>