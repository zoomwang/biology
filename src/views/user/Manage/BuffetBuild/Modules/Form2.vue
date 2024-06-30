<template>
  <a-form
    ref="formRef"
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    layout="vertical"
  >
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
      <div class="flex flex-col">
        <a-checkbox v-model:checked="formState.needRecovery"
          >是否需要回收</a-checkbox
        >
        <div v-if="formState.needRecovery" style="margin-top: 8px">
          <a-form-item
            label="回收费"
            class="inner-form-item"
            :wrapperCol="{ span: 8 }"
          >
            <a-input
              v-model:value="formState.recoveryCost"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item
            label="回收提示"
            class="inner-form-item"
            :wrapperCol="{ span: 8 }"
          >
            <a-textarea
              v-model:value="formState.recoveryTip"
              placeholder="请输入"
            />
          </a-form-item>
        </div>
        <a-checkbox v-model:checked="formState.hasContacts">
          实验有问题联系谁
        </a-checkbox>
        <div style="margin-top: 8px" v-if="formState.hasContacts">
          <a-form-item
            label="联系电话"
            class="inner-form-item"
            :wrapperCol="{ span: 8 }"
          >
            <a-input v-model:value="formState.contacts" placeholder="请输入" />
          </a-form-item>
        </div>
        <a-checkbox v-model:checked="formState.needSameDevice">
          是否需要同设备
        </a-checkbox>
      </div>
    </a-form-item>
    <a-form-item label="取件方式">
      <div class="flex flex-col">
        <a-checkbox v-model:checked="formState.samplingMethod">
          自行寄样/上门取件/自己送样
        </a-checkbox>
        <a-checkbox v-model:checked="formState.needLowTemperature">
          询问护送方式：您的样式是否需要低温寄送
        </a-checkbox>
      </div>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { ref, reactive, toRaw, watch } from "vue";
import { PRICE_MODE_TYPES } from "@/utils/const";

const props = defineProps({ model: Object });

const labelCol = { style: { width: "150px" } };
const wrapperCol = {};
const priceModeOptions = PRICE_MODE_TYPES.toObjectArray();

const formRef = ref();
const formState = reactive({
  priceMode: undefined,
  needRecovery: undefined,
  recoveryCost: undefined,
  recoveryTip: undefined,
  hasContacts: false,
  contacts: undefined,
  needSameDevice: false,
  samplingMethod: 0,
  needLowTemperature: false,
});

watch(
  () => props.model?.extInfo,
  model => {
    setFormValue(model || {});
  },
  { immediate: true }
);

function setFormValue(model) {
  Object.assign(formState, model, {hasContacts: !!model.contacts});
}
function getFormValue() {
  return { extInfo: {...toRaw(formState), samplingMethod: Number(formState.samplingMethod)} };
}

async function validate() {
  await formRef.value.validate();
  return getFormValue();
}

defineExpose({
  getFormValue,
  validate,
});
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
    .ant-form-item-label {
      padding-top: 4px;
      padding-bottom: 0;
      margin-right: 8px;
      width: 4em;
      min-width: 4em !important;
    }
  }
}
</style>
