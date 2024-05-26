<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  computed,
  reactive,
  defineComponent,
  onMounted,
  watch,
} from "vue";
import {
  getStoreList
} from "../../../../services/manage";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import PrestoreAddjust from "./PrestoreAddjust.vue"


const props = defineProps(['id']);
const orderDetail = ref({});
const visible = ref(false);

const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    uid: props.id
  }
});

const columns = [
  {
    title: "来源",
    dataIndex: "fromDesc",
    key: "fromDesc",
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    slots: {
      customRender: "type",
    },
  },
  {
    title: "金额",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "变动时间",
    dataIndex: "updateTime",
    key: "updateTime",
  },
  // {
  //   title: "备注",
  //   dataIndex: "remind",
  //   key: "remind",
  // },
];

const labelCol = {
  style: {
    width: "120px",
  },
};
const diffPayData = ref({
  codeUrl: '',
  payPlatform: '',
  cost: ''
})
const wrapperCol = {
  span: 24,
};
const formState = reactive({
  startTime: "",
  endTime: "",
});

const dataSource = ref([]);

const getStoreLists = async () => {
  try {
    const res = await getStoreList(param);
    res?.data?.list.forEach((item) => {
      item.updateTime = formatTime(item.updateTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

const showModal = (item) => {
  visible.value = true;
  id.value = item;
}

onMounted(() => {
  getStoreLists();
});
// const payPlatform = ["","支付宝","微信","银联"];
const welfare = ["测试费", "专属科研卡(JD卡)", "科研基金（现金）"];
const payPlatform = ["预存单支付成功", "预存单退款", "用户用余额支付订单消耗", "用户取消订单，退款到余额", "用户使用余额补差价", "用户退差价到余额", "被邀请人三个月内订单完成，返利", "用户使用积分兑换测试费，余额入账", "管理员调整"];

</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-button type="primary" @click="showModal" style="margin-bottom: 10px">预存金调整</a-button>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <template #payPlatform="{ text }">
        <span>
          {{ payPlatform[text] }}
        </span>
      </template>
      <template #welfare="{ text }">
        <span>
          {{ welfare[text] }}
        </span>
      </template>
    </a-table>
  </main>
  <a-modal v-model:visible="visible" width="200px" title="预存金调整" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <PrestoreAddjust :successCallBack="() => {
      getStoreLists(); 
      visible = false;
    }" v-if="visible" :id="id" />
  </a-modal>
</template>
<style lang="scss"></style>
