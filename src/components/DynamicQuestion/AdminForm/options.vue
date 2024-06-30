<template>
  <a-form
    ref="formRef"
    name="dynamic_form_nest_item"
    :model="dynamicValidateForm"
    @finish="onFinish"
  >
    <a-space
      v-for="(option, index) in dynamicValidateForm.options"
      :key="option.id"
      style="display: flex"
      align="center"
      :size="8"
    >
      <a-form-item
        :name="['options', index, 'label']"
        :rules="{
          required: true,
          message: '必填项',
        }"
      >
        <a-input v-model:value="option.label" placeholder="选项名称" />
      </a-form-item>
      <a-form-item :name="['options', index, 'price']" v-if="showKeyMap.price">
        <a-input-number
          :min="0"
          v-model:value="option.price"
          placeholder="价格"
        />
      </a-form-item>
      <a-space :size="12">
        <a-form-item
          v-if="showKeyMap.checked"
          :name="['options', index, 'checked']"
          :colon="false"
          :label-col="labelAutoWidthCol"
          label="默认选中"
        >
          <a-checkbox v-model:checked="option.checked" />
        </a-form-item>
        <a-form-item
          v-if="showKeyMap.required"
          :name="['options', index, 'required']"
          :colon="false"
          :label-col="labelAutoWidthCol"
          label="是否必填"
        >
          <a-checkbox v-model:checked="option.required" />
        </a-form-item>
        <a-form-item
          v-if="showKeyMap.isPriceMode"
          :name="['options', index, 'isPriceMode']"
          :colon="false"
          :label-col="labelAutoWidthCol"
          label="报价模式"
        >
          <a-checkbox v-model:checked="option.isPriceMode" />
        </a-form-item>
      </a-space>
      <a-form-item style="margin-left: 8px">
        <a-space>
          <PlusCircleOutlined @click="addOption(index + 1)" />
          <MinusCircleOutlined @click="removeOption(index)" />
          <DoubleRightOutlined
            :rotate="-90"
            :disabled="index === 0"
            @click="moveUp(index)"
          />
          <DoubleRightOutlined
            :rotate="90"
            :disabled="index === dynamicValidateForm.options.length - 1"
            @click="moveDown(index)"
          />
        </a-space>
      </a-form-item>
    </a-space>
  </a-form>
</template>
<script lang="ts" setup>
import { PropType, computed, reactive,watch, ref } from "vue";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons-vue";
import type { FormInstance } from "ant-design-vue";
import { genOption, Option  } from "../utils";

const options = defineModel<Option[]>("options", { required: true });

const props = defineProps({
  showKeys: {
    type: [Array, String] as PropType<string[] | string>, // 接受数组或字符串类型
    default: () => [], // 默认值为空数组
  },
});

const shouldShowKey = (key: string) => {
  const showKeys = Array.isArray(props.showKeys)
    ? props.showKeys
    : props.showKeys.split(",");
  return showKeys.includes(key);
};
const showKeyMap = computed(() => {
  return {
    price: shouldShowKey("price"),
    required: shouldShowKey("required"),
    checked: shouldShowKey("checked"),
    isPriceMode: shouldShowKey("isPriceMode"),
  };
});

const labelAutoWidthCol = {
  style: { width: "auto", minWidth: "auto !important" },
};


const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{ options: Option[] }>({
  options: [],
});

watch(() => options.value, (options: Option[]) => {
  dynamicValidateForm.options = options
},{immediate: true})

const removeOption = (idx: number) => {
  dynamicValidateForm.options.splice(idx, 1);
};
const addOption = (idx: number) => {
  dynamicValidateForm.options.splice(idx, 0, genOption());
};
const moveUp = (idx: number) => {
  const items = dynamicValidateForm.options;
  // 确保索引在有效范围内
  if (idx > 0 && idx < items.length) {
    // 交换当前元素和上一个元素
    let temp = items[idx];
    items[idx] = items[idx - 1];
    items[idx - 1] = temp;
  }
};
const moveDown = (idx: number) => {
  const items = dynamicValidateForm.options;
  // 确保索引在有效范围内，且不是最后一个元素
  if (idx >= 0 && idx < items.length - 1) {
    // 交换当前元素和下一个元素
    let temp = items[idx];
    items[idx] = items[idx + 1];
    items[idx + 1] = temp;
  }
};
const onFinish = (values: any) => {
  console.log("Received values of form:", values);
  console.log("dynamicValidateForm.users:", dynamicValidateForm.options);
};
</script>
