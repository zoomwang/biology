<template>
  <div>
    <a-form :model="formData">
      <a-form-item label="同台设备">
        <a-radio-group v-model:value="formData.needSameDevice" button-style="solid">
          <a-radio-button :value="0">
            不需要
            <a-popover placement="topLeft">
              <template #content>
                <p>
                  如果您需要和历史订单使用相同的设备测试，请选择“需要”并指定之前的订单号。
                </p>
              </template>
              <template #title>
                <span>提醒</span>
              </template>
              <QuestionCircleTwoTone />
            </a-popover>
          </a-radio-button>
          <a-radio-button :value="1">需要</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="选择订单" v-if="formData.needSameDevice">
        <a-select ref="select" :showSearch="true" optionFilterProp="label" allowClear v-model:value="formData.sameDeviceRelateOrderId"
          :options="orderOptions">
        </a-select>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, watch } from "vue";
import {
  QuestionCircleTwoTone,
} from "@ant-design/icons-vue";
import { getOrderList } from "@/services/process";

const props = defineProps({
  type: {
    type: Number
  },
  model: {
    type: Object,
    default: () => ({}),
  }
})
const formData = ref({});
watch(() => props.model, (val) => {
  formData.value = val
}, {
  immediate: true
})

const orderOptions = ref([])
const getOrderLists = async () => {
  const res = await getOrderList(props.type);
  if (res?.code == 0) {
    res?.data?.list?.forEach((item) => {
      item.value = item.orderId;
      item.label = `项目名 :${item.itemname} 订单号: ${item.orderId}` + (item.remark ? ` 备注: ${item.remark}` : "");
    });
    orderOptions.value = res.data?.list || [];
  }
};

getOrderLists()

</script>