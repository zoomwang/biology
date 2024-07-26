<template>
  <div>
    <FormProvider  :form="form" :label-col="5">
      <SchemaField :schema="schema1"> </SchemaField>
      <FormConsumer>
        <template #default="{ form }">
          <div style="white-space: pre">
            {{ JSON.stringify(form.values, null, 2) }}
          </div>
        </template>
      </FormConsumer>
    </FormProvider>
  </div>
</template>

<script setup>
import { Form, Input, FormItem, Select, Radio } from "ant-design-vue";
import { createForm, isVoidField, setValidateLanguage } from "@formily/core";
import {
  FormProvider,
  FormConsumer,
  createSchemaField,
  Field,
  connect,
  mapProps,
} from "@formily/vue";
import { computed } from "vue";
import { QUESTION_TYPES } from "@/utils/const"
setValidateLanguage("en");
const form = createForm();

const FormSelect = connect(Select, mapProps({ enum: "options" }));
const FormItem1 = connect(
  Form.Item,
  mapProps(
    {
      title: 'label',
      description: 'extra',
      required: true,
      validateStatus: true,
    },
    (props, field) => {
      console.log('formItem', props, field)
      return {
        ...props,
        help: field.selfErrors?.length ? field.selfErrors : undefined,
      }
    }
  )
)



const { SchemaField } = createSchemaField({
  components: {
    Input,
    Select,
    FormSelect,
    FormItem: FormItem1,
    Radio,
  },
});


