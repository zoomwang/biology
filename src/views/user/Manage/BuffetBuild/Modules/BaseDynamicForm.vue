<template>
  <div style="margin-top: 6px;">
    <div style="margin-bottom: 12px">
      <p>1.点击问题类型可添加问题到右侧。</p>
      <p>2.单选问题或多选问题可以作为其他问题的前置条件。</p>
      <p>3.只有单选和多选才支持添加【其他】选择项。</p>
      <p>4.单行填空和区间填空可限制输入的格式，如:字符，数字，小数。</p>
      <p>5.点击羊按钮设置各区域的价格，没有设置的项目价格都是0。</p>
      <p>6.化学式请使用html标签编辑。如NH4*请写成NH<sub>4</sub><sup>+</sup>的形式</p>
    </div>
    <a-affix :offset-top="20">
      <a-space-compact block>
        <a-button v-for="item in questionTypeOptions" :key="item.value" @click="handleQuestionAdd(item.value)">
          {{ item.label }}
        </a-button>
      </a-space-compact>
    </a-affix>
    <a-form style="margin-top: 16px" ref="formRef" :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel :key="sampleNumberOptionKey" header="是否需要样品数量这个问题，这个问题是否会影响价格" v-if="showSampleQualtiyAffect">
          <a-radio-group v-model:value="formState.sampleNumberOption" :options="sampleQualityAffectTypes" />
        </a-collapse-panel>
        <a-collapse-panel v-for="(item, idx) in formState.questions" :key="item.id" :header="`问题${idx + 1} - ${QUESTION_TYPES.get(item.type)}${item.label ? ' - ' + item.label : ''
          }`">
          <template #extra>
            <a-space>
              <DoubleRightOutlined :rotate="-90" :disabled="idx === 0" @click.stop="handleQuestionMoveUp(idx)" />
              <DoubleRightOutlined :rotate="90" :disabled="idx === formState.questions.length - 1"
                @click.stop="handleQuestionMoveDown(idx)" />
              <DeleteOutlined @click.stop="handleQuestionRemove(idx)" />
            </a-space>
          </template>
          <div style="margin-left: -16px">
            <a-skeleton :loading="item.loading">
              <DynamicQuestionForm v-if="!item.loading" :model="item" :rel-options="relOptions" :type="item.type"></DynamicQuestionForm>
            </a-skeleton>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </a-form>
  </div>
</template>
<script setup>
import { ref, reactive, toRaw, watch, computed, nextTick } from "vue";
import { QUESTION_TYPES, SAMPLE_QUALTITY_AFFECT_TYPES } from "@/utils/const";
import DynamicQuestionForm from "@/components/DynamicQuestion/AdminForm/index.vue";
import { genQuestionItem } from "@/components/DynamicQuestion/utils";
import {
  DeleteOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons-vue";

const props = defineProps({
  questions: Array,
  sampleNumberOption: Number,
  showSampleQualtiyAffect: Boolean
});

const activeKey = ref([]);

const sampleNumberOptionKey = '0'
const labelCol = { style: { width: "150px" } };
const wrapperCol = {};
const questionTypeOptions = QUESTION_TYPES.toObjectArray();
const sampleQualityAffectTypes = SAMPLE_QUALTITY_AFFECT_TYPES.toObjectArray();

const formRef = ref();
const formState = reactive({
  questions: [],
  sampleNumberOption: undefined,
});

const relOptions = computed(() => {
  return (formState.questions || [])
    .filter(item =>
      [QUESTION_TYPES.RADIO, QUESTION_TYPES.CHECKBOX].includes(item.type)
    )
    .filter(item => item.label);
});

watch(
  () => [props.questions, props.sampleNumberOption],
  ([questions, sampleNumberOption]) => {
    setFormValue(questions || [], sampleNumberOption);
    const keys = (questions || []).map(item => item.id);
    keys.push(sampleNumberOptionKey)
    activeKey.value = keys
  },
  { immediate: true }
);

function setFormValue(questions, sampleNumberOption) {
  questions.forEach((item, idx) => {
    item.loading = idx < 2 ? false : true
  })
  formState.questions = (questions || [])
  formState.sampleNumberOption = sampleNumberOption;
  setTimeout(() => {
    formState.questions.forEach((item) => item.loading = false)
  }, 1500)
}
function getFormValue() {
  return toRaw(formState);
}

async function validate() {
  await formRef.value.validate();
  return getFormValue();
}

const handleQuestionAdd = type => {
  const questionItem = genQuestionItem(type);
  formState.questions.push(questionItem);
  activeKey.value.push(questionItem.id);
};
const handleQuestionRemove = index => {
  const questionItem = formState.questions[index];
  if (index >= 0 && index < formState.questions.length) {
    formState.questions.splice(index, 1);
  }
  activeKey.value = activeKey.value.filter(key => key !== questionItem.id);
};
const handleQuestionMoveUp = idx => {
  const items = formState.questions;
  // 确保索引在有效范围内
  if (idx > 0 && idx < items.length) {
    // 交换当前元素和上一个元素
    let temp = items[idx];
    items[idx] = items[idx - 1];
    items[idx - 1] = temp;
  }
};
const handleQuestionMoveDown = idx => {
  const items = formState.questions;
  // 确保索引在有效范围内，且不是最后一个元素
  if (idx >= 0 && idx < items.length - 1) {
    // 交换当前元素和下一个元素
    let temp = items[idx];
    items[idx] = items[idx + 1];
    items[idx + 1] = temp;
  }
};

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
  &::deep {
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
