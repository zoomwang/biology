<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  assignOrder
} from "../../../../services/manage";
import {formatTime} from "@/utils/index";

const props = defineProps(['id']);
const param = reactive({
  orderId: props.id,
  dispatchContactPerson: "",
  sampleNum: "",
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
];

const wrapperCol = {
  span: 24,
};

const dataSource = ref([]);

const getSupplierList = async () => {
  try {
    const res = await assignOrder(param);
    if (res?.code == 0) dataSource.value = res?.data;
  } catch (err) {}
};

onMounted(() => {
  getSupplierList();
});


</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="param" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <!-- <a-form-item label="订单号" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.orderId" style="width: 250px"></a-input>
      </a-form-item> -->
      <a-form-item label="对接人" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.dispatchContactPerson" style="width: 100px"></a-input>
      </a-form-item>
      <a-form-item label="样品数量" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.sampleNum" style="width: 100px"></a-input>
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getSupplierList();
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
      <template #orderType="{ text }">
        <span>
          {{ type[text] }}
        </span>
      </template>
    </a-table>
  </main>
</template>
<style lang="scss"></style>
