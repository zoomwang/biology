<template>
  <div class="order-reserve-form-wrap">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="notice" header="预约须知">
        <div v-dompurify-html="baseInfo.attention"></div>
      </a-collapse-panel>
      <a-collapse-panel key="globalQuestions" header="全局问题">
        <ClientForm :model="formData.dynamicFormInfo.globalQuestions" :config="globalQuestions"></ClientForm>
      </a-collapse-panel>
      <a-collapse-panel key="sampleQuestions" header="样品数据">
        <SampleQuestionsForm :model="formData.dynamicFormInfo.sampleQuestions" :sampleQuestions="sampleQuestions"></SampleQuestionsForm>
      </a-collapse-panel>
      <a-collapse-panel key="extInfo" header="支付信息">
        <SameDevice :model="formData" :config="extInfo"></SameDevice>
        <Recovery :model="formData" :config="extInfo"></Recovery>
        <ProblemContact :model="formData" :config="extInfo"></ProblemContact>
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
import { ref, reactive, toRaw } from "vue";
import ClientForm from "@/components/DynamicQuestion/ClientForm/index.vue";
import SampleQuestionsForm from "./SampleQuestionsForm.vue";
import SameDevice from "./SameDevice.vue";
import Recovery from "./Recovery.vue";
import ProblemContact from "./ProblemContact.vue";
import ExpressDelivery from "./ExpressDelivery.vue";
import { genUid } from "@/utils";
const props = defineProps({
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

const formData = reactive({
  templateType: 2,

  dynamicFormInfo: {
    sampleQuestions: [
      {
        id: genUid(),
        sampleNumber: 2,
        sampleIds: [],
        lywq6mqze2lkeyg0cjg: "3333444",
        lz48nozbxt5uc3cp8vl: "lz48nozbsq3vufzijts",
        lywrerwug3g2a8kox88: "lywrerwvfa29mp1ny6e",
        lywqmp4elu69q6yc8yf: "lywqnahozwkfvo12rph",
      },
    ],
    globalQuestions: {

    }
  },

  needSameDevice: 1,
  sameDeviceRelateOrderId: '',

  contactName: 'xx',
  contactsPhone: '11',
  
  needRecovery: 0,
  recoveryAddress: [],

  freightMode: 0,
  officeId: 1,
  needRecovery: 0,

  remark: 'xxx',

  ...{"id":"1790","templateType":2,"dynamicFormInfo":{"sampleQuestions":[{"id":"lzfqu1u4ctgprd4g60u","sampleNumber":2,"sampleIds":["1","2"],"lywq6mqze2lkeyg0cjg":"3333444","lz48nozbxt5uc3cp8vl":"lz48nozbsq3vufzijts","lywrerwug3g2a8kox88":"lywrerwvfa29mp1ny6e","lywqmp4elu69q6yc8yf":"lywqnahozwkfvo12rph","lywqb5blp2y7ba4a9e8":"lywqb5bllvyovnqjeek","lywqj4nnmmy0wzs95jc":"lywql0rgtagzyeywrra","lywqsfoajbhxhoj652q":["lywqsfoa7x2moos8xfv"],"lywr5ie5parhu503no":["lywr5ie5n7m9w9cmf4"],"lywr6wwpg6t5eu8w0ss":["lywr6wwq27jpz7mklqv"],"lz48no3rg0lns1b9oiw":"我是默认值","lz48npvqrbznix0i5qo":"<p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">样品要求：</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">1、无挥发性，固体、块体长宽最好小于20mm，高度小于4mm。</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">2、样品要求导电性良好，如果导电性比较差的话需要进行喷金或喷碳处理。</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">3、透射样品制备只保证切出的样品厚度可以拍透射。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(189, 107, 34);\"><strong>4、fib+TEM、剖面分析，可选择按时间云视频拍摄，实时观看。（推荐）</strong></span></p><p style=\"text-align: start;\"><span style=\"color: rgb(189, 107, 34);\"><strong>5、</strong></span><span style=\"color: red; font-family: 微软雅黑;\">特别提醒：定位会采用视频或者发照片的形式让您确定，一但确定好，后续切样发现内部结构不符合预期（比如样品内部有洞，膜层分离等情况）不再进一步制样了，此位置也需要按5折收费，定位请慎重选择。</span></p>","lywq5wo6duklk8awnu9":"2","lywq65r5i424wiufhug":"2","lywqdkn2r75zpsiooeo":"lywqgboygj4gitp7pf","lywqo5zl1swn26ecfoc":"lywqovkqldq9oky0fs","lywqr1uub37rm5ji76":"lywqr1uuctwo9bo5kw","lywqxp20evskr5usnut":"lywr0cgmd4wddtftfip"}],"globalQuestions":{"lzdwypkjt4y6zdgitzd":["lzdwypkjvl0l4n91oni","lzdx04y8o94kshl7zv"],"lzdy2ywwnsth0qgacon":"顶顶顶","lzdwz52roml1uh46b1i":"lzdx12e0pdmrzse0x68"}},"needSameDevice":1,"sameDeviceRelateOrderId":"2408040012","contactName":"xx","contactsPhone":"11","needRecovery":1,"recoveryAddress":[{"id":0 ,"receiver":"dsf","phone":"sdf","address":["110000","110100","110101"],"detailAddress":"dsf","fullAddress":"北京市市辖区东城区dsf","initAddress":"北京市市辖区东城区","isdefault":0},{"id":0,"receiver":"gfh","phone":"fgh","address":["130000","130100","130104"],"detailAddress":"xcv","fullAddress":"河北省石家庄市桥西区xcv","initAddress":"河北省石家庄市桥西区","isdefault":1}],"freightMode":0,"officeId":1,"remark":"xxx"},

});

const activeKey = ref(['notice', 'globalQuestions', 'sampleQuestions', 'extInfo', 'remark'])

const getFormValue = () => {
  return toRaw(formData);
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