const res = {
  "code": 0,
  "msg": "success",
  "data": {
    "orderTypeId": 1783,
    "baseInfo": {
      "projectType": 2,
      "projectSubType": 1502,
      "projectTypeName": "高端测试",
      "projectSubTypeName": "高端电镜类",
      "deviceName": "聚焦离子束扫描电镜（FIB-SEM）",
      "deviceAliases": "fib，双束，离子切割，tem",
      "deviceModel": "FEI Helios5,FEI Strata 400S",
      "brand": "FEI",
      "pictureUrl": "https://etest-oss.oss-cn-beijing.aliyuncs.com/20240722/fib图片_59002_4bbbfe7dd2ab176730bc3e9a91975408.jpg",
      "deviceSuperintendent": "henry",
      "attention": "<p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">样品要求：</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">1、无挥发性，固体、块体长宽最好小于20mm，高度小于4mm。</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">2、样品要求导电性良好，如果导电性比较差的话需要进行喷金或喷碳处理。</span></p><p style=\"text-align: start;\"><span style=\"font-size: 14px; font-family: 宋体;\">3、透射样品制备只保证切出的样品厚度可以拍透射。</span></p><p style=\"text-align: start;\"><span style=\"color: rgb(189, 107, 34);\"><strong>4、fib+TEM、剖面分析，可选择按时间云视频拍摄，实时观看。（推荐）</strong></span></p><p style=\"text-align: start;\"><span style=\"color: rgb(189, 107, 34);\"><strong>5、</strong></span><span style=\"color: red; font-family: 微软雅黑;\">特别提醒：定位会采用视频或者发照片的形式让您确定，一但确定好，后续切样发现内部结构不符合预期（比如样品内部有洞，膜层分离等情况）不再进一步制样了，此位置也需要按5折收费，定位请慎重选择。</span></p>"
    },
    "sampleQuestions": [
      {
        "id": "lywq5wo6duklk8awnu9",
        "type": 3,
        "label": "样品个数",
        "required": true,
        "dep": {
          "depId": "",
          "value": ""
        },
        "options": [],
        "defaultValue": "11",
        "placeholder": "22",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywq6mqze2lkeyg0cjg",
        "type": 3,
        "label": "样品编号",
        "required": false,
        "dep": {
          "depId": "",
          "value": ""
        },
        "desc": "1. 样品编号框建议跳过不填，系统默认以1,2,3…简单命名（样品上请标注1,2,3…以便对应），复杂编号易出错！\n2. 如您对样品编号有严格要求，请尽量简化，并在样品编号框内填写。",
        "options": [],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywq65r5i424wiufhug",
        "type": 3,
        "label": "样品成分",
        "required": true,
        "dep": {
          "depId": "",
          "value": ""
        },
        "desc": "如陶瓷，铝合金，蓝宝石，碳纤维，无机薄膜等，主要成分请写明化学式。",
        "options": [],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqdkn2r75zpsiooeo",
        "type": 1,
        "label": "样品是否超硬",
        "required": true,
        "dep": {
          "depId": "",
          "value": ""
        },
        "desc": "超硬材料界定:以SiO2为界，包括SiO2，比SiO2硬的都算超硬材料，比如陶瓷，钛酸锶，蓝宝石，金刚石，碳化物等材料",
        "options": [
          {
            "id": "lywqdkn2nbmhkjjg16",
            "label": "否",
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqgboygj4gitp7pf",
            "label": "是",
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqb5blp2y7ba4a9e8",
        "type": 1,
        "label": "切割后测试项目-常规硬度",
        "required": true,
        "dep": {
          "depId": "lywqdkn2r75zpsiooeo",
          "value": "lywqdkn2nbmhkjjg16"
        },
        "desc": "fib切割tem和球差样品费用一样，不过厚度球差样品会更薄一些。\nFIB剖面1200/h。",
        "options": [
          {
            "id": "lywqbq1srzz0yw9m6mr",
            "label": "TEM",
            "price": 3700.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqcb3z762jijte42d",
            "label": "球差",
            "price": 3700.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqb5bllvyovnqjeek",
            "label": "FIB剖面",
            "isPriceMode": false,
            "required": false,
            "checked": true
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqj4nnmmy0wzs95jc",
        "type": 1,
        "label": "切割后测试项目-超硬材料",
        "required": true,
        "dep": {
          "depId": "lywqdkn2r75zpsiooeo",
          "value": "lywqgboygj4gitp7pf"
        },
        "desc": "1、超硬材料由于硬度很大，切割比较费时间，故费用会高出1000/样。\n2、fib切割tem和球差样品费用一样，不过厚度球差样品会更薄一些。",
        "options": [
          {
            "id": "lywqj4nnp1ekw1m9u5",
            "label": "TEM",
            "price": 4700.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqkrvsejqwo23p0v",
            "label": "球差",
            "price": 4700.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywql0rgtagzyeywrra",
            "label": "FIB剖面",
            "isPriceMode": false,
            "required": false,
            "checked": true
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywrerwug3g2a8kox88",
        "type": 1,
        "label": "切割后是否在本公司做TEM",
        "required": true,
        "dep": {
          "depId": "",
          "value": ""
        },
        "options": [
          {
            "id": "lywrerwvfa29mp1ny6e",
            "label": "是",
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywrghm1o5rcozjghfp",
            "label": "否",
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "lywrerwvfa29mp1ny6e",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqmp4elu69q6yc8yf",
        "type": 1,
        "label": "TEM拍摄方式",
        "required": true,
        "dep": {
          "depId": "lywrerwug3g2a8kox88",
          "value": "lywrerwvfa29mp1ny6e"
        },
        "options": [
          {
            "id": "lywqmp4e4glzspzaf75",
            "label": "云视频",
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqnahozwkfvo12rph",
            "label": "直接拍摄",
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqo5zl1swn26ecfoc",
        "type": 1,
        "label": "样品是否有磁性",
        "required": true,
        "dep": {
          "depId": "lywqmp4elu69q6yc8yf",
          "value": "lywqnahozwkfvo12rph"
        },
        "desc": "磁性判断的依据吸铁石是否能吸动",
        "options": [
          {
            "id": "lywqo5zl5pkguu4mw1n",
            "label": "非磁/弱磁",
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqovkqldq9oky0fs",
            "label": "强磁",
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqph0p4an4s4s67j4",
        "type": 1,
        "label": "云视频拍摄时长-非磁/弱磁",
        "required": true,
        "dep": {
          "depId": "lywqo5zl1swn26ecfoc",
          "value": "lywqo5zl5pkguu4mw1n"
        },
        "options": [
          {
            "id": "lywqph0p01xrxscailh",
            "label": "1h",
            "price": 800.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqq0j8u8lmzvvxmkg",
            "label": "2h",
            "price": 1600.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqq5h7prryfkhu64",
            "label": "3h",
            "price": 2400.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqqaprdq0ibdgr8nt",
            "label": "4h",
            "price": 3200.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqqgpygi10foejlu",
            "label": "5h",
            "price": 4000.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqr1uub37rm5ji76",
        "type": 1,
        "label": "云视频拍摄时长-强磁",
        "required": true,
        "dep": {
          "depId": "lywqo5zl1swn26ecfoc",
          "value": "lywqovkqldq9oky0fs"
        },
        "desc": "磁铁吸起来为强磁",
        "options": [
          {
            "id": "lywqr1uuctwo9bo5kw",
            "label": "1h",
            "price": 1000.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqrkpatun86v4qsfi",
            "label": "2h",
            "price": 2000.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqrqesln1odebwkz",
            "label": "3h",
            "price": 3000.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqruu0dgjyp8ue6h8",
            "label": "4h",
            "price": 4000.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqxp20evskr5usnut",
        "type": 1,
        "label": "样品是否有磁性",
        "required": true,
        "dep": {
          "depId": "lywqmp4elu69q6yc8yf",
          "value": "lywqnahozwkfvo12rph"
        },
        "desc": "磁性判断的依据吸铁石是否能吸动",
        "options": [
          {
            "id": "lywqxp205hefu8qzx9d",
            "label": "非磁",
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr0cgmd4wddtftfip",
            "label": "弱磁",
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywqxp20tbvdiss46ti",
            "label": "强磁",
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywqsfoajbhxhoj652q",
        "type": 2,
        "label": "tem直接拍摄-非磁",
        "required": true,
        "dep": {
          "depId": "lywqxp20evskr5usnut",
          "value": "lywqxp20tbvdiss46ti"
        },
        "desc": "直接拍摄指拍摄过程没有沟通，按照送样单填写拍摄的方式。",
        "options": [
          {
            "id": "lywqsfoa7x2moos8xfv",
            "label": "形貌",
            "price": 300.0,
            "isPriceMode": false,
            "required": true,
            "checked": true
          },
          {
            "id": "lywr0nkxxjndbzarubm",
            "label": "点扫",
            "price": 100.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr1ihrrdqhke7238",
            "label": "线扫",
            "price": 200.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr1ods1dglj0p5nc4",
            "label": "mapping",
            "price": 300.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr22xc5e33hs24y4f",
            "label": "衍射",
            "price": 100.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr28zv5r6w50wz0zw",
            "label": "STEM",
            "price": 300.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywr5ie5parhu503no",
        "type": 2,
        "label": "tem直接拍摄-弱磁",
        "required": true,
        "dep": {
          "depId": "lywqxp20evskr5usnut",
          "value": "lywqxp20tbvdiss46ti"
        },
        "desc": "直接拍摄指拍摄过程没有沟通，按照送样单填写拍摄的方式。",
        "options": [
          {
            "id": "lywr5ie5n7m9w9cmf4",
            "label": "形貌",
            "price": 400.0,
            "isPriceMode": false,
            "required": true,
            "checked": true
          },
          {
            "id": "lywr5ie57frq8f7z3o",
            "label": "点扫",
            "price": 100.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr5ie5lokslnuwb1",
            "label": "线扫",
            "price": 200.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr5ie5flcc2wj9cyv",
            "label": "mapping",
            "price": 400.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr5ie51xmlyzl4fnq",
            "label": "衍射",
            "price": 100.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr5ie5zo8lqd9wm",
            "label": "STEM",
            "price": 400.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywr6wwpg6t5eu8w0ss",
        "type": 2,
        "label": "tem直接拍摄-强磁",
        "required": true,
        "dep": {
          "depId": "lywqxp20evskr5usnut",
          "value": "lywqxp20tbvdiss46ti"
        },
        "desc": "直接拍摄指拍摄过程没有沟通，按照送样单填写拍摄的方式。",
        "options": [
          {
            "id": "lywr6wwq27jpz7mklqv",
            "label": "形貌",
            "price": 600.0,
            "isPriceMode": false,
            "required": true,
            "checked": true
          },
          {
            "id": "lywr6wwrwh77knq0kk",
            "label": "点扫",
            "price": 100.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr6wwrxn5o6s8vqb",
            "label": "线扫",
            "price": 300.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr6wwrtlf8j4agfo9",
            "label": "mapping",
            "price": 400.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr6wwrt9rewckv77n",
            "label": "衍射",
            "price": 100.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          },
          {
            "id": "lywr6wwrwwc9robtpt",
            "label": "STEM",
            "price": 400.0,
            "isPriceMode": false,
            "required": false,
            "checked": false
          }
        ],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "",
        "fileAccessExt": ""
      },
      {
        "id": "lywr9pirxjf4hl4m2r",
        "type": 7,
        "label": "详细测试要求",
        "required": true,
        "dep": {
          "depId": "",
          "value": ""
        },
        "desc": "请详细填写单子要求的内容，以免耽误您的测试时间",
        "options": [],
        "defaultValue": "",
        "placeholder": "",
        "templateFile": "https://etest-oss.oss-cn-beijing.aliyuncs.com/20240722/FIB送样单-姓名-单位_61388_11f22635c86af4c34f06fc9288e083ba.docx",
        "fileAccessExt": ""
      }
    ],
    "extInfo": {
      "priceMode": 1,
      "sampleNumberOption": 1,
      "needRecovery": true,
      "recoveryCost": 50.0,
      "needSameDevice": true,
      "samplingMethod": 1,
      "needLowTemperature": false
    },
    "detailInfo": {
      "testProject": "<p>项目简介：</p><p><span style=\"color: rgba(0, 0, 0, 0.75); background-color: rgb(255, 255, 255); font-size: 14px;\">FIB是利用电透镜将离子束聚焦成非常小尺寸的离子束轰击材料表面，实现材料的剥离、沉积、注入、切割和改性。对于金属、岩石、锂电等不同的材料可</span><span style=\"color: rgba(0, 0, 0, 0.75); background-color: rgb(255, 255, 255); font-size: 16px;\">实现定点剖面形貌和成分表征 、TEM样品制备、微纳结构加工、切片式三维重构、三维原子探针样品制备等功能。</span></p>",
      "sampleRequirement": "<p style=\"text-align: start;\">1、无挥发性，固体、块体长宽最好小于20mm，高度最好小于3mm。</p><p style=\"text-align: start;\">2、样品要求导电性良好，如果导电性比较差的话需要进行喷金或喷碳处理。</p><p style=\"text-align: start;\">3、透射样品制备只保证切出的样品厚度可以拍透射。</p>",
      "qaList": [
        {
          "question": "fib切的透射薄片有孔或者部分脱落有影响吗？",
          "answer": "<p><span style=\"color: rgba(0, 0, 0, 0.75); background-color: rgb(255, 255, 255); font-size: 14px;\">切样的目的就是为了减薄样品，一些材质减薄后就会出现部分脱落，穿孔的现象，属于正常现象，有薄区，不影响透射拍摄即可，比如离子减薄制样就是要在材料上穿一个孔。</span></p><p><span style=\"color: rgba(0, 0, 0, 0.75); background-color: rgb(255, 255, 255); font-size: 14px;\">实际上在拍摄中，孔附近的更薄更利于拍摄。</span></p>"
        }
      ],
      "resultShow": "<p><img src=\"https://etest-oss.oss-cn-beijing.aliyuncs.com/20240722/a5b4c5554cf07706f1240756cce8ec2_62744_43b4273bb03faba1fef4989110a8f591.png\" alt=\"\" data-href=\"\" style=\"width: 588.26px;height: 371.14px;\"/></p><p><br></p><p><img src=\"https://etest-oss.oss-cn-beijing.aliyuncs.com/20240722/cc6e9cb28427126050a0f719cf2d7ad_62953_5f3bf4023a2cab517a9e788c96b701c5.png\" alt=\"\" data-href=\"\" style=\"\"/></p><p><img src=\"https://etest-oss.oss-cn-beijing.aliyuncs.com/20240722/6df1e8dc8c40a7f4d5bb30d2e8fd8e3_63076_cdffa426bf11010ba5347c46e211bbf9.png\" alt=\"\" data-href=\"\" style=\"width: 588.26px;height: 431.43px;\"/></p><p><img src=\"https://etest-oss.oss-cn-beijing.aliyuncs.com/20240722/b5fb7c29453539ad3de7b48592f1374_63385_eeffe48e0003e3b9fa0e7388879ac463.png\" alt=\"\" data-href=\"\" style=\"width: 564.25px;height: 314.51px;\"/></p><p><br></p><p><br></p>"
    },
    "isListing": false
  }
}

const schema = {
  type: "object",
  properties: {
    select: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Select",
      "x-component-props": {
        style: {
          width: "240px",
        },
        options: [
          { label: "显示", value: "visible" },
          { label: "隐藏", value: "none" },
          { label: "隐藏-保留值", value: "hidden" },
        ],
      },
      "x-decorator-props": {
        label: "选择器",
      },
      "x-reactions": {
        target: "input",
        fulfill: {
          state: {
            display: "{{$self.value}}",
          },
        },
      },
    },
    input: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
        style: "width: 240px;",
      },
      "x-decorator-props": {
        label: "输入框",
      },
    },
    input1: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
        style: "width: 240px;",
      },
      "x-decorator-props": {
        label: "输入框1",
      },
      'x-reactions': {
        dependencies: ['select'],
        fulfill: {
          state: {
            display: "{{$deps[0] === 'none' ? 'none' : 'visible'}}",
          },
        },
      }
    },
    input2: {
      type: "string",
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": {
        placeholder: "请输入",
        style: "width: 240px;",
      },
      "x-decorator-props": {
        label: "输入框2",
      },
      'x-reactions': {
        dependencies: ['input1'],
        fulfill: {
          state: {
            display: "{{$deps[0] === 'visible' ? 'visible' : 'none'}}",
          },
        },
      }
    },


  },
};

const schema1 = computed(() => {
  const initialValues = {}
  const properties = res.data.sampleQuestions.reduce((sum, item) => {
    console.log(111,item.id, item.label, item.dep, item.options, item)
    const property = {
      title: item.label,
      type: "boolean",
      "x-decorator": "FormItem",
      "x-component": {
// [QUESTION_TYPES.TEXT, QUESTION_TYPES.TEXTAREA].includes(item.type) ? 'Input' : "Select"
        [QUESTION_TYPES.TEXT]: 'Input',
        [QUESTION_TYPES.TEXTAREA]: 'TEXTAREA',
        [QUESTION_TYPES.RADIO]: 'Radio.Group',
        [QUESTION_TYPES.CHECKBOX]: 'Select',

      }[item.type],
      "x-component-props": {
        style: {
          width: "240px",
        },
        options: item.options,
        fieldNames: {label: 'label', value: 'id'},
        placeholder: item.placeholder,
      },
      "x-decorator-props": {
        // label: item.label,
        labelCol: {span: 4},
      },
      description: item.desc,
      'x-validator':{ required: true, message: '必填项' },

    }
    if (item.dep.depId && item.dep.value) {
      property["x-reactions"] = {
        dependencies: [item.dep.depId],
        fulfill: {
          state: {
            display: `{{$deps[0] === '${item.dep.value}' ? 'visible' : 'none'}}`,
          },
        }
      }
    }
    sum[item.id] = property
    if(item.defaultValue) {
      initialValues[item.id] = item.defaultValue
    }
    return sum
  }, {})
  return {
    type: "object",
    properties,
    initialValues,
  }
})

form.setInitialValues(schema1.value.initialValues)

</script>
<style>
.header-wrap,
.login-footer,
.bg {
  display: none;
}

.ant-form-item-extra {
  white-space: pre-wrap;
}
</style>
