<script setup>
import { ref, computed, reactive, defineComponent, watch } from "vue";
import { useStorage } from "@/hooks/useStorage";
import $localStorage from "@/hooks/localStorage";
import Menu from "./components/menu.vue";
const key = useStorage("menu");
const state = reactive({
  mode: "inline",
  theme: "light",
  selectedKeys: ["userData"],
  openKeys: ["userData"],
});
const menuType = ref($localStorage.getItem("menu"));
watch(key, async (newdata, olddata) => {
  menuType.value = newdata
})
</script>

<template>
<div class="detail">
  <!-- 用户注册资料 -->
  <a-card title="项目简介" style="width: 100%;">
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
  <a-card title="结果展示" style="width: 100%;">
    <p>card content</p>
    <p>card content</p>
    <p>card content</p>
  </a-card>
  </div>
</template>
<style lang="scss" scoped>
.detail{
  margin-top: 15px;
  position: relative;
  left: -15px;
}
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