<script setup>
// import TheWelcome from '@/components/Wx.vue';
import { ref, computed, reactive, defineComponent } from "vue";
import { isLogged } from "../../services/user";
import { identity } from "./config";
import areaData from "../../public/area.js";
const formState = reactive({
  address: "",
  mobile: "123",
  identity: 1,
});
console.log("aeraData==", areaData);
const visible = ref(false);
const canEdit = ref(false);
const onSubmit = () => {
  console.log(formState);
};
</script>

<template>
  <!-- <a-card title="用户注册资料" :bordered="false"> -->
  <div class="userinfo d-form">
    <a-form :model="formState">
      <div class="l-item clear">
        <div class="t-label f-fl">登录账号：</div>
        <a-form-item class="f-fl">
          <a-button
            class="f-fl"
            @click.prevent="
              () => {
                visible = true;
              }
            "
            >点击查看联系方式</a-button
          >
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">姓名：</div>
        <a-form-item class="f-fl">
          <a-input :disabled="!canEdit" v-model:value="formState.name" placeholder="请姓名" />
        </a-form-item>
      </div>
      <div class="l-item clear l-identity">
        <div class="t-label f-fl">身份：</div>
        <a-form-item class="f-fl">
          <a-radio-group :disabled="!canEdit" name="identity" v-model:value="formState.identity">
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
          <a-input :disabled="!canEdit" v-model:value="formState.name" placeholder="请姓名" />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">地区：</div>
        <a-form-item class="f-fl">
          <a-cascader
            :disabled="!canEdit"
            showSearch
            :options="areaData"
            v-model="formState.address"
          />
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">高校：</div>
        <a-form-item class="f-fl">
          <a-select v-model:value="value2" :disabled="!canEdit">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">院系：</div>
        <a-form-item class="f-fl">
          <a-select v-model:value="value2" :disabled="!canEdit">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">所处阶段：</div>
        <a-form-item class="f-fl">
          <a-select v-model:value="value2" :disabled="!canEdit">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">请选择导师：</div>
        <a-form-item class="f-fl">
          <a-select v-model:value="value2" :disabled="!canEdit">
            <a-select-option value="lucy">Lucy</a-select-option>
          </a-select>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">入学年份：</div>
        <a-form-item class="f-fl">
          <a-space direction="vertical">
            <a-month-picker
              :disabled="!canEdit"
              style="width: 300px"
              v-model:value="formState.month"
              placeholder="请选择入学年份"
            />
          </a-space>
        </a-form-item>
      </div>
      <div class="l-item clear">
        <div class="t-label f-fl">毕业年份：</div>
        <a-form-item class="f-fl">
          <a-space direction="vertical">
            <a-month-picker
              :disabled="!canEdit"
              style="width: 300px"
              v-model:value="formState.month"
              placeholder="请选择毕业年份"
            />
          </a-space>
        </a-form-item>
      </div>
      <a-button type="primary" class="b-submit-button" v-if="!canEdit" @click.prevent="() => {
        canEdit = true;
      }"
        >编辑用户信息</a-button
      >
      <a-popconfirm
        v-if="canEdit"
        title="确认要提交用户信息吗?"
        ok-text="是"
        cancel-text="否"
        @confirm="onSubmit"
      >
        <a-button type="primary" class="b-submit-button" @click.prevent="() => {
        
      }"
        >提交用户信息</a-button
      >
      </a-popconfirm>
    </a-form>
  </div>

  <!-- </a-card> -->
  <!-- 用户注册资料 -->
  <a-modal
    v-model:visible="visible"
    title="登录账号"
    @ok="
      () => {
        visible = false;
      }
    "
  >
    {{ formState.mobile }}
  </a-modal>
</template>
<style lang="scss">
.userinfo {
  .ant-form-item {
    .ant-select {
      width: 600px !important;
    }
  }
  .ant-radio-wrapper {
    margin-top: 5px;
  }
  .b-submit-button{
    width: auto;
  }
}
.ant-form-item {
  width: 600px;
  text-align: left;
}
</style>