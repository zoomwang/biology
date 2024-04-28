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
  cancelOrder,
  getOrderInfo,
  getReturnPriceDiff,
  getPayPriceDiff,
} from "../../../../services/process";
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
  status: "0",
  startTime: "",
  endTime: "",
});

const orderColums = [
  {
    title: "样品数量",
    dataIndex: "count",
    key: "count",
  },
  {
    title: "实验目的",
    dataIndex: "goal",
    key: "age",
  },
  {
    title: "样品编号",
    dataIndex: "numberList",
    key: "address",
    slots: {
      customRender: "numberList",
    },
  },
];

const columns = [
  {
    title: "项目名称",
    dataIndex: "itemname",
  },
  {
    title: "下单时间",
    className: "column-money",
    dataIndex: "createTime",
  },
  {
    title: "订单号",
    dataIndex: "orderId",
  },
  {
    title: "实付款",
    dataIndex: "costInfo",
    slots: {
      customRender: "costInfo",
    },
  },
  {
    title: "订单状态",
    dataIndex: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "退补差价",
    dataIndex: "priceDifference",
  },
  {
    title: "操作",
    key: "action",
    slots: {
      customRender: "action",
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

const getPayPriceDiffs = async (params) => {
  try {
    const res = await getPayPriceDiff({
      orderId: params.orderId,
      payPlatform: params.payPlatform
    });
    if (res?.code == 0) {
      if (params.payPlatform > 0) {
        diffPayData.value = {
          codeUrl: res.data,
          payType: params.payPlatform,
          cost: params.priceDifference,
          orderId: params.orderId
        }
        diffVisible.value = true;
      } 
      if (params.payPlatform  == 0) {
        notification.success({
          description: "补差价成功",
        });
        getOrderList();
      }
    } else {}
  } catch (err) {}
};

const getReturnPriceDiffs = async (params) => {
  try {
    const res = await getReturnPriceDiff({
      orderId: params.orderId,
      payPlatform: params.payPlatform
    });
    if (res?.code == 0) {
      notification.success({
        description: "退差价成功",
      });
      getOrderList();
    }
  } catch (err) {}
};

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

const successCall = () => {
  getOrderList();
  drawerVisible.value = false;
  diffVisible.value = false;
}

const cancelOrders = async (orderId) => {
  try {
    const res = await cancelOrder({
      orderId,
    });
    if (res?.code == 0) {
      getOrderList();
      notification.success({
        description: "取消订单成功",
      });
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

const menus = ["待报价", "可支付", "待实验", "实验中", "已完成","欠款中","已开票","已还款", "已取消"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.name" placeholder="测试项目" style="width:140px" />
      </a-form-item>
      <a-form-item label="" :wrapperCol="{
        span: 5
      }">
        <a-select v-model:value="param.status" placeholder="全部分组" style="width:120px" />
      </a-form-item>
      <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.status" style="width: 100px">
          <a-select-option value="0">全部订单</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="++index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getOrderList();
        }">搜索</a-button>
      </a-form-item>
    </a-form>
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
      <template #costInfo="{ text }">
        <span>
          {{ text["支付金额"] }}
        </span>
      </template>
      <template #ticketStatus="{ text }">
        <span>
          {{ ["无需开票", "无", "待申请"][text] }}
        </span>
      </template>
      <template #action="{ record }">
        
        <br v-if="record.status <=2 || record.priceDifferenceStatus == 1" />
        <a-button type="text" @click="showModal(record.orderId)"
          >更多详情</a-button
        >
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Detail />
  </a-modal>
  <a-modal v-model:open="drawerVisible" title="新增供应商" :footer="null" ok-text="确认" cancel-text="取消" @ok="hideModal">
    <Create />
  </a-modal>
</template>
<style lang="scss"></style>
