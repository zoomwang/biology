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
  supplierOrderList
} from "../../../../services/supplier";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import DownLoad from "@/components/DownLoad.vue";
import Create from "./Create.vue"
import Detail from "./Detail.vue"

let orderData = reactive({
});
const props = defineProps(['id']);
const orderDetail = ref({});
const visible = ref(false);
const showModal = async (orderId) => {
  await getOrderInfos(orderId, "detail");
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    id: props.id
  }
});

const columns = [
  {
    title: "供应商名称",
    dataIndex: "supplierName",
    key: "supplierName",
  },
  {
    title: "订单编号",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "预约仪器",
    dataIndex: "itemName",
    key: "itemName",
  },
  {
    title: "订单状态",
    dataIndex: "orderStatus",
    key: "orderStatus",
    slots: {
      customRender: "orderStatus",
    },
  },
  {
    title: "订单金额",
    dataIndex: "orderPrice",
    key: "orderPrice",
  },
  {
    title: "实付金额",
    dataIndex: "realOrderPrice",
    key: "realOrderPrice",
  },
  {
    title: "成本金额",
    dataIndex: "costPrice",
    key: "costPrice",
  },
  {
    title: "订单类型",
    dataIndex: "orderType",
    key: "orderType",
    slots: {
      customRender: "orderType",
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

const getOrderInfos = async (params, type) => {
  try {
    const res = await getOrderInfo(params);
    if (res?.code == 0) {
      orderDetail.value = res?.data;
      if (type == "detail") {
        visible.value = true;
      } else {
        drawerVisible.value = true;
      }
    }
  } catch (err) {}
};

const getOrderList = async () => {
  try {
    const res = await supplierOrderList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderList();
});

const menus = ["已上架", "已下架"];
const type = ["内部订单", "外部订单"];
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
      <template #status="{ text }">
        <span>
          {{ menus[text] }}
        </span>
      </template>
      <template #orderType="{ text }">
        <span>
          {{ type[text] }}
        </span>
      </template>
      <!-- <template #action="{ record }">
        <a-button type="text" @click="showModal(record.orderId)"
          >更多详情</a-button
        >
      </template> -->
    </a-table>
  </main>
</template>
<style lang="scss"></style>
