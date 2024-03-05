<script setup>
import { useRoute, useRouter } from "vue-router";
import UserInfo from './Userinfo.vue';
import Integral from './Integral.vue';
import Invite from './Invite.vue';
import Order from './Order.vue';
import Discount from './Discount.vue';
import Assets from './Assets.vue';
import Invoices from './Invoices.vue';
import Store from './Store.vue';
import { reactive } from "vue";
import { menus } from './config';
import router from "../../router";

const routers = useRouter();
const route = useRoute();
const state = reactive({
  mode: "inline",
  theme: "light",
  selectedKeys: [route.query.selectedKeys || "1"],
  openKeys: [route.query.selectedKeys || "1"],
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
      v-model:selectedKeys="state.selectedKeys"
      :mode="state.mode"
      :theme="state.theme"
      @select="() => {
        router.push({ path: '/user/userinfo', query: { selectedKeys: state.selectedKeys } })
      }"
    >
      <h2>账号管理</h2>
      <template v-for="item in menus" :key="item.value">
        <a-menu-item  v-if="item.type == 'userMenu'" :key="item.value">
          <template #icon> </template>
          {{ item.label }}
        </a-menu-item>
      </template>
      <h2>订单管理</h2>
      <template v-for="item in menus" :key="item.value">
        <a-menu-item  v-if="item.type == 'orderMenu'" :key="item.value">
          <template #icon> </template>
          {{ item.label }}
        </a-menu-item>
      </template>
      <h2>发票管理</h2>
      <template v-for="item in menus" :key="item.value">
        <a-menu-item  v-if="item.type == 'invoiceMenu'" :key="item.value">
          <template #icon> </template>
          {{ item.label }}
        </a-menu-item>
      </template>
      <h2>预存管理</h2>
      <template v-for="item in menus" :key="item.value">
        <a-menu-item  v-if="item.type == 'storeMenu'" :key="item.value">
          <template #icon> </template>
          {{ item.label }}
        </a-menu-item>
      </template>
    </a-menu>
    <div class="content">
      <a-card :bordered="false">
        <Assets v-if="state.selectedKeys.includes('0')" />
        <UserInfo v-if="state.selectedKeys.includes('1')" />
        <Integral v-if="state.selectedKeys.includes('2')" />
        <Invite v-if="state.selectedKeys.includes('3')" />
        <Order v-if="state.selectedKeys.includes('10')" />
        <Invoices v-if="state.selectedKeys.includes('8')" />
        <Discount v-if="state.selectedKeys.includes('9')" />
        <Store v-if="state.selectedKeys.includes('11')" />
      </a-card>
    </div>
  </main>
</template>
<style lang="scss" scoped>
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
    text-align: left;
    padding-left: 20px;
    font-size: 16px;
    margin-bottom: 0;
  }
}
</style>