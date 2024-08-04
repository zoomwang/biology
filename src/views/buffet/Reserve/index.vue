<template>
  <!-- 用户注册资料 -->
  <main class="buffet-reserve-wrap">
    <a-flex>
      <div class="steps-content flex-1">
        <a-steps style="padding: 16px;" :current="current" v-if="0">
          <a-step>
            <template #title>第一步</template>
            <template #description>
              <span>请注意预约须知</span>
            </template>
          </a-step>
          <a-step title="第二步" description="支付信息" />
        </a-steps>
        <div style="margin-top: 16px">
          <component ref="formRef" :is="compId" :baseInfo="baseInfo" :detailInfo="detailInfo"
            :sampleQuestions="sampleQuestions" :globalQuestions="globalQuestions" :extInfo="extInfo">
          </component>
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
          待报价：<a-button type="link">¥{{ cost.value }}</a-button>
        </div>
        <a-space>
          <a-button style="display: block" @click="saveDraft">保存草稿</a-button>
          <a-button style="margin-left: 8px; margin-right: 30px; display: block" type="primary" @click="handleSubmit">提交</a-button>
        </a-space>
      </a-flex>
    </a-affix>
  </main>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Machine from "@/components/Machine.vue";
import { getOrderCostCalc, getOfficeInfo, addOrder, draftSave } from "@/services/process";
import { notification } from "ant-design-vue";
import { useRequest } from "vue-request";
import { fetchConfig } from "@/services/buffet-build";
import ReserveForm from "./components/ReserveForm.vue";
const formRef = ref()
const current = ref(0);
const router = useRouter();
const route = useRoute();
const { orderTypeId } = route.params;
const id = route.query.id;
const type = route.query.type;
console.log("route=", route);

const compId = computed(() => {
  return {
    0: ReserveForm,
    1: ReserveForm,
  }[current.value]
})

const { data, loading, runAsync } = useRequest(
  () => fetchConfig({ orderTypeId }).then((res) => res.data),
  {
    manual: true,
  }
);
const baseInfo = computed(() => data.value?.baseInfo || {});
const detailInfo = computed(() => data.value?.detailInfo || {});
const sampleQuestions = computed(() => data.value?.sampleQuestions || []);
const globalQuestions = computed(() => data.value?.globalQuestions || []);
const extInfo = computed(() => data.value?.extInfo || []);

const handleToDetail = () => {
  router.push({
    path: `/buffet/${orderTypeId}/detail`,
  })
}
const order = reactive({
  id: '',
});

const cost = reactive({
  value: '',
});

let orderData = reactive({});

const getOrderCostCalcs = async (data) => {
  try {
    const res = await getOrderCostCalc(data);
    cost.value = res?.data;
  } catch (err) { }
}
const next = async (data) => {
  orderData = data;
  const res = await addOrder(data);
  await getOrderCostCalcs(data);
  if (res?.code == 0) {
    order.id = res.data;
    // debugger
    notification.success({
      description: "提交订单成功",
    });
    setTimeout(() => {
      router.push({ path: `/user/userinfo`, query: { selectedKeys: 10 } });
    }, 400);
    // current.value++;
  } else {
    // order.id = '1212';
  }

};
const saveDraft = async (data) => {
  try {
    const res = await draftSave(data);
    if (res.code == 0) {
      notification.success({
        description: "保存草稿成功",
      });
    }
  } catch (err) { }
  // 接口请求之后保存数据
}

const saveData = async () => {
  const form = await formRef.value.validate()
};

const handleSubmit = async () => {
  const form = await formRef.value.validate()
  console.log('handleSubmit', form)
  const params = {
    id: orderTypeId,
    ...form,
  }
  const res = await addOrder(params);
  await getOrderCostCalcs(params);
  if (res?.code == 0) {
    order.id = res.data;
    // debugger
    notification.success({
      description: "提交订单成功",
    });
    setTimeout(() => {
      router.push({ path: `/user/userinfo`, query: { selectedKeys: 10 } });
    }, 400);
  }
}

onMounted(() => {
  runAsync()
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