<script setup>
// import TheWelcome from '@/components/Wx.vue';
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getOrderPointsList
} from "../../../../services/manage";
import {formatTime} from "@/utils/index";
import PointAddjust from "./PointAddjust.vue"

const props = defineProps(['id']);
const visible = ref(false);
const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    uid: props.id
  }
});

const showModal = (item) => {
  visible.value = true;
  id.value = item;
}

const columns = [
  {
    title: "积分来源",
    dataIndex: "fromDesc",
    key: "fromDesc",
  },
  {
    title: "数量",
    dataIndex: "points",
    key: "points",
  },
  {
    title: "领用时间",
    dataIndex: "createTime",
    key: "createTime",
  },
  {
    title: "过期时间",
    dataIndex: "expireTime",
    key: "expireTime",
  },
  {
    title: "状态",
    dataIndex: "type",
    key: "type",
    slots: {
      customRender: "type",
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

const getOrderPointsLists = async () => {
  try {
    const res = await getOrderPointsList(param);
    res?.data?.list.forEach((item) => {
      item.createTime = formatTime(item.createTime);
      item.expireTime = formatTime(item.expireTime);
    })
    if (res?.code == 0) dataSource.value = res?.data?.list;
  } catch (err) {}
};

onMounted(() => {
  getOrderPointsLists();
});

const types = ["兑换jd卡", "兑换测试费", "订单完成积分入账", "管理员调整积分"];

</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-button type="primary" @click="showModal" style="margin-bottom: 10px">积分调整</a-button>
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
      <template #type="{ text }">
        <span>
          {{ types[text] }}
        </span>
      </template>
    </a-table>
  </main>
  <a-modal v-model:visible="visible" width="200px" title="积分调整" :footer="null" ok-text="确认" cancel-text="取消" @ok="() => {
    visible = false;
  }">
    <PointAddjust :successCallBack="() => {
      getOrderPointsLists(); 
      visible = true;
    }" v-if="visible" :id="id" />
  </a-modal>
</template>
<style lang="scss"></style>
