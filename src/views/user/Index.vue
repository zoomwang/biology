<script setup>
import {
  ref,
  onMounted
} from "vue";
import { useRoute, useRouter } from "vue-router";
import UserInfo from './Userinfo.vue';
import Integral from './Integral.vue';
import Invite from './Invite.vue';
import Order from './Order.vue';
import Discount from './Discount.vue';
import Assets from './Assets.vue';
import Invoices from './Invoices.vue';
import Store from './Store.vue';
import ManageOrder from './Manage/order/index.vue';
import ManageSupplier from './Manage/supplier/index.vue';
import ManageList from './Manage/supplierList/index.vue';
import ManageSum from './Manage/supplierSum/index.vue';
import ManageUser from './Manage/user/index.vue';
import ManageSQL from './Manage/sql/index.vue';
import BuffetBuild from './Manage/BuffetBuild/index.vue';
import { reactive } from "vue";
import { menus } from './config';
import router from "../../router";
import { getUserIsPriviage } from "../../services/user";

const routers = useRouter();
const route = useRoute();
const state = reactive({
  mode: "inline",
  theme: "light",
  selectedKeys: [route.query.selectedKeys || "1"],
  openKeys: ["sub1"],
  userIsPriviage: false,
});
// const drawerVisible = ref(false);
const map = reactive({
  "userData": "userData",
  "userIntegral": "userIntegral"
});
const getUserIsPriviages = async() => {
  const res = await getUserIsPriviage();
  if (res?.code == 0) state.userIsPriviage = res.data;
}
onMounted(() => {
  getUserIsPriviages();
});
</script>

<template>
  <!-- 用户注册资料 -->
  <main class="d-flex user-wrap">
    <a-menu
      class="user-menu"
      v-model:selectedKeys="state.selectedKeys"
      :mode="state.mode"
      v-model:openKeys="state.openKeys"
      :theme="state.theme"
      @select="() => {
        router.push({ path: '/user/userinfo', query: { selectedKeys: state.selectedKeys } })
      }"
    >
      <a-sub-menu key="sub1">
        <template #title><span class="title">账号管理</span></template>
        <a-menu-item-group>
          <template v-for="item in menus" :key="item.value">
            <a-menu-item v-if="item.type == 'userMenu'" :key="item.value">{{ item.label }}</a-menu-item>
          </template>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title><span class="title">订单管理</span></template>
        <a-menu-item-group>
          <template v-for="item in menus" :key="item.value">
            <a-menu-item v-if="item.type == 'orderMenu'" :key="item.value">{{ item.label }}</a-menu-item>
          </template>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub3">
        <template #title><span class="title">发票管理</span></template>
        <a-menu-item-group>
          <template v-for="item in menus" :key="item.value">
            <a-menu-item v-if="item.type == 'invoiceMenu'" :key="item.value">{{ item.label }}</a-menu-item>
          </template>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub4">
        <template #title><span class="title">预存管理</span></template>
        <a-menu-item-group>
          <template v-for="item in menus" :key="item.value">
            <a-menu-item v-if="item.type == 'storeMenu'" :key="item.value">{{ item.label }}</a-menu-item>
          </template>
        </a-menu-item-group>
      </a-sub-menu>
      <a-sub-menu key="sub5" v-if="state.userIsPriviage">
        <template #title><span class="title">管理员菜单</span></template>
        <a-menu-item-group>
          <template v-for="item in menus" :key="item.value">
            <a-menu-item v-if="item.type == 'superManage'" :key="item.value">{{ item.label }}</a-menu-item>
          </template>
        </a-menu-item-group>
      </a-sub-menu>
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
        <ManageSupplier v-if="state.selectedKeys.includes('12')" />
        <ManageOrder v-if="state.selectedKeys.includes('13')" />
        <ManageUser v-if="state.selectedKeys.includes('14')" />
        <ManageSQL v-if="state.selectedKeys.includes('18')" />
        <ManageList v-if="state.selectedKeys.includes('16')" />
        <ManageSum v-if="state.selectedKeys.includes('17')" />
        <BuffetBuild v-if="state.selectedKeys.includes('15')" />
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
  .title{
    font-size: 16px;
  }
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