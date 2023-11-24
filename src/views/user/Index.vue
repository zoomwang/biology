<script setup>
import UserInfo from './Userinfo.vue';
import { ref, computed, reactive, defineComponent } from "vue";
const state = reactive({
  mode: "inline",
  theme: "light",
  selectedKeys: ["userData"],
  openKeys: ["userData"],
});
const map = reactive({
  "userData": "userData",
  "userIntegral": "userIntegral"
});
</script>

<template>
  <!-- 用户注册资料 -->
  <main class="d-flex user-wrap">
    <a-menu
      class="user-menu"
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      :mode="state.mode"
      :theme="state.theme"
    >
      <h2>账号管理</h2>
      <a-menu-item key="userData">
        <template #icon> </template>
        个人资料
      </a-menu-item>
      <a-menu-item key="userIntegral">
        <template #icon> </template>
        我的积分
      </a-menu-item>
      <h2>订单管理</h2>
    </a-menu>
    <div class="content">
      <UserInfo v-show="state.selectedKeys == 'userData'" />
    </div>
  </main>
</template>
<style lang="scss">
.user-wrap{
  .content{
    flex: 1;
    margin-left: 15px;
    background: #fff;
  }
}
.user-menu {
  width: 150px;
  height: 100%;
  padding: 10px 0;
  margin-left: 40px;
  .ant-menu-item {
    padding-left: 0!important;
    padding-right: 0!important;
    text-align: center;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    border-radius: 0!important;
  }
  h2{
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    margin-bottom: 0;
  }
}
</style>