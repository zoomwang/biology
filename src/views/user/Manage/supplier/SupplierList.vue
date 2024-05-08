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
  supplierList
} from "../../../../services/supplier";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import ItemList from "./ItemList.vue"

let orderData = reactive({
});
const props = defineProps(['id']);
const diffVisible = ref(false);
const orderDetail = ref({});
const visible = ref(false);
const isCreate = ref(true);
const createShow = ref(false);
const supplierDetail = ref(null);
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
    title: "工作单位",
    dataIndex: "company",
    key: "company",
  },
  {
    title: "设备型号",
    dataIndex: "deviceType",
    key: "deviceType",
  },
  {
    title: "仪器台数",
    dataIndex: "deviceNmu",
    key: "deviceNmu",
  },
  {
    title: "负责人",
    dataIndex: "head",
    key: "head",
  },
  {
    title: "参考价",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "截止周容量",
    dataIndex: "maxWeekSampleCapacity",
    key: "maxWeekSampleCapacity",
  },
  {
    title: "正在做样品数",
    dataIndex: "doingSampleNum",
    key: "doingSampleNum",
  },
  {
    title: "已分派样品数",
    dataIndex: "assignedSampleNum",
    key: "assignedSampleNum",
  },
  {
    title: "历史订单总数",
    dataIndex: "historyOrderNum",
    key: "historyOrderNum",
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
const wrapperCol = {
  span: 24,
};
const formState = reactive({
  startTime: "",
  endTime: "",
});

const dataSource = ref([]);

const getOrderInfos = async (params, type) => {
  visible.value = true;
};

const getSupplierList = async () => {
  try {
    const res = await supplierList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getSupplierList();
});

const menus = ["已上架", "已下架"];
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
          {{ menus[--text] }}
        </span>
      </template>
      <template #action="{ record }">
        <a-button type="text" @click="showModal(record.id)"
          >查看</a-button
        >
      </template>
    </a-table>
  </main>
  <a-modal class="modal-tab" v-model:visible="visible" width="80%" title="更多详情" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <ItemList :id="props.id" />
  </a-modal>
 
</template>
<style lang="scss"></style>
