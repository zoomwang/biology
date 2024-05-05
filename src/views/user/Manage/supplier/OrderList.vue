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
  getOrderLists,
} from "../../../../services/process";
import {
  supplierItemList
} from "../../../../services/supplier";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import DownLoad from "@/components/DownLoad.vue";
import Create from "./Create.vue"
import Detail from "./Detail.vue"

let orderData = reactive({
});
const drawerVisible = ref(false);
const diffVisible = ref(false);
const showDrawer = async (record) => {
  orderData = record;
  await getOrderInfos(record.orderId);
};
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
  id: ""
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
    const res = await getOrderLists(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    // console.log(res?.data?.list)
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderList();
});

const menus = ["已上架", "已下架"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <!-- <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="项目名称" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.name" placeholder="测试项目" style="width:140px" />
      </a-form-item>
      <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.status" style="width: 100px">
          <a-select-option value="-1">全部订单</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="++index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getOrderList();
        }">搜索</a-button>
      </a-form-item>
    </a-form> -->
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
      <template #status="{ text }">
        <span>
          {{ menus[--text] }}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="text" @click="showModal(record.orderId)"
          >更多详情</a-button
        >
      </template>
    </a-table>
  </main>
  <!-- <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Detail />
  </a-modal>
  <a-modal v-model:open="drawerVisible" title="新增供应商" :footer="null" ok-text="确认" cancel-text="取消" @ok="hideModal">
    <Create />
  </a-modal> -->
</template>
<style lang="scss"></style>
