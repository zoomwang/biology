<script setup>
import {
  ref,
  reactive,
  onMounted,
} from "vue";
import {
  getSql
} from "../../../../services/manage";
import { notification, message } from "ant-design-vue";
import {formatTime} from "@/utils/index";
import { DollarCircleOutlined, UploadOutlined } from "@ant-design/icons-vue";

const param = reactive({
  pageSize: 999,
  curPage: 1,
  param: {
    userName: "",
    realName: ""
  },
});

const columns =[
  {
    title: "用户账号",
    dataIndex: "userName",
    // key: "age",
  },
  {
    title: "用户名",
    dataIndex: "realName",
  },
  {
    title: "变更内容",
    dataIndex: "paramJson",
    // key: "device",
  },
  {
    title: "函数名",
    dataIndex: "methodName",
  },
  {
    title: "函数注解",
    dataIndex: "methodAnnotation",
  },
  {
    title: "执行时间",
    dataIndex: "createTime",
  },
];

const labelCol = {
  style: {
    width: "120px",
  },
};
const wrapperCol = {
  span: 18,
};

const dataSource = ref([]);

const getSqlList = async(data) => {
  try {
    const res = await getSql(param);
    if (res?.code == 0) {
      dataSource.value = res?.data.list;
    }
  } catch (err) {
    debugger
  }
}

onMounted(() => {
  getSqlList();
});

</script>

<template>
  <!-- 用户注册资料 -->
  <main>
    <a-form style="margin: 10px 10px 20px 0" :model="formState" layout="inline" :label-col="labelCol" :wrapper-col="wrapperCol">
      <!-- <a-form-item label="订单创建时间" :wrapperCol="{
        span: 7
      }">
        <a-date-picker v-model:value="param.startTime" style="width:140px" />
      </a-form-item>
      <a-form-item label="订单结束时间" :wrapperCol="{
        span: 5
      }">
        <a-date-picker v-model:value="param.endTime" style="width:120px" />
      </a-form-item> -->
      <a-form-item label="用户账号" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.userName" placeholder="请输入用户账号" style="width:140px" />
      </a-form-item>
      <a-form-item label="用户名" :wrapperCol="{
        span: 7
      }">
        <a-input v-model:value="param.param.realName" placeholder="请输入用户名" style="width:140px" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 8, span: 7 }">
        <a-button type="primary" @click="() => {
          getSqlList();
        }">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table
      :columns="columns"
      :data-source="dataSource"
      :pagination="{ pageSize: 5 }"
      bordered
    >
    </a-table>
  </main>
</template>
<style lang="scss">
.upload-wrap,.remark-wrap{
  .ant-modal-body{
    overflow: hidden;
  }
}
</style>
