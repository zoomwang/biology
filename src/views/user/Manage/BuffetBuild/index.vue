<template>
  <div>
    <div style="padding: 16px">
      <a-button @click="handleCreate">新建</a-button>
    </div>
    <a-table :columns="columns" :data-source="dataSource" :pagination="pagination" :loading="loading"
      @change="handleTableChange">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <a-space :gap="4">
            <a-button type="link" :href="`/user/buffet-build/create-and-update?typeId=${record.orderTypeId}`">
              编辑
            </a-button>
            <a-popconfirm v-if="!record.isListing" title="确定要上架吗?" @confirm="handleshelveOn(record)">
              <a-button type="link">上架</a-button>
            </a-popconfirm>
            <a-popconfirm v-if="record.isListing" title="确定要下架吗?" @confirm="handleshelveOff(record)">
              <a-button type="link">下架</a-button>
            </a-popconfirm>
            <a-popconfirm title="确定要删除吗?" @confirm="handleDelete(record)">
              <a-button type="link" danger >删除</a-button>
            </a-popconfirm>
          </a-space>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { usePagination } from "vue-request";
import { message } from "ant-design-vue";


import {
  fetchConfigList, deleteConfig,
  shelveOnConfig,
  shelveOffConfig,
} from "@/services/buffet-build";
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
  {
    title: "类别",
    dataIndex: "projectType",
    customRender: ({ record }) => {
      return `${record.projectTypeName}/${record.projectSubTypeName}`
    }
  },

  {
    title: "操作",
    key: "action",
  },
];

const total = ref(0);
const queryData = params => {
  return fetchConfigList(params).then(res => {
    const list = res.data.list
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
  refresh,
} = usePagination(queryData, {
  defaultParams: [
    {
      pageSize: 100,
    },
  ],
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

const handleDelete = async (row) => {
  console.log(row)
  await deleteConfig({ orderTypeId: row.orderTypeId })
  message.success('操作成功');
  refresh()
}

const handleshelveOn = async (row) => {
  console.log(row)
  await shelveOnConfig({ orderTypeId: row.orderTypeId })
  message.success('操作成功');
  refresh()
}

const handleshelveOff = async (row) => {
  console.log(row)
  await shelveOffConfig({ orderTypeId: row.orderTypeId })
  message.success('操作成功');
  refresh()
}



</script>
