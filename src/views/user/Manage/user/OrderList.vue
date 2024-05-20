<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getOrderList
} from "../../../../services/manage";
import {formatTime} from "@/utils/index";

const props = defineProps(['id']);
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    uid: props.id
  }
});

const columns = [
  {
    title: "订单编号",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "预约仪器",
    dataIndex: "itemname",
    key: "itemname",
  },
  {
    title: "支付金额",
    key: "payAmount",
    dataIndex: "payAmount"
    // slots: {
    //   customRender: "realOrderPrice",
    // },
  },
  {
    title: "支付方式",
    key: "types",
    slots: {
      customRender: "types",
    },
  },
  
  {
    title: "欠款金额",
    dataIndex: "debtAmount",
    key: "debtAmount",
  },
  {
    title: "欠款状态",
    dataIndex: "s",
    key: "s",
    slots: {
      customRender: "s",
    },
  },
  {
    title: "订单状态",
    dataIndex: "status",
    key: "status",
    slots: {
      customRender: "status",
    },
  },
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

const getOrderLists = async () => {
  try {
    const res = await getOrderList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderLists();
});

const payPlatform = ["","支付宝","微信","银联"];
const payMode = ["预存", "扫码", "信用"];
const status = ["","待报价", "可支付", "待实验", "实验中", "已完成", "欠款中","已开票", "已还款", "已取消"];
const priceDifferenceStatus = ["不欠款", "还款中", "已还款"]
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <template #types="{ text }">
        <span>
          {{ text.payMode == "1" ?  payPlatform[text.payPlatform] : payMode[text.payMode]}}
        </span>
      </template>
      <template #s="{ text }">
        <span>
          {{ s == '6' ? '已欠款' : '已还款'}}
        </span>
      </template>
      <template #status="{ text }">
        <span>
          {{ status[text]}}
        </span>
      </template>
    </a-table>
  </main>
</template>
<style lang="scss"></style>
