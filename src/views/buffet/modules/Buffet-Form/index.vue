<template>
  <div class="order-reserve-form-wrap">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="notice" header="预约须知">
        <div v-dompurify-html="baseInfo.attention"></div>
      </a-collapse-panel>
      <a-collapse-panel key="globalQuestions" header="全局问题">
        <ClientForm ref="globalQuestionsRef" :model="formData.dynamicFormInfo.globalQuestions" :config="globalQuestions"></ClientForm>
      </a-collapse-panel>
      <a-collapse-panel key="sampleQuestions" header="样品数据">
        <SampleQuestionsForm ref="sampleQuestionsRef" :model="formData.dynamicFormInfo.sampleQuestions" :sampleQuestions="sampleQuestions" :extInfo="extInfo"></SampleQuestionsForm>
      </a-collapse-panel>
      <a-collapse-panel key="extInfo" header="支付信息">
        <SameDevice v-if="extInfo.needSameDevice" :model="formData" :config="extInfo"></SameDevice>
        <Recovery v-if="extInfo.needRecovery" model="formData" :config="extInfo"></Recovery>
        <ProblemContact v-if="extInfo.contacts" :model="formData" :config="extInfo"></ProblemContact>
        <ExpressDelivery :model="formData" :config="extInfo"></ExpressDelivery>
      </a-collapse-panel>
      <a-collapse-panel key="remark" header="留言">
        <a-form-item label="实验留言">
          <a-textarea v-model:value="formData.remark" />
        </a-form-item>
      </a-collapse-panel>
    </a-collapse>

  </div>
</template>

<script setup lang="jsx">
import { ref, reactive, toRaw, watch } from "vue";
import ClientForm from "@/components/DynamicQuestion/ClientForm/index.vue";
import SampleQuestionsForm from "./SampleQuestionsForm.vue";
import SameDevice from "./SameDevice.vue";
import Recovery from "./Recovery.vue";
import ProblemContact from "./ProblemContact.vue";
import ExpressDelivery from "./ExpressDelivery.vue";
import { genUid } from "@/utils";
const globalQuestionsRef = ref()
const sampleQuestionsRef = ref()

const props = defineProps({
  model: {
    type: Object,
    default: () => ({}),
  },
  baseInfo: {
    typeof: Object,
    default: () => ({}),
  },
  detailInfo: {
    typeof: Object,
    default: () => ({}),
  },
  sampleQuestions: {
    typeof: Array,
    default: () => [],
  },
  globalQuestions: {
    typeof: Array,
    default: () => { },
  },
  extInfo: {
    typeof: Object,
    default: () => ({}),
  }
})

const formData = ref(props.model)
watch(()=> props.model, (model) => {
  formData.value = model
})

const activeKey = ref(['notice', 'globalQuestions', 'sampleQuestions', 'extInfo', 'remark'])

const getFormValue = () => {
  return {
    ...formData.value,
    dynamicFormInfo: {
      globalQuestions: globalQuestionsRef.value.getFormValue(),
      sampleQuestions: sampleQuestionsRef.value.getFormValue(),
    }
  };

}
const validate = async () => {
  return getFormValue()
}

defineExpose({
  validate,
  getFormValue,
})

</script>
<style lang="less"></style>