<template>
  <div class="order-reserve-form-sample-questions-wrap">
    <div style="margin-bottom: 20px;">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel
          v-for="(form, idx) in formData"
          :key="form.id"
          :header="`第${idx + 1}组`"
        >
          <template #extra>
            <a-space>
              <!-- <DoubleRightOutlined title="上移" :rotate="-90" :disabled="idx === 0" @click.stop="handleQuestionMoveUp(idx)" /> -->
              <!-- <DoubleRightOutlined title="下移" :rotate="90" :disabled="idx === formState.questions.length - 1" @click.stop="handleQuestionMoveDown(idx)" /> -->
              <!-- <CopyOutlined title="复制" @click.stop="handleQuestionCopy(idx)" /> -->
              <a-popconfirm
                title="确认删除该组样品吗？"
                @confirm="handleItemRemove(idx)"
                @click.native.stop
              >
                <DeleteOutlined title="删除" />
              </a-popconfirm>
            </a-space>
          </template>
          <a-form :model="form" :labelCol="{ span: 5 }">
            <template v-if="extInfo.sampleNumberOption !== SAMPLE_QUALTITY_AFFECT_TYPES.NONE">
              <a-form-item
                label="样品数量"
                :rules="{
                  required: true,
                  message: '请输入',
                  trigger: 'change',
                }"
              >
                <a-input
                  type="number"
                  :min="1"
                  v-model:value.number="form.sampleNumber"
                  placeholder="请输入样品数量"
                  :max-length="25"
                  style="width: 120px"
                />
                <template #extra>
                  <p>1. 样品编号框建议跳过不填，系统默认以1,2,3…简单命名<span style="color: red;">（样品上请标注1,2,3…以便对应）</span>，复杂编号易出错！</p>
                  <p>2. 如您对样品编号有严格要求，请尽量简化，并在样品编号框内填写。</p>
                </template>
              </a-form-item>
              <a-form-item
                label="样品编号"
                :rules="{
                  message: '请输入',
                  trigger: 'change',
                }"
              >
                <a-input
                  v-for="(item, sampleNumberIdx) in form.sampleNumber"
                  :key="sampleNumberIdx"
                  placeholder="请输入"
                  style="width: 120px; margin-right: 10px; margin-bottom: 10px"
                  v-model:value="form.sampleIds[sampleNumberIdx]"
                >
                  <template #prefix> {{ genSampleNumberIdx(formData[idx - 1], sampleNumberIdx) }}- </template>
                </a-input>
              </a-form-item>
            </template>
            <ClientForm ref="clientFormRef" :model="form" :config="sampleQuestions"></ClientForm>
          </a-form>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <a-affix :offset-bottom="20">
      <a-button @click="handleItemAdd"> 添加一组样品 </a-button>
    </a-affix>
  </div>
</template>

<script setup lang="jsx">
import { ref, defineProps, watch } from "vue";
import { message } from 'ant-design-vue';
import { SAMPLE_QUALTITY_AFFECT_TYPES } from "@/utils/const";

import {
  DeleteOutlined,
  DoubleRightOutlined,
  CopyOutlined,
} from "@ant-design/icons-vue";
import { genUid } from "@/utils";
import ClientForm from "@/components/DynamicQuestion/ClientForm/index.vue";

const clientFormRef = ref()
const props = defineProps({
  model: {
    type: Array,
    default: () => [],
  },
  sampleQuestions: {
    typeof: Array,
    default: () => [],
  },
  extInfo: {
    type: Object,
    default: () => ({}),
  }
});
const activeKey = ref([])
const formData = ref([]);
watch(
  () => props.model,
  val => {
    formData.value = val;
    activeKey.value = val[0]?.id ? [val[0].id] : [];
  },
  {
    immediate: true,
  }
);

const genSampleNumberIdx = (prevForm, idx) => {
  const prevSampleNumber = prevForm?.sampleNumber || 0;
  return prevSampleNumber + idx + 1;
}

const genItem = () => {
  return {
    id: genUid(),
    sampleNumber: 1,
    sampleIds: [],
  };
};
const addItem = (data = {}) => {
  const item = { ...genItem(), ...data };
  formData.value.push(item);
  activeKey.value = [item.id];
  return item;
};

const handleItemRemove = idx => {
  if(formData.value.length === 1) {
    message.info('至少要有一组样品')
    return 
  }
  const item = formData.value[idx];
  if (idx >= 0 && idx < formData.value.length) {
    formData.value.splice(idx, 1);
  }
  activeKey.value = activeKey.value.filter(key => key !== item.id);
};
const handleItemAdd = () => {
  addItem();
};

const getFormValue = () => {
  return formData.value.map((item, idx) => {
    const { sampleNumber, sampleIds } = item;
    const clientForm = clientFormRef.value[idx]?.getFormValue?.() || {}
    return {
      ...clientForm,
      sampleNumber,
      sampleIds,
    }
  }) 
}
const validate = () => {
  return getFormValue()
}
defineExpose({
  getFormValue,
  validate,
})
</script>
<style lang="less" scoped>
.order-reserve-form-sample-questions-wrap {
  position: relative;
}
</style>
