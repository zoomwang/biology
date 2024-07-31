<script setup>
import { ref, computed, reactive, defineComponent } from "vue";
// import { menus } from './config';
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
  <main class="d-flex home-wrap">
    
  </main>
</template>
<style lang="scss">
.user-wrap{
  margin-bottom: 0!important;
  .content{
    flex: 1;
    // margin-left: 15px;
    background: #fff;
  }
}
.user-menu {
  width: 150px;
  height: 100%;
  padding: 10px 0;
  // margin-left: 40px;
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