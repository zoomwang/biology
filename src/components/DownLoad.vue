<script setup>
import { ref, watch, reactive, onMounted, onUpdated, onUnmounted } from "vue";
import { jstopdf, formatTime } from "@/utils/index";

const props = defineProps(["props", "orderId", "type"]);
console.log(props)
const download = () => {
  jstopdf("download", `${props?.props.orderId}对账单`);
};
</script>

<template>
    <a-button :type="props.type ?  props.type : 'primary'" @click="download"
      >下载预约单</a-button
    >
    <div id="download" style="position: absolute; top: -9999px; width: 700px">
      <a-descriptions title="预约单" bordered :column="2">
        <a-descriptions-item label="项目名称">{{
          props?.props?.itemname
        }}</a-descriptions-item>
        <a-descriptions-item label="订单号">{{
          props?.props.orderId
        }}</a-descriptions-item>
        <a-descriptions-item label="是否需要回收">{{
          props?.props?.needRecovery ? "需要" : "不需要"
        }}</a-descriptions-item>
        <a-descriptions-item label="备注">{{
          props?.props?.remark
        }}</a-descriptions-item>
        <a-descriptions-item
          label="样品信息"
          v-for="item in props?.props?.sampleInfo"
          :key="item"
        >
          样品编号:{{ item.numberList.join(",") }}
          <br />
          样品数量:{{ item.count }}
          <br />
          {{ item.uploadFile ? "对接单:" + item.uploadFile : "" }}
        </a-descriptions-item>
      </a-descriptions>
    </div>
    <!-- <div id="download" style="position: absolute; top: -9999px;width:700px">
      <a-descriptions title="预约单" bordered :column="2">
        <a-descriptions-item label="订单号">{{props?.orderId}}</a-descriptions-item>
        <a-descriptions-item label="运费支付方式">{{['到付', '自付'][props?.orderInfo?.freightMode]}}</a-descriptions-item>
        <a-descriptions-item label="是否需要回收">{{props?.orderInfo?.needRecovery ? '需要': '不需要'}}</a-descriptions-item>
        <a-descriptions-item label="项目名称">{{props?.orderInfo?.itemname}}</a-descriptions-item>
        <a-descriptions-item label="联系人">{{props?.orderInfo?.contactName}}</a-descriptions-item>
        <a-descriptions-item label="联系号码">{{props?.orderInfo?.contactsPhone}}</a-descriptions-item>
        <a-descriptions-item label="实验留言">{{props?.orderInfo?.remark}}</a-descriptions-item>
        <a-descriptions-item label="总费用">
          <p>总金额：{{props?.orderInfo?.costInfo['支付金额']}}</p>
          <p>样品回收费：{{props?.orderInfo?.costInfo['样品回收费']}}</p>
          <p>订单金额：{{props?.orderInfo?.costInfo['订单金额']}}</p>
          <p>运费：{{props?.orderInfo?.costInfo['运费']}}</p>
        </a-descriptions-item>
        <a-descriptions-item label="全局问题" :span="2">
          是否有磁性元素:{{props?.orderInfo?.globalProblem?.hasMagnetism ? '有':'没有'}}
          <br />
          拍摄方式:{{props?.orderInfo?.globalProblem?.shootingMethod ? '现场':'云现场'}}
        </a-descriptions-item>
        <a-descriptions-item label="样品信息" v-for="item in props?.orderInfo?.sampleInfo" :key="item">
          样品数量:{{item.count}}
          <br />
          样品编号:{{item.numberList.join(',')}}
          <br />
          目的:{{item.goal}}
          <br />
          预约市场:{{item.hours}}
        </a-descriptions-item>
      </a-descriptions>
    </div> -->
</template>
<style lang="scss" scoped>
</style>
