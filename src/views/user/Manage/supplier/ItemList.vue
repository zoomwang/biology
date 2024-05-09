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
  supplierItemDetailList
} from "../../../../services/supplier";
import { notification } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import DownLoad from "@/components/DownLoad.vue";
import Create from "./Create.vue"
import Detail from "./Detail.vue"

let orderData = reactive({
});
const orderDetail = ref({});
const props = defineProps(['id']);
const visible = ref(false);
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
    title: "项目名称",
    dataIndex: "itemname",
    key: "itemname",
  },
  {
    title: "说明文件",
    dataIndex: "document",
    key: "document",
  },
  {
    title: "上传说明文件",
    dataIndex: "uploadDocument",
    key: "uploadDocument",
  },
  {
    title: "设备类型",
    dataIndex: "deviceType",
    key: "deviceType",
  },
  {
    title: "成本价",
    dataIndex: "costrice",
    key: "costrice",
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
  },
  {
    title: "订单数",
    dataIndex: "orderNum",
    key: "orderNum",
  },
  {
    title: "正在做的样品数/截止周容量",
    dataIndex: "doingAndMaxWeekCapacityRatio",
    key: "doingAndMaxWeekCapacityRatio",
  },
  {
    title: "已分派的样品数",
    dataIndex: "assignedSampleNum",
    key: "assignedSampleNum",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
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

const dataSource = ref([]);
const getSupplierItemDetailList = async () => {
  try {
    const res = await supplierItemDetailList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getSupplierItemDetailList();
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
    </a-table>
  </main>
</template>
<style lang="scss"></style>
