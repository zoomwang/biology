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
const id = ref('');
const diffVisible = ref(false);
const orderDetail = ref({});
const visible = ref(false);
const showModal = async (orderId) => {
  getOrderInfos(orderId, "detail");
};
const handleOk = (e) => {
  console.log(e);
  visible.value = false;
};
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    status: "",
    itemname: ""
  }
});

const columns = [
  {
    title: "项目名称",
    dataIndex: "itemname",
    key: "itemname",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    slots: {
      customRender: "status",
    },
  },
  {
    title: "创建时间",
    dataIndex: "createime",
    key: "createime",
    slots: {
      customRender: "createime",
    },
  },
  {
    title: "供应商数量",
    dataIndex: "supplierNumber",
    key: "supplierNumber",
    slots: {
      customRender: "supplierNumber",
    },
  },
  {
    title: "订单数量",
    dataIndex: "orderNumber",
    key: "orderNumber",
    slots: {
      customRender: "orderNumber",
    },
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

const getOrderInfos = (params, type) => {
  if (type == "detail") {
    visible.value = true;
    id.value = params;
  } else {
    drawerVisible.value = true;
  }
};

const getSupplierItemList = async () => {
  try {
    const res = await supplierItemList(param);
    res?.data?.list.forEach((item) => {
      item.createime = formatTime(item.createime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getSupplierItemList();
});

const menus = ["已上架", "已下架"];
</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="项目名称" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.itemname" placeholder="测试项目" style="width:140px" />
      </a-form-item>
      <a-form-item label="订单状态" :wrapperCol="{
        span: 7
      }">
        <a-select v-model:value="param.param.status" style="width: 100px">
          <a-select-option value="-1">全部订单</a-select-option>
          <a-select-option v-for="(item, index) in menus" :key="item" :value="++index">{{ item }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getSupplierItemList();
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
          {{ menus[text] }}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="text" @click="showModal(record.id)"
          >更多详情</a-button
        >
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <Detail v-if="visible" :id="id" />
  </a-modal>
</template>
<style lang="scss"></style>
