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
        <a-space>
          <a-button style="display: block" @click="saveDraft">保存草稿</a-button>
          <a-button style="margin-left: 8px; margin-right: 30px; display: block" type="primary"
            @click="handleSubmit">提交</a-button>
        </a-space>
      </a-flex>
    </a-affix>
  </main>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Machine from "@/components/Machine.vue";
import { getOrderCostCalc, addOrder, draftSave, getOrderDraftInfo } from "@/services/process";
import { message, notification } from "ant-design-vue";
import { useRequest } from "vue-request";
import { fetchConfig } from "@/services/buffet-build";
import ReserveForm from "../modules/Buffet-Form/index.vue";
import {genUid} from '@/utils/index'
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
    getOrderDraftInfo(orderTypeId)
    .then(res => res.data)
    // .then(res => res.data || {
    //   templateType: 2,

    //   dynamicFormInfo: {
    //     sampleQuestions: [
    //       {
    //         id: 0,
    //         sampleNumber: 2,
    //         sampleIds: [],
    //         lywq6mqze2lkeyg0cjg: "3333444",
    //         lz48nozbxt5uc3cp8vl: "lz48nozbsq3vufzijts",
    //         lywrerwug3g2a8kox88: "lywrerwvfa29mp1ny6e",
    //         lywqmp4elu69q6yc8yf: "lywqnahozwkfvo12rph",
    //       },
    //     ],
    //     globalQuestions: {

    //     }
    //   },

    //   needSameDevice: 1,
    //   sameDeviceRelateOrderId: '',

    //   contactName: 'xx',
    //   contactsPhone: '11',

    //   needRecovery: 0,
    //   recoveryAddress: [],

    //   freightMode: 0,
    //   officeId: 1,
    //   needRecovery: 0,

    //   remark: 'xxx',

    //   ...{ "id": "1790", "templateType": 2, "dynamicFormInfo": { "sampleQuestions": [{ "id": "lzfqu1u4ctgprd4g60u", "sampleNumber": 2, "sampleIds": ["1", "2"], "lywq6mqze2lkeyg0cjg": "3333444", "lz48nozbxt5uc3cp8vl": "lz48nozbsq3vufzijts", "lywrerwug3g2a8kox88": "lywrerwvfa29mp1ny6e", "lywqmp4elu69q6yc8yf": "lywqnahozwkfvo12rph", "lywqb5blp2y7ba4a9e8": "lywqb5bllvyovnqjeek", "lywqj4nnmmy0wzs95jc": "lywql0rgtagzyeywrra", "lywqsfoajbhxhoj652q": ["lywqsfoa7x2moos8xfv"], "lywr5ie5parhu503no": ["lywr5ie5n7m9w9cmf4"], "lywr6wwpg6t5eu8w0ss": ["lywr6wwq27jpz7mklqv"], "lz48no3rg0lns1b9oiw": "我是默认值", "lz48npvqrbznix0i5qo": "<p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">样品要求：</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">1、无挥发性，固体、块体长宽最好小于20mm，高度小于4mm。</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">2、样品要求导电性良好，如果导电性比较差的话需要进行喷金或喷碳处理。</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">3、透射样品制备只保证切出的样品厚度可以拍透射。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(189, 107, 34);\"><strong>4、fib+TEM、剖面分析，可选择按时间云视频拍摄，实时观看。（推荐）</strong></span></p><p style=\"text-align: start;\"><span style=\"color: rgb(189, 107, 34);\"><strong>5、</strong></span><span style=\"color: red; font-family: 微软雅黑;\">特别提醒：定位会采用视频或者发照片的形式让您确定，一但确定好，后续切样发现内部结构不符合预期（比如样品内部有洞，膜层分离等情况）不再进一步制样了，此位置也需要按5折收费，定位请慎重选择。</span></p>", "lywq5wo6duklk8awnu9": "2", "lywq65r5i424wiufhug": "2", "lywqdkn2r75zpsiooeo": "lywqgboygj4gitp7pf", "lywqo5zl1swn26ecfoc": "lywqovkqldq9oky0fs", "lywqr1uub37rm5ji76": "lywqr1uuctwo9bo5kw", "lywqxp20evskr5usnut": "lywr0cgmd4wddtftfip" }], "globalQuestions": { "lzdwypkjt4y6zdgitzd": ["lzdwypkjvl0l4n91oni", "lzdx04y8o94kshl7zv"], "lzdy2ywwnsth0qgacon": "顶顶顶", "lzdwz52roml1uh46b1i": "lzdx12e0pdmrzse0x68" } }, "needSameDevice": 1, "sameDeviceRelateOrderId": "2408040012", "contactName": "xx", "contactsPhone": "11", "needRecovery": 1, "recoveryAddress": [{ "id": 0, "receiver": "dsf", "phone": "sdf", "address": ["110000", "110100", "110101"], "detailAddress": "dsf", "fullAddress": "北京市市辖区东城区dsf", "initAddress": "北京市市辖区东城区", "isdefault": 0 }, { "id": 0, "receiver": "gfh", "phone": "fgh", "address": ["130000", "130100", "130104"], "detailAddress": "xcv", "fullAddress": "河北省石家庄市桥西区xcv", "initAddress": "河北省石家庄市桥西区", "isdefault": 1 }], "freightMode": 0, "officeId": 1, "remark": "xxx" },

    // }),
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
  formData.value = {...defaultForm, ...(data || {})}
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
watch(() => formData.value, (data) => runFetchCost(data), {
  deep: true,
})

const saveDraft = async () => {
  try {
    const data = await formRef.value.validate()
    const res = await draftSave(data);
    if (res.code == 0) {
      notification.success({
        description: "保存草稿成功",
      });
    }
  } catch (err) {
    console.log('saveDraft', err)
  }
  // 接口请求之后保存数据
}

const handleSubmit = async () => {
  const form = await formRef.value.validate()
  console.log('handleSubmit', form)
  const params = {
    id: orderTypeId,
    ...form,
  }
  const res = await addOrder(params);
  if (res?.code == 0) {
    // debugger
    notification.success({
      description: "提交订单成功",
    });
    setTimeout(() => {
      router.push({ path: `/user/userinfo`, query: { selectedKeys: 10 } });
    }, 400);
  }
}

onMounted(async () => {
  try {
    if(!orderTypeId) throw new Error('该项目不存在')
    await runFetchProject()
    if(!projectConfig.value.isListing) {
      throw new Error('该项目未上架')
    }
  } catch (error) {
    if(error) {
      message.warn(error.message)
      setTimeout(() => {
        router.back()
      }, 1200);
    }
  }
  
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