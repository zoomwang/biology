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
    title: "支付类型",
    dataIndex: "payPlatform",
    key: "payPlatform",
    slots: {
      customRender: "payPlatform",
    },
  },
  {
    title: "预存福利",
    dataIndex: "welfare",
    key: "welfare",
    slots: {
      customRender: "welfare",
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
  {
    title: "备注",
    dataIndex: "remind",
    key: "remind",
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

const getStoreLists = async () => {
  try {
    const res = await getStoreList(param);
    res?.data?.list.forEach((item) => {
      item.updateTime = formatTime(item.updateTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getStoreLists();
});
const payPlatform = ["","支付宝","微信","银联"];
const welfare = ["测试费", "专属科研卡(JD卡)", "科研基金（现金）"];
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
</template>
<style lang="scss"></style>
