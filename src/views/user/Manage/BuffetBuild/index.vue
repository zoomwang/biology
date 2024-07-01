<template>
  <div>
    <div style="padding: 16px">
      <a-button @click="handleCreate">新建</a-button>
    </div>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a
            :href="`/user/buffet-build/create-and-update?typeId=${record.orderTypeId}`"
            >编辑</a
          >
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { usePagination } from "vue-request";
import { fetchConfigList } from "@/services/buffet-build";
const router = useRouter();

const columns = [
  {
    title: "设备名称",
    dataIndex: "deviceName",
  },
  {
    title: "设备别名",
    dataIndex: "deviceAliases",
  },
  {
    title: "设备型号",
    dataIndex: "deviceModel",
  },
  {
    title: "品牌",
    dataIndex: "brand",
  },
  // {
  //   title: "类别",
  //   dataIndex: "projectType",
  // },
  {
    title: "操作",
    key: "action",
  },
];

const total = ref(0);
const queryData = params => {
  return fetchConfigList(params).then(res => {
    const list = res.data.list
      .filter(
        item =>
          item.dynamicFormConfig?.orderTypeId &&
          item.dynamicFormConfig?.baseInfo
      )
      .map(item => {
        return {
          orderTypeId: item.id,
          ...item.dynamicFormConfig.baseInfo,
        };
      });
    console.log(list);
    total.value = list.length;
    return list;
  });
};

const {
  data: dataSource,
  run,
  loading,
  pageSize,
  current,
} = usePagination(queryData, {
  defaultParams: [
    {
      pageSize: 100,
    },
  ],
  // formatResult: res => {
  //   debugger
  //   return res.data.list;
  // },
  pagination: {
    currentKey: "curPage",
    pageSizeKey: "pageSize",
  },
});

const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange = (pag, filters) => {
  run({
    pageSize: pag.pageSize,
    curPage: pag?.current,
    ...filters,
  });
};

const handleCreate = () => {
  router.push("/user/buffet-build/create-and-update");
};
</script>
