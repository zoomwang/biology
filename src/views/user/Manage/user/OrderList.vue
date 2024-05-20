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
  getOrderList
} from "../../../../services/manage";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import Detail from "./Detail.vue"

let orderData = reactive({
});
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
  // {
  //   title: "操作",
  //   key: "action",
  //   slots: {
  //     customRender: "action",
  //   },
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
      <!-- <template #priceDifferenceStatus="{ text }">
        <span>
          {{ priceDifferenceStatus[text]}}
        </span>
      </template> -->
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
      <!-- <template #realOrderPrice="{ text }">
        <span>
          {{ text['costInfo']["支付金额"]}}
        </span>
      </template> -->
      <!-- <template #action="{ record }">
        <a-button type="text" @click="showModal(record.orderId)"
          >更多详情</a-button
        >
      </template> -->
    </a-table>
  </main>
</template>
<style lang="scss"></style>
