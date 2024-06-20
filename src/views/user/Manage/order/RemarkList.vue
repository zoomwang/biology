<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getRemarkList
} from "../../../../services/manage";
import {formatTime} from "@/utils/index";

const props = defineProps(['id']);

const param = reactive({
  orderId: props.id
});

const columns = [
  {
    title: "备注",
    dataIndex: "remark",
    key: "deviceType",
  },
  {
    title: "时间",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "沟通人",
    dataIndex: "contactPerson",
    key: "contactPerson",
  },
];


const dataSource = ref([]);


const getRemarkLists = async () => {
  try {
    const res = await getRemarkList(param);
    res?.data?.forEach((item) => {
      item.date = formatTime(item.date);
    })
    if (res?.code == 0) dataSource.value = res?.data;
  } catch (err) {}
};

onMounted(() => {
  getRemarkLists();
});

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
      <template #actions="{ record }">
        <a-button type="link" @click="showDetailModal(record)"
          >{{ record.supplierName }}</a-button
        >
      </template>
    </a-table>
  </main>
</template>
<style lang="scss"></style>
