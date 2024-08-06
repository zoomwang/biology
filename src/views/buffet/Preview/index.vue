<template>
  <!-- 用户注册资料 -->
  <main class="buffet-reserve-wrap">
    <a-flex>
      <div class="steps-content flex-1">
        <div style="margin-top: 16px">
          <a-skeleton :loading="loading">
            <div v-if="!loading">
              <component ref="formRef" :model="formData" :is="compId" :baseInfo="baseInfo" :detailInfo="detailInfo"
                :sampleQuestions="sampleQuestions" :globalQuestions="globalQuestions" :extInfo="extInfo">
              </component>
            </div>
          </a-skeleton>
        </div>
      </div>
      <div class="machine-wrap flex-shrink-1" style="width: 220px;">
        <a-skeleton :loading="loading">
          <Machine :pictureUrl="baseInfo.pictureUrl" :toDetail="`/buffet/${orderTypeId}/detail`"></Machine>
        </a-skeleton>
      </div>
    </a-flex>
    <a-affix :offset-bottom="18">
      <a-flex class="confirm-bottom-wrap" justify="space-between">
        <div class="cost">
          待报价：<a-button type="link">¥{{ cost['支付金额'] || 0 }}</a-button>
        </div>
      </a-flex>
    </a-affix>
  </main>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import Machine from "@/components/Machine.vue";
import { getOrderCostCalc, addOrder, draftSave, getOrderDraftInfo } from "@/services/process";
import { notification } from "ant-design-vue";
import { useRequest } from "vue-request";
import { fetchConfig } from "@/services/buffet-build";
import ReserveForm from "../modules/Buffet-Form/index.vue";
import { genUid } from '@/utils/index'
const formRef = ref()
const current = ref(0);
const router = useRouter();
const route = useRoute();
const { orderTypeId } = route.params;


const compId = computed(() => {
  return {
    0: ReserveForm,
    1: ReserveForm,
  }[current.value]
})

const fetchData = () => {
  return Promise.all([
    fetchConfig({ orderTypeId }).then(res => res.data),
  ])
    .then(([projectConfig, buffetData = {}] = []) => {
      buffetData.contactsPhone = projectConfig?.extInfo?.contacts || buffetData?.contactsPhone || ''
      buffetData.contactName = projectConfig?.extInfo?.contactName || buffetData.contactsPhone
      return {
        projectConfig,
        buffetData,
      }
    })
}

const { data, loading, runAsync: runFetchProject } = useRequest(
  () => fetchData(),
  {
    manual: true,
  }
);
const projectConfig = computed(() => data.value?.projectConfig)
const baseInfo = computed(() => projectConfig.value?.baseInfo || {});
const detailInfo = computed(() => projectConfig.value?.detailInfo || {});
const sampleQuestions = computed(() => projectConfig.value?.sampleQuestions || []);
const globalQuestions = computed(() => projectConfig.value?.globalQuestions || []);
const extInfo = computed(() => projectConfig.value?.extInfo || []);

const defaultForm = {
  id: orderTypeId,
  templateType: 2,

  dynamicFormInfo: {
    sampleQuestions: [{
      id: genUid(),
      sampleNumber: 1,
      sampleIds: [],
    }],
    globalQuestions: {}
  },

  needSameDevice: 1,
  sameDeviceRelateOrderId: '',

  needRecovery: 0,
  recoveryAddress: [],

  freightMode: 0,
  officeId: 1,
}
const formData = ref({
  ...defaultForm
})
watch(() => data.value?.buffetData, (data) => {
  formData.value = { ...defaultForm, ...(data || {}) }
})

const { data: costData, runAsync: runFetchCost } = useRequest(
  getOrderCostCalc,
  {
    manual: true,
    debounceInterval: 800,
  }
)
const cost = computed(() => {
  return costData.value?.data || {} //|| { "样品回收费": 50.0, "运费": 15.0, "订单金额": 0, "支付金额": Date.now() };
})
watch( () => formData.value,async () => {
  await nextTick()
  const form = formRef.value.getFormValue()
  runFetchCost(form)
}, {
  deep: true,
})

onMounted(async () => {
  await runFetchProject()
})
</script>



<style lang="less">
.buffet-reserve-wrap {
  position: relative;

  .flex {
    display: flex;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-shrink-1 {
    flex-shrink: 1;
  }

  position: relative;

  .machine-wrap {
    // position: absolute;
    margin-left: 16px;
  }

  .confirm-bottom-wrap {
    margin-top: 16px;
    margin-right: 236px;
    padding: 15px 0 15px 10px;
    background: #fff;
    box-shadow: 3px 3px 4px 3px rgba(0, 0, 0, 0.1);
  }
}
</style>