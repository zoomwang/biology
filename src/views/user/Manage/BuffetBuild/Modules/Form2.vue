<template>
  <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="vertical"
  >
    {{ formState }}
    <a-form-item label="价格模式">
      <a-radio-group v-model:value="formState.priceMode" class="flex flex-col">
        <a-radio
          :value="item.value"
          v-for="item in priceModeOptions"
          :key="item.value"
          >{{ item.label }}{{ item.desc ? `（${item.desc}）` : "" }}
        </a-radio>
      </a-radio-group>
    </a-form-item>
    <a-form-item label="订单问题（可多选）">
      <a-checkbox-group
        v-model:value="formState.orderQuestion"
        class="flex flex-col"
      >
        <div v-for="item in orderQuestionOptions" :key="item.value">
          <a-checkbox :value="item.value">
            {{ item.label }}
          </a-checkbox>
          <div
            style="margin-top: 8px"
            v-if="
              item.value === ORDER_QUESTION_TYPES.HAS_NEED_RECYCLE &&
              formState.orderQuestion.includes(
                ORDER_QUESTION_TYPES.HAS_NEED_RECYCLE
              )
            "
          >
            <a-form-item label="回收费" class="inner-form-item" :wrapperCol="{span: 8}">
              <a-input v-model:value="formState.name" placeholder="请输入" />
            </a-form-item>
            <a-form-item label="回收提示" class="inner-form-item" :wrapperCol="{span: 8}">
              <a-textarea v-model:value="formState.desc" placeholder="请输入" />
            </a-form-item>
          </div>
          <div
            style="margin-top: 8px"
            v-if="
              item.value === ORDER_QUESTION_TYPES.HAS_QUESTION &&
              formState.orderQuestion.includes(
                ORDER_QUESTION_TYPES.HAS_QUESTION
              )
            "
          >
            <a-form-item label="联系电话" class="inner-form-item" :wrapperCol="{span: 8}">
              <a-input v-model:value="formState.phone" placeholder="请输入" />
            </a-form-item>
          </div>
        </div>
      </a-checkbox-group>
    </a-form-item>
    <a-form-item label="取件方式">
      <a-checkbox-group
        v-model:value="formState.type"
        class="flex flex-col"
        :options="pickupSampleOptions"
      >
      </a-checkbox-group>
    </a-form-item>
    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">Create</a-button>
      <a-button style="margin-left: 10px">Cancel</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive, toRaw } from "vue";
import {
  PRICE_MODE_TYPES,
  ORDER_QUESTION_TYPES,
  PICKUP_SAMPLE_TYPES,
} from "@/utils/const";

const priceModeOptions = PRICE_MODE_TYPES.toObjectArray();
const pickupSampleOptions = PICKUP_SAMPLE_TYPES.toObjectArray();
const orderQuestionOptions = ORDER_QUESTION_TYPES.toObjectArray();
console.log("pickupSampleOptions", pickupSampleOptions);

const formState = reactive({
  name: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
  orderQuestion: [],
});
const onSubmit = () => {
  console.log("submit!", toRaw(formState));
};
const labelCol = { style: { width: "150px" } };
const wrapperCol = {};
</script>

<style scoped lang="scss">
.flex {
  display: flex;
}
.flex-col {
  flex-direction: column;
}
.items-center {
  align-items: center;
}
.inner-form-item {
  &::v-deep {
    .ant-form-item-label  {
      padding-top: 4px;
      padding-bottom: 0;
      margin-right: 8px;
      width: 4em;
      min-width: 4em !important;
    }
  }
}
</style>